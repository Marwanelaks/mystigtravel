import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { umrahAPI } from '@/services/umrah-api';
import { PartenaireProposal } from '@/types/umrah';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Hotel, Plane, MapPin, DollarSign } from 'lucide-react';
import PartnerLayout from './PartnerLayout';

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<PartenaireProposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProposal();
  }, [id]);

  const loadProposal = async () => {
    if (!id) return;
    try {
      const data = await umrahAPI.partenaire.getProposal(Number(id));
      setProposal(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load proposal',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </PartnerLayout>
    );
  }

  if (!proposal) {
    return (
      <PartnerLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Proposal not found</h1>
            <Button onClick={() => navigate('/my-proposals')}>Back to Proposals</Button>
          </div>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/my-proposals')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Proposals
            </Button>
            <Badge variant={proposal.isActive ? 'default' : 'secondary'}>
              {proposal.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Proposal #{proposal.id}</h1>
                <p className="text-muted-foreground">
                  Submitted on {new Date(proposal.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                <div className="text-4xl font-bold text-green-600">
                  {proposal.totalPrice.toLocaleString()} SAR
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {(proposal.totalPrice / proposal.umrahDemand.travelParty.totalTravelers).toFixed(0)} SAR per person
                </div>
              </div>
            </div>

            {/* Hotels */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold">Hotels ({proposal.hotelProposals.length})</h2>
              </div>
              <div className="space-y-4">
                {proposal.hotelProposals.map((hotel, index) => (
                  <Card key={hotel.id} className="p-4 bg-blue-50/50">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Hotel Name</div>
                        <div className="font-semibold">{hotel.hotelName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">City</div>
                        <div className="font-semibold">{hotel.city}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <Badge>{hotel.hotelCategory}</Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Rooms</div>
                        <div className="font-semibold">{hotel.numberOfRooms}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Check-in</div>
                        <div>{new Date(hotel.checkInDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Check-out</div>
                        <div>{new Date(hotel.checkOutDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Room Type</div>
                        <div className="font-semibold">{hotel.assignedRoomType || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="font-bold text-blue-600">
                          {hotel.totalHotelPrice?.toLocaleString() || 'N/A'} SAR
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground">Single</div>
                        <div className="text-sm font-medium">{hotel.singleRoomPrice} SAR</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Double</div>
                        <div className="text-sm font-medium">{hotel.doubleRoomPrice} SAR</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Triple</div>
                        <div className="text-sm font-medium">{hotel.tripleRoomPrice} SAR</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Family</div>
                        <div className="text-sm font-medium">{hotel.familyRoomPrice} SAR</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Flights */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-bold">Flights ({proposal.flightProposals.length})</h2>
              </div>
              <div className="space-y-4">
                {proposal.flightProposals.map((flight, index) => (
                  <Card key={flight.id} className="p-4 bg-indigo-50/50">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Airline</div>
                        <div className="font-semibold">{flight.airlineCompany}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Departure</div>
                        <div>{new Date(flight.departureFlightDate).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Return</div>
                        <div>{new Date(flight.returnFlightDate).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Price per Person</div>
                        <div className="font-bold text-indigo-600">{flight.pricePerPerson} SAR</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mazarat */}
            {proposal.mazaratProposals.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-bold">Religious Visits ({proposal.mazaratProposals.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {proposal.mazaratProposals.map((mazarat, index) => (
                    <Card key={mazarat.id} className="p-4 bg-purple-50/50">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">{mazarat.mazaratName}</div>
                        <div className="font-bold text-purple-600">{mazarat.pricePerPerson} SAR/person</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Costs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Additional Costs</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-green-50/50">
                  <div className="text-sm text-muted-foreground">Transport</div>
                  <div className="text-xl font-bold text-green-600">{proposal.transportPrice} SAR</div>
                  <div className="text-xs text-muted-foreground">per person</div>
                </Card>
                <Card className="p-4 bg-amber-50/50">
                  <div className="text-sm text-muted-foreground">Visa</div>
                  <div className="text-xl font-bold text-amber-600">{proposal.visaPrice} SAR</div>
                  <div className="text-xs text-muted-foreground">per person</div>
                </Card>
                <Card className="p-4 bg-teal-50/50">
                  <div className="text-sm text-muted-foreground">Benefice</div>
                  <div className="text-xl font-bold text-teal-600">{proposal.beneficePrice} SAR</div>
                  <div className="text-xs text-muted-foreground">total</div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default ProposalDetail;
