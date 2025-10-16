import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, Eye, CheckCircle, XCircle, MessageSquare, UserCheck, FileText, Users, Calendar, Hotel, Plane, MapPin, User, Mail, Phone, Users as UsersIcon, Bed, MessageCircle, Calculator 
} from 'lucide-react';
import { umrahAPI  } from '@/services/umrah-api';
import { usersAPI } from '@/services/api';
import { UmrahDemand, DemandStatus, PartenaireProposal } from '@/types/umrah';
import { toast } from '@/hooks/use-toast';
import { ProposalStatusBadge } from '@/components/omra/ProposalStatusBadge';

const UmrahDemands = () => {
  const [demands, setDemands] = useState<UmrahDemand[]>([]);
  const [filteredDemands, setFilteredDemands] = useState<UmrahDemand[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDemand, setSelectedDemand] = useState<UmrahDemand | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showValidateDialog, setShowValidateDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showProposalsDialog, setShowProposalsDialog] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedPartenaire, setSelectedPartenaire] = useState('');
  const [loading, setLoading] = useState(false);
  const [partenaireUsers, setPartenaireUsers] = useState<{ id: number; username: string; email: string }[]>([]);
  const [proposals, setProposals] = useState<PartenaireProposal[]>([]);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const [showProposalDetailsDialog, setShowProposalDetailsDialog] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<PartenaireProposal | null>(null);

  useEffect(() => {
    loadDemands();
  }, []);

  useEffect(() => {
    filterDemands();
  }, [demands, searchTerm, statusFilter]);

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const allUsers = await usersAPI.getAll();
        const partenaires = allUsers
          .filter((user: any) => user.role === 'ROLE_PARTENAIRE')
          .map((user: any) => ({
            id: user.id,
            username: user.username || user.name,
            email: user.email,
          }));
        setPartenaireUsers(partenaires);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load partenaires',
          variant: 'destructive',
        });
      }
    };
    fetchPartenaires();
  }, []);

  const loadDemands = async () => {
    try {
      const data = await umrahAPI.admin.getAllDemands();
      setDemands(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load demands',
        variant: 'destructive',
      });
    }
  };

  const loadProposalsForDemand = async (demandId: number) => {
    setProposalsLoading(true);
    try {
      const data = await umrahAPI.admin.getProposalsForDemand(demandId);
      setProposals(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load proposals',
        variant: 'destructive',
      });
    } finally {
      setProposalsLoading(false);
    }
  };

  const filterDemands = () => {
    let filtered = demands;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter.toUpperCase() as DemandStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDemands(filtered);
  };

  const handleValidate = async () => {
    if (!selectedDemand) return;

    setLoading(true);
    try {
      await umrahAPI.admin.validateDemand(
        selectedDemand.id,
        comment,
        selectedPartenaire ? selectedPartenaire : undefined
      );
      toast({
        title: 'Success',
        description: 'Demand validated successfully',
      });
      setShowValidateDialog(false);
      setComment('');
      setSelectedPartenaire('');
      loadDemands();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to validate demand',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedDemand || !comment) return;
    
    setLoading(true);
    try {
      await umrahAPI.admin.rejectDemand(selectedDemand.id, comment);
      toast({
        title: 'Success',
        description: 'Demand rejected',
      });
      setShowRejectDialog(false);
      setComment('');
      loadDemands();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reject demand',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewProposals = async (demand: UmrahDemand) => {
    setSelectedDemand(demand);
    await loadProposalsForDemand(demand.id);
    setShowProposalsDialog(true);
  };

  const getStatusBadge = (status: DemandStatus) => {
    const variants: Record<DemandStatus, 'default' | 'secondary' | 'destructive'> = {
      PENDING: 'secondary',
      VALIDATED: 'default',
      REJECTED: 'destructive',
      PROCESSED: 'default',
    };
    return (
      <Badge variant={variants[status] || 'default'}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Umrah Demands</h1>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or email..."
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
                <SelectItem value="pending">PENDING</SelectItem>
                <SelectItem value="validated">VALIDATED</SelectItem>
                <SelectItem value="rejected">REJECTED</SelectItem>
                <SelectItem value="processed">PROCESSED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Demands Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Travelers</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Proposals</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDemands.map((demand) => (
                <TableRow key={demand.id}>
                  <TableCell className="font-medium">
                    {demand.fullName}
                  </TableCell>
                  <TableCell>{demand.email}</TableCell>
                  <TableCell>{demand.phone}</TableCell>
                  <TableCell>
                    {demand.travelParty.adults}A {demand.travelParty.children}C {demand.travelParty.infants || 0}I
                  </TableCell>
                  <TableCell>{new Date(demand.departureDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(demand.status)}</TableCell>
                  <TableCell>
                    {demand.status === 'VALIDATED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProposals(demand)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Proposals
                      </Button>
                    )}
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
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {demand.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedDemand(demand);
                              setShowValidateDialog(true);
                            }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedDemand(demand);
                              setShowRejectDialog(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Details Dialog with Accordion */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Demand Details</DialogTitle>
            </DialogHeader>
            {selectedDemand && (
              <div className="space-y-4">
                {/* Client Information */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Client Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Name:</strong> {selectedDemand.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Email:</strong> {selectedDemand.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Phone:</strong> {selectedDemand.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Travelers:</strong> {selectedDemand.travelParty.totalTravelers} total</span>
                    </div>
                  </div>
                </Card>

                <Accordion type="single" collapsible className="w-full">
                  {/* Travel Details */}
                  <AccordionItem value="travel-details">
                    <AccordionTrigger className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Travel Details
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <strong>Date Type:</strong> {selectedDemand.dateType}
                          </div>
                          <div>
                            <strong>Rooms:</strong> {selectedDemand.numberOfRooms}
                          </div>
                          <div>
                            <strong>Departure:</strong> {formatDate(selectedDemand.departureDate)}
                          </div>
                          <div>
                            <strong>Return:</strong> {formatDate(selectedDemand.returnDate)}
                          </div>
                        </div>
                        
                        {/* Travel Party Details */}
                        <div className="mt-3">
                          <strong className="flex items-center gap-2 mb-2">
                            <UsersIcon className="h-4 w-4" />
                            Travel Party Breakdown:
                          </strong>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="bg-muted p-2 rounded text-center">
                              <div className="font-semibold">{selectedDemand.travelParty.adults}</div>
                              <div>Adults</div>
                            </div>
                            <div className="bg-muted p-2 rounded text-center">
                              <div className="font-semibold">{selectedDemand.travelParty.children}</div>
                              <div>Children</div>
                            </div>
                            <div className="bg-muted p-2 rounded text-center">
                              <div className="font-semibold">{selectedDemand.travelParty.infants || 0}</div>
                              <div>Infants</div>
                            </div>
                            <div className="bg-muted p-2 rounded text-center">
                              <div className="font-semibold">{selectedDemand.travelParty.totalTravelers}</div>
                              <div>Total</div>
                            </div>
                          </div>
                          {selectedDemand.travelParty.ages && selectedDemand.travelParty.ages.length > 0 && (
                            <div className="mt-2">
                              <strong>Children Ages:</strong> {selectedDemand.travelParty.ages.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Hotel Preferences */}
                  <AccordionItem value="hotel-preferences">
                    <AccordionTrigger className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Hotel className="h-4 w-4" />
                        Hotel Preferences
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Preferred Categories:</strong>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedDemand.hotelCategories.map((category, index) => (
                            <Badge key={index} variant="secondary" className="capitalize">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        {selectedDemand.roomSelections && Object.keys(selectedDemand.roomSelections).length > 0 && (
                          <div className="mt-2">
                            <strong>Room Selections:</strong>
                            <pre className="text-xs mt-1 p-2 bg-muted rounded">
                              {JSON.stringify(selectedDemand.roomSelections, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Special Requests */}
                  {selectedDemand.specialRequests && (
                    <AccordionItem value="special-requests">
                      <AccordionTrigger className="text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Special Requests
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-sm p-3 bg-muted rounded">
                          {selectedDemand.specialRequests}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Status History */}
                  <AccordionItem value="status-history">
                    <AccordionTrigger className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Status & History
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <strong>Current Status:</strong>
                          {getStatusBadge(selectedDemand.status)}
                        </div>
                        
                        <div>
                          <strong>Created:</strong> {formatDate(selectedDemand.createdAt)}
                        </div>
                        
                        {selectedDemand.validatedAt && (
                          <div>
                            <strong>Validated:</strong> {formatDate(selectedDemand.validatedAt)}
                            {selectedDemand.validatedBy && (
                              <span> by {selectedDemand.validatedBy.name}</span>
                            )}
                          </div>
                        )}
                        
                        {selectedDemand.assignedPartenaire && (
                          <div>
                            <strong>Assigned to:</strong> {selectedDemand.assignedPartenaire.name}
                          </div>
                        )}
                        
                        {selectedDemand.adminComment && (
                          <div>
                            <strong>Admin Comments:</strong>
                            <div className="mt-1 p-2 bg-muted rounded text-xs whitespace-pre-wrap">
                              {selectedDemand.adminComment}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Validate Dialog */}
        <Dialog open={showValidateDialog} onOpenChange={setShowValidateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Validate Demand</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Comment (optional)</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add validation comments..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Assign to Partenaire</label>
                <Select value={selectedPartenaire} onValueChange={setSelectedPartenaire}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select partenaire" />
                  </SelectTrigger>
                  <SelectContent>
                    {partenaireUsers.map(user => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.username} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  The selected partenaire will be able to create proposals for this demand
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowValidateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleValidate} disabled={loading || !selectedPartenaire}>
                Validate & Assign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Demand</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Reason *</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Provide rejection reason..."
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={loading || !comment}>
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Proposals Dialog */}
        <Dialog open={showProposalsDialog} onOpenChange={setShowProposalsDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Proposals for Demand #{selectedDemand?.id}
              </DialogTitle>
            </DialogHeader>
            
            {proposalsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No proposals submitted yet</p>
                <p className="text-sm">The assigned partenaire hasn't created any proposals for this demand.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <Card key={proposal.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">Proposal #{proposal.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted by {proposal.partenaire.username} on {new Date(proposal.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ProposalStatusBadge status={proposal.status} />
                        <span className="text-lg font-bold text-green-600">
                          {proposal.totalPrice.toLocaleString()} SAR
                        </span>
                      </div>
                    </div>

                    {/* Proposal Summary */}
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <strong>Hotels:</strong> {proposal.hotelProposals.length}
                      </div>
                      <div>
                        <strong>Flights:</strong> {proposal.flightProposals.length}
                      </div>
                      <div>
                        <strong>Visits:</strong> {proposal.mazaratProposals.length}
                      </div>
                    </div>

                    {/* Admin Actions */}
                    {proposal.status === 'PENDING' && (
                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          size="sm"
                          onClick={async () => {
                            try {
                              await umrahAPI.admin.validateProposal(proposal.id);
                              toast({
                                title: 'Success',
                                description: 'Proposal validated successfully',
                              });
                              loadProposalsForDemand(selectedDemand!.id);
                            } catch (error: any) {
                              toast({
                                title: 'Error',
                                description: error.message || 'Failed to validate proposal',
                                variant: 'destructive',
                              });
                            }
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Validate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            // You can implement a reject dialog here
                            toast({
                              title: 'Info',
                              description: 'Reject functionality would open a dialog',
                            });
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedProposal(proposal);
                            setShowProposalDetailsDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    )}

                    {/* Status History */}
                    {proposal.status !== 'PENDING' && (
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        {proposal.status === 'VALIDATED' && (
                          <p>Validated on {new Date(proposal.validatedAt!).toLocaleDateString()} by {proposal.validatedBy?.username}</p>
                        )}
                        {proposal.status === 'REJECTED' && (
                          <div>
                            <p>Rejected on {new Date(proposal.rejectedAt!).toLocaleDateString()} by {proposal.rejectedBy?.username}</p>
                            {proposal.adminComment && (
                              <p className="mt-1"><strong>Reason:</strong> {proposal.adminComment}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Proposal Details Dialog */}
        <Dialog open={showProposalDetailsDialog} onOpenChange={setShowProposalDetailsDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Proposal Details</DialogTitle>
            </DialogHeader>
            {selectedProposal && (
              <Accordion type="single" collapsible className="w-full">
                {/* Hotels */}
                <AccordionItem value="hotels">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      Hotels
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedProposal.hotelProposals.map(hotel => (
                      <Card key={hotel.id} className="mb-3 p-3">
                        <div><strong>Name:</strong> {hotel.hotelName}</div>
                        <div><strong>Category:</strong> {hotel.hotelCategory}</div>
                        <div><strong>City:</strong> {hotel.city}</div>
                        <div><strong>Check-in:</strong> {hotel.checkInDate}</div>
                        <div><strong>Check-out:</strong> {hotel.checkOutDate}</div>
                        <div><strong>Rooms:</strong> {hotel.numberOfRooms}</div>
                        <div><strong>Total Price:</strong> {hotel.totalHotelPrice} SAR</div>
                        <div>
                          <strong>Room Types:</strong>
                          <ul className="ml-4">
                            {hotel.roomTypeCounts?.map((room, idx) => (
                              <li key={idx}>{room.roomType}: {room.count} x {room.price} SAR</li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                {/* Flights */}
                <AccordionItem value="flights">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Flights
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedProposal.flightProposals.map(flight => (
                      <Card key={flight.id} className="mb-3 p-3">
                        <div><strong>Airline:</strong> {flight.airlineCompany}</div>
                        <div><strong>Departure:</strong> {flight.departureFlightDate}</div>
                        <div><strong>Return:</strong> {flight.returnFlightDate}</div>
                        <div><strong>Price per person:</strong> {flight.pricePerPerson} SAR</div>
                        <div><strong>Total Price:</strong> {flight.totalFlightPrice} SAR</div>
                      </Card>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                {/* Mazarat */}
                <AccordionItem value="mazarat">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Visits (Mazarat)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedProposal.mazaratProposals.map(maz => (
                      <Card key={maz.id} className="mb-3 p-3">
                        <div><strong>Name:</strong> {maz.mazaratName}</div>
                        <div><strong>Price per person:</strong> {maz.pricePerPerson} SAR</div>
                      </Card>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                {/* Other Costs */}
                <AccordionItem value="costs">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Other Costs
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div><strong>Transport Price:</strong> {selectedProposal.transportPrice} SAR</div>
                      <div><strong>Visa Price:</strong> {selectedProposal.visaPrice} SAR</div>
                      <div><strong>Benefice Price:</strong> {selectedProposal.beneficePrice} SAR</div>
                      <div className="font-bold text-green-600">
                        <strong>Total Price:</strong> {selectedProposal.totalPrice} SAR
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Status & Comments */}
                <AccordionItem value="status">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Status & Comments
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div><strong>Status:</strong> {selectedProposal.status}</div>
                      {selectedProposal.adminComment && (
                        <div>
                          <strong>Admin Comment:</strong>
                          <div className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">
                            {selectedProposal.adminComment}
                          </div>
                        </div>
                      )}
                      <div><strong>Submitted At:</strong> {selectedProposal.submittedAt}</div>
                      {selectedProposal.validatedAt && (
                        <div><strong>Validated At:</strong> {selectedProposal.validatedAt}</div>
                      )}
                      {selectedProposal.rejectedAt && (
                        <div><strong>Rejected At:</strong> {selectedProposal.rejectedAt}</div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UmrahDemands;