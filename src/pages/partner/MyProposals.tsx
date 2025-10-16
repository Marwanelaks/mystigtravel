import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Edit, FileText, Search, Filter, AlertCircle, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { umrahAPI } from '@/services/umrah-api';
import { PartenaireProposal, ProposalStatus } from '@/types/umrah';
import { toast } from '@/hooks/use-toast';
import PartnerLayout from './PartnerLayout';
import { ProposalStatusBadge } from '@/components/omra/ProposalStatusBadge';
import CreateProposal from './CreateProposal';

const MyProposals = () => {
  const [proposals, setProposals] = useState<PartenaireProposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<PartenaireProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProposal, setSelectedProposal] = useState<PartenaireProposal | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    validated: 0,
    rejected: 0
  });

  useEffect(() => {
    loadProposals();
  }, []);

  useEffect(() => {
    filterProposals();
    calculateStatistics();
  }, [proposals, searchTerm, statusFilter]);

  const loadProposals = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const filterProposals = () => {
    let filtered = proposals;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter as ProposalStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.id.toString().includes(searchTerm) ||
        p.umrahDemand.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.umrahDemand.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.totalPrice.toString().includes(searchTerm)
      );
    }

    setFilteredProposals(filtered);
  };

  const calculateStatistics = () => {
    const stats = {
      total: proposals.length,
      pending: proposals.filter(p => p.status === 'PENDING').length,
      validated: proposals.filter(p => p.status === 'VALIDATED').length,
      rejected: proposals.filter(p => p.status === 'REJECTED').length
    };
    setStatistics(stats);
  };

  const canEditProposal = (proposal: PartenaireProposal) => {
    return proposal.status === 'REJECTED' || proposal.status === 'PENDING';
  };

  const getStatusIcon = (status: ProposalStatus) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'VALIDATED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleProposalUpdate = () => {
    loadProposals();
    setShowEditDialog(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Proposals</h1>
              <p className="text-muted-foreground">Manage and track all your submitted proposals</p>
            </div>
            <Button asChild>
              <a href="/partner-dashboard">Back to Dashboard</a>
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                  <p className="text-2xl font-bold">{statistics.total}</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{statistics.pending}</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Awaiting Review
                </Badge>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Validated</p>
                  <p className="text-2xl font-bold text-green-600">{statistics.validated}</p>
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
                  <p className="text-2xl font-bold text-red-600">{statistics.rejected}</p>
                </div>
                <Badge variant="destructive">Needs Revision</Badge>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by proposal ID, client name, email, or price..."
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
                  <TableHead>Client</TableHead>
                  <TableHead>Travel Dates</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Hotels</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredProposals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No proposals found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProposals.map((proposal) => (
                    <TableRow key={proposal.id} className="group hover:bg-muted/50">
                      <TableCell className="font-mono font-medium">
                        #{proposal.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{proposal.umrahDemand.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {proposal.umrahDemand.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Demand #{proposal.umrahDemand.id}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p>{new Date(proposal.umrahDemand.departureDate).toLocaleDateString()}</p>
                            <p className="text-xs text-muted-foreground">to {new Date(proposal.umrahDemand.returnDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-green-600">
                        {proposal.totalPrice.toLocaleString()} SAR
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{proposal.hotelProposals.length} hotel(s)</p>
                          <p className="text-xs text-muted-foreground">
                            {proposal.umrahDemand.travelParty.totalTravelers} travelers
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(proposal.status)}
                          <ProposalStatusBadge status={proposal.status} />
                        </div>
                        {proposal.status === 'REJECTED' && proposal.adminComment && (
                          <div className="text-xs text-red-600 mt-1">
                            Has admin comments
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{formatDate(proposal.submittedAt)}</p>
                          {proposal.validatedAt && (
                            <p className="text-xs text-green-600">
                              Validated: {formatDate(proposal.validatedAt)}
                            </p>
                          )}
                          {proposal.rejectedAt && (
                            <p className="text-xs text-red-600">
                              Rejected: {formatDate(proposal.rejectedAt)}
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
                              setSelectedProposal(proposal);
                              setShowDetailsDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {canEditProposal(proposal) && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedProposal(proposal);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>

          {/* Proposal Details Dialog */}
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Proposal Details #{selectedProposal?.id}
                </DialogTitle>
              </DialogHeader>
              
              {selectedProposal && (
                <div className="space-y-6">
                  {/* Proposal Header */}
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-blue-600">Total Price</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedProposal.totalPrice.toLocaleString()} SAR
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600">Status</p>
                        <ProposalStatusBadge status={selectedProposal.status} />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600">Submitted</p>
                        <p>{formatDate(selectedProposal.submittedAt)}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600">Travelers</p>
                        <p>{selectedProposal.umrahDemand.travelParty.totalTravelers} people</p>
                      </div>
                    </div>
                  </Card>

                  {/* Status History */}
                  {(selectedProposal.status === 'VALIDATED' || selectedProposal.status === 'REJECTED') && (
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Status History</h3>
                      {selectedProposal.status === 'VALIDATED' && (
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">Validated</p>
                            <p className="text-sm text-green-700">
                              by {selectedProposal.validatedBy?.username} on {formatDate(selectedProposal.validatedAt!)}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedProposal.status === 'REJECTED' && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-medium text-red-800">Rejected</p>
                              <p className="text-sm text-red-700">
                                by {selectedProposal.rejectedBy?.username} on {formatDate(selectedProposal.rejectedAt!)}
                              </p>
                              {selectedProposal.adminComment && (
                                <div className="mt-2 p-2 bg-red-100 rounded">
                                  <p className="text-sm font-medium text-red-800">Admin Comment:</p>
                                  <p className="text-sm text-red-700 mt-1">{selectedProposal.adminComment}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  )}

                  {/* Cost Breakdown */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Transport</p>
                        <p className="font-semibold">{selectedProposal.transportPrice.toLocaleString()} SAR</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Visa</p>
                        <p className="font-semibold">{selectedProposal.visaPrice.toLocaleString()} SAR</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Benefice</p>
                        <p className="font-semibold">{selectedProposal.beneficePrice.toLocaleString()} SAR</p>
                      </div>
                    </div>
                  </Card>

                  {/* Hotels */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Hotels ({selectedProposal.hotelProposals.length})</h3>
                    <div className="space-y-3">
                      {selectedProposal.hotelProposals.map((hotel, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{hotel.hotelName}</p>
                              <p className="text-sm text-muted-foreground">
                                {hotel.city} • {hotel.hotelCategory}
                              </p>
                            </div>
                            <p className="font-bold text-green-600">
                              {hotel.totalHotelPrice?.toLocaleString()} SAR
                            </p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">Check-in</p>
                              <p>{new Date(hotel.checkInDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Check-out</p>
                              <p>{new Date(hotel.checkOutDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Rooms</p>
                              <p>{hotel.numberOfRooms}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Nights</p>
                              <p>{Math.ceil((new Date(hotel.checkOutDate).getTime() - new Date(hotel.checkInDate).getTime()) / (1000 * 60 * 60 * 24))}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Flights */}
                  {selectedProposal.flightProposals.length > 0 && (
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Flights ({selectedProposal.flightProposals.length})</h3>
                      <div className="space-y-3">
                        {selectedProposal.flightProposals.map((flight, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{flight.airlineCompany}</p>
                                <p className="text-sm text-muted-foreground">
                                  {flight.pricePerPerson.toLocaleString()} SAR per person
                                </p>
                              </div>
                              <p className="font-bold text-green-600">
                                {(flight.pricePerPerson * selectedProposal.umrahDemand.travelParty.totalTravelers).toLocaleString()} SAR
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-muted-foreground">Departure</p>
                                <p>{formatDate(flight.departureFlightDate)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Return</p>
                                <p>{formatDate(flight.returnFlightDate)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Mazarat */}
                  {selectedProposal.mazaratProposals.length > 0 && (
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Religious Visits ({selectedProposal.mazaratProposals.length})</h3>
                      <div className="space-y-2">
                        {selectedProposal.mazaratProposals.map((mazarat, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border rounded">
                            <p className="font-medium">{mazarat.mazaratName}</p>
                            <p className="text-green-600 font-semibold">
                              {mazarat.pricePerPerson.toLocaleString()} SAR per person
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Proposal Dialog */}
          <CreateProposal
            open={showEditDialog}
            onClose={() => setShowEditDialog(false)}
            demand={selectedProposal?.umrahDemand || null}
            proposal={selectedProposal}
            mode="edit"
            onProposalUpdate={handleProposalUpdate}
          />
        </div>
      </div>
    </PartnerLayout>
  );
};

export default MyProposals;