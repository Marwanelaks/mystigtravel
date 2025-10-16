import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Plus, FileText, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { umrahAPI } from '@/services/umrah-api';
import { UmrahDemand, PartenaireProposal } from '@/types/umrah';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CreateProposal from './CreateProposal';
import PartnerLayout from './PartnerLayout';
import { ProposalStatusBadge } from '@/components/omra/ProposalStatusBadge';

const AssignedDemands = () => {
  const [demands, setDemands] = useState<UmrahDemand[]>([]);
  const [proposals, setProposals] = useState<PartenaireProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showProposalDialog, setShowProposalDialog] = useState(false);
  const [showProposalsDialog, setShowProposalsDialog] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<UmrahDemand | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<PartenaireProposal | null>(null);

  useEffect(() => {
    loadDemands();
    loadMyProposals();
  }, []);

  const loadDemands = async () => {
    setLoading(true);
    try {
      const data = await umrahAPI.partenaire.getAssignedDemands();
      setDemands(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load demands',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMyProposals = async () => {
    setProposalsLoading(true);
    try {
      const data = await umrahAPI.partenaire.getMyProposals();
      setProposals(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load proposals',
        variant: 'destructive',
      });
    } finally {
      setProposalsLoading(false);
    }
  };

    const getProposalsForDemand = (demandId: number): PartenaireProposal[] => {
      return proposals.filter(proposal => proposal.umrahDemand?.id === demandId)
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    };

    const hasPendingProposal = (demandId: number): boolean => {
      return proposals.some(proposal => 
        proposal.umrahDemand?.id === demandId && proposal.status === 'PENDING'
      );
    };

    const hasValidatedProposal = (demandId: number): boolean => {
      return proposals.some(proposal => 
        proposal.umrahDemand?.id === demandId && proposal.status === 'VALIDATED'
      );
    };

  const getLatestProposalStatus = (demandId: number): string | null => {
    const demandProposals = getProposalsForDemand(demandId);
    return demandProposals.length > 0 ? demandProposals[0].status : null;
  };

  const getProposalStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'VALIDATED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleCreateProposal = (demand: UmrahDemand) => {
    setSelectedDemand(demand);
    setSelectedProposal(null);
    setShowProposalDialog(true);
  };

  const handleEditProposal = (demand: UmrahDemand, proposal: PartenaireProposal) => {
    setSelectedDemand(demand);
    setSelectedProposal(proposal);
    setShowProposalDialog(true);
    setShowProposalsDialog(false);
  };

  const handleProposalSubmitted = () => {
    loadMyProposals();
    setShowProposalDialog(false);
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Waiting for admin validation';
      case 'VALIDATED':
        return 'Approved by admin';
      case 'REJECTED':
        return 'Needs modification';
      default:
        return 'No proposal submitted';
    }
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Assigned Demands</h1>
              <p className="text-muted-foreground">Validated Umrah demands assigned to you</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {demands.length} demand(s) assigned
              </p>
              <p className="text-sm text-muted-foreground">
                {proposals.length} proposal(s) total
              </p>
            </div>
          </div>

          {/* Demands Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Date Type</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Proposal Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : demands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No demands assigned to you yet</p>
                      <p className="text-sm">Admin will assign validated demands to you</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  demands.map((demand) => {
                    const demandProposals = getProposalsForDemand(demand.id);
                    const latestStatus = getLatestProposalStatus(demand.id);
                    const hasPending = hasPendingProposal(demand.id);
                    const hasValidated = hasValidatedProposal(demand.id);
                    const canCreateProposal = !hasValidated && !hasPending;

                    return (
                      <TableRow key={demand.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div>
                            <p>{demand.fullName}</p>
                            <p className="text-xs text-muted-foreground">Demand #{demand.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {demand.travelParty.adults}A {demand.travelParty.children}C
                            </span>
                            {demand.travelParty.infants > 0 && (
                              <span className="text-xs text-muted-foreground">
                                +{demand.travelParty.infants}I
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Total: {demand.travelParty.totalTravelers}
                          </p>
                        </TableCell>
                        <TableCell>
                          {new Date(demand.departureDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {demand.dateType.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <p className="text-sm line-clamp-2">
                              {demand.hotelCategories.join(', ')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {latestStatus ? (
                              <div className="flex items-center gap-2">
                                {getProposalStatusIcon(latestStatus)}
                                <ProposalStatusBadge status={latestStatus} />
                              </div>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100">
                                No Proposal
                              </Badge>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {getStatusDescription(latestStatus || 'NONE')}
                            </p>
                            {demandProposals.length > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {demandProposals.length} proposal(s)
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedDemand(demand);
                                setShowDetailsDialog(true);
                              }}
                              title="View demand details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {demandProposals.length > 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedDemand(demand);
                                  setShowProposalsDialog(true);
                                }}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Proposals
                              </Button>
                            )}

                            <Button
                              size="sm"
                              onClick={() => handleCreateProposal(demand)}
                              disabled={!canCreateProposal}
                              title={
                                hasValidated 
                                  ? "Demand already has a validated proposal" 
                                  : hasPending 
                                  ? "Proposal pending validation" 
                                  : "Create new proposal"
                              }
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {hasPending ? 'Pending...' : 'Create Proposal'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Card>

          {/* Demand Details Dialog */}
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Demand Details #{selectedDemand?.id}</DialogTitle>
              </DialogHeader>
              {selectedDemand && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Personal Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Name:</span>
                            <span>{selectedDemand.fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span>{selectedDemand.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Phone:</span>
                            <span>{selectedDemand.phone}</span>
                          </div>
                          {selectedDemand.phoneCountry && (
                            <div className="flex justify-between">
                              <span className="font-medium">Country:</span>
                              <span>{selectedDemand.phoneCountry}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Travel Party</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Adults:</span>
                            <span>{selectedDemand.travelParty.adults}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Children:</span>
                            <span>{selectedDemand.travelParty.children}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Infants:</span>
                            <span>{selectedDemand.travelParty.infants || 0}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Total Travelers:</span>
                            <span className="font-bold">{selectedDemand.travelParty.totalTravelers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Trip Preferences</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Date Type:</span>
                        <Badge variant="secondary" className="capitalize">
                          {selectedDemand.dateType.toLowerCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Departure:</span>
                        <span>{new Date(selectedDemand.departureDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Return:</span>
                        <span>{new Date(selectedDemand.returnDate).toLocaleDateString()}</span>
                      </div>
                      {selectedDemand.flexibleMonth && (
                        <div className="flex justify-between">
                          <span className="font-medium">Flexible Month:</span>
                          <span>{selectedDemand.flexibleMonth}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Accommodation</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Preferred Categories:</span>
                        <div className="flex gap-1">
                          {selectedDemand.hotelCategories.map(category => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Number of Rooms:</span>
                        <span className="font-bold">{selectedDemand.numberOfRooms}</span>
                      </div>
                    </div>
                  </div>

                  {selectedDemand.specialRequests && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Special Requests</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm">{selectedDemand.specialRequests}</p>
                      </div>
                    </div>
                  )}

                  {selectedDemand.adminComment && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Admin Comment</h3>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">{selectedDemand.adminComment}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Create/Edit Proposal Dialog */}
          <CreateProposal
            open={showProposalDialog}
            onClose={() => setShowProposalDialog(false)}
            demand={selectedDemand}
            proposal={selectedProposal}
            mode={selectedProposal ? 'edit' : 'create'}
            onProposalSubmitted={handleProposalSubmitted}
          />

          {/* View Proposals Dialog */}
          <Dialog open={showProposalsDialog} onOpenChange={setShowProposalsDialog}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Proposals for Demand #{selectedDemand?.id}
                </DialogTitle>
                <DialogDescription>
                  {selectedDemand && `Client: ${selectedDemand.fullName}`}
                </DialogDescription>
              </DialogHeader>
              
              {selectedDemand && (
                <div className="space-y-4">
                  {proposalsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : getProposalsForDemand(selectedDemand.id).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No proposals submitted for this demand</p>
                      <Button 
                        className="mt-4"
                        onClick={() => handleCreateProposal(selectedDemand)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Proposal
                      </Button>
                    </div>
                  ) : (
                    getProposalsForDemand(selectedDemand.id).map((proposal) => (
                      <Card key={proposal.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">Proposal #{proposal.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Submitted on {new Date(proposal.submittedAt).toLocaleDateString()} at{' '}
                              {new Date(proposal.submittedAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <ProposalStatusBadge status={proposal.status} />
                            <span className="text-xl font-bold text-green-600">
                              {proposal.totalPrice.toLocaleString()} SAR
                            </span>
                          </div>
                        </div>

                        {/* Proposal Summary */}
                        <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                          <div className="text-center">
                            <div className="font-bold text-lg">{proposal.hotelProposals.length}</div>
                            <div className="text-muted-foreground">Hotels</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{proposal.flightProposals.length}</div>
                            <div className="text-muted-foreground">Flights</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{proposal.mazaratProposals.length}</div>
                            <div className="text-muted-foreground">Visits</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{proposal.umrahDemand.travelParty.totalTravelers}</div>
                            <div className="text-muted-foreground">Travelers</div>
                          </div>
                        </div>

                        {/* Status Information */}
                        {proposal.status === 'REJECTED' && proposal.adminComment && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-red-800">Rejection Reason</p>
                                <p className="text-red-700 text-sm mt-1">{proposal.adminComment}</p>
                                <p className="text-xs text-red-600 mt-2">
                                  Rejected on {new Date(proposal.rejectedAt!).toLocaleDateString()} by {proposal.rejectedBy?.username}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {proposal.status === 'VALIDATED' && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                            <div className="flex items-center gap-3 text-green-800">
                              <CheckCircle className="h-5 w-5" />
                              <div>
                                <p className="font-medium">✓ Proposal Validated</p>
                                <p className="text-sm">
                                  Validated on {new Date(proposal.validatedAt!).toLocaleDateString()} by {proposal.validatedBy?.username}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {proposal.status === 'PENDING' && (
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                            <div className="flex items-center gap-3 text-yellow-800">
                              <Clock className="h-5 w-5" />
                              <div>
                                <p className="font-medium">⏳ Waiting for Validation</p>
                                <p className="text-sm">
                                  Submitted on {new Date(proposal.submittedAt).toLocaleDateString()} - Under admin review
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // View full proposal details
                              toast({
                                title: 'Proposal Details',
                                description: `Would open detailed view for proposal #${proposal.id}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          
                          {(proposal.status === 'REJECTED' || proposal.status === 'PENDING') && (
                            <Button
                              size="sm"
                              onClick={() => handleEditProposal(selectedDemand, proposal)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {proposal.status === 'REJECTED' ? 'Modify Proposal' : 'Edit Proposal'}
                            </Button>
                          )}

                          {proposal.status === 'VALIDATED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled
                              title="Validated proposals cannot be modified"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Validated
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default AssignedDemands;