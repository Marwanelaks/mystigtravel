import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { umrahAPI } from '@/services/umrah-api';
import { toast } from '@/hooks/use-toast';
import { PartenaireProposal } from '@/types/umrah';

interface AdminProposalActionsProps {
  proposal: PartenaireProposal;
  onUpdate: () => void;
}

export const AdminProposalActions = ({ proposal, onUpdate }: AdminProposalActionsProps) => {
  const [validateLoading, setValidateLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState('');

  const handleValidate = async () => {
    setValidateLoading(true);
    try {
      await umrahAPI.admin.validateProposal(proposal.id);
      toast({
        title: 'Succès',
        description: 'Proposition validée avec succès',
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Erreur lors de la validation',
        variant: 'destructive',
      });
    } finally {
      setValidateLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectComment.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez saisir un commentaire de rejet',
        variant: 'destructive',
      });
      return;
    }

    setRejectLoading(true);
    try {
      await umrahAPI.admin.rejectProposal(proposal.id, rejectComment);
      toast({
        title: 'Proposition Rejetée',
        description: 'La proposition a été rejetée avec succès',
      });
      setRejectDialogOpen(false);
      setRejectComment('');
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Erreur lors du rejet',
        variant: 'destructive',
      });
    } finally {
      setRejectLoading(false);
    }
  };

  // Only show actions for pending proposals
  if (proposal.status !== 'PENDING') {
    return (
      <div className="text-sm text-muted-foreground">
        {proposal.status === 'VALIDATED' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            Validé le {new Date(proposal.validatedAt!).toLocaleDateString()} par {proposal.validatedBy?.username}
          </div>
        )}
        {proposal.status === 'REJECTED' && (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-4 w-4" />
            Rejeté le {new Date(proposal.rejectedAt!).toLocaleDateString()} par {proposal.rejectedBy?.username}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleValidate}
          disabled={validateLoading}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {validateLoading ? 'Validation...' : 'Valider'}
        </Button>
        
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setRejectDialogOpen(true)}
          disabled={rejectLoading}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Rejeter
        </Button>
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Rejeter la Proposition
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Veuillez expliquer pourquoi vous rejetez cette proposition. Ce commentaire sera visible par le partenaire.
            </p>
            
            <Textarea
              placeholder="Commentaire de rejet..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={rejectLoading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectLoading || !rejectComment.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              {rejectLoading ? 'Rejet...' : 'Confirmer le Rejet'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};