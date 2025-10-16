import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Filter } from 'lucide-react';
import { umrahAPI } from '@/services/umrah-api';
import { PartenaireProposal, ProposalStatus, AdminProposalStatistics } from '@/types/umrah';
import { toast } from '@/hooks/use-toast';
import { ProposalStatusBadge } from '@/components/omra/ProposalStatusBadge';
import { AdminProposalActions } from '@/components/omra/AdminProposalActions';

export const AdminProposalsDashboard = () => {
  const [proposals, setProposals] = useState<PartenaireProposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<PartenaireProposal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [statistics, setStatistics] = useState<AdminProposalStatistics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProposals();
    loadStatistics();
  }, []);

  useEffect(() => {
    filterProposals();
  }, [proposals, searchTerm, statusFilter]);

  const loadProposals = async () => {
    setLoading(true);
    try {
      const data = await umrahAPI.admin.getAllProposals();
      setProposals(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load proposals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await umrahAPI.admin.getProposalStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  const filterProposals = () => {
    let filtered = proposals;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter as ProposalStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.partenaire.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.umrahDemand.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
      );
    }

    setFilteredProposals(filtered);
  };

  const handleProposalUpdate = () => {
    loadProposals();
    loadStatistics();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Proposals Management</h1>
            <p className="text-muted-foreground">Manage and validate partner proposals</p>
          </div>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                  <p className="text-2xl font-bold">{statistics.totalProposals}</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Filter className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{statistics.pendingProposals}</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Needs Review
                </Badge>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Validated</p>
                  <p className="text-2xl font-bold text-green-600">{statistics.validatedProposals}</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Approved
                </Badge>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{statistics.rejectedProposals}</p>
                </div>
                <Badge variant="destructive">Rejected</Badge>
              </div>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by partenaire, client, or proposal ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="VALIDATED">Validated</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="MODIFIED">Modified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Proposals Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proposal ID</TableHead>
                <TableHead>Demand</TableHead>
                <TableHead>Partenaire</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
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
              ) : filteredProposals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No proposals found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProposals.map((proposal) => (
                  <TableRow key={proposal.id}>
                    <TableCell className="font-medium">#{proposal.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{proposal.umrahDemand.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          Demand #{proposal.umrahDemand.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{proposal.partenaire.username}</p>
                        <p className="text-sm text-muted-foreground">{proposal.partenaire.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(proposal.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      {proposal.totalPrice.toLocaleString()} SAR
                    </TableCell>
                    <TableCell>
                      <ProposalStatusBadge status={proposal.status} />
                    </TableCell>
                    <TableCell>
                      <AdminProposalActions 
                        proposal={proposal} 
                        onUpdate={handleProposalUpdate}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};