import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { umrahAPI } from '@/services/umrah-api';
import { HotelProposalDTO, FlightProposalDTO, MazaratProposalDTO, UmrahDemand, City, RoomTypeCount, PartenaireProposal } from '@/types/umrah';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Trash2, Calculator, Lock, Calendar, Minus, AlertCircle, Edit } from 'lucide-react';
import { ProposalStatusBadge } from '@/components/omra/ProposalStatusBadge';

interface CreateProposalDialogProps {
  open: boolean;
  onClose: () => void;
  demand: UmrahDemand | null;
  proposal?: PartenaireProposal | null; // For editing existing proposals
  mode?: 'create' | 'edit';
  onProposalUpdated?: () => void; // Callback when proposal is updated
}

// Room type configuration
const ROOM_TYPES = [
  { key: 'single', label: 'Single Room', capacity: 1 },
  { key: 'double', label: 'Double Room', capacity: 2 },
  { key: 'triple', label: 'Triple Room', capacity: 3 },
  { key: 'family', label: 'Family Room', capacity: 4 },
] as const;

const CreateProposal = ({ 
  open, 
  onClose, 
  demand, 
  proposal = null, 
  mode = 'create',
  onProposalUpdated 
}: CreateProposalDialogProps) => {
  const [hotels, setHotels] = useState<HotelProposalDTO[]>([]);
  const [flights, setFlights] = useState<FlightProposalDTO[]>([]);
  const [mazarat, setMazarat] = useState<MazaratProposalDTO[]>([]);
  const [transportPrice, setTransportPrice] = useState(0);
  const [visaPrice, setVisaPrice] = useState(0);
  const [beneficePrice, setBeneficePrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get available hotel categories from demand
  const availableHotelCategories = demand?.hotelCategories || [];
  
  // Get date range from demand
  const minDate = demand?.departureDate || '';
  const maxDate = demand?.returnDate || '';

  // Calculate total capacity for a hotel
  const calculateTotalCapacity = (roomTypeCounts: RoomTypeCount[]) => {
    return roomTypeCounts.reduce((total, room) => {
      const roomConfig = ROOM_TYPES.find(r => r.key === room.roomType);
      return total + (room.count * (roomConfig?.capacity || 1));
    }, 0);
  };

  // Calculate total rooms count
  const calculateTotalRooms = (roomTypeCounts: RoomTypeCount[]) => {
    return roomTypeCounts.reduce((total, room) => total + room.count, 0);
  };

  // Calculate hotel price based on room types and nights
  const calculateHotelPrice = (hotel: HotelProposalDTO) => {
    const nights = calculateNights(hotel.checkInDate, hotel.checkOutDate);
    return hotel.roomTypeCounts.reduce((total, room) => {
      return total + (room.count * room.price * nights);
    }, 0);
  };

  // Update room type count
  const updateRoomTypeCount = (hotelIndex: number, roomType: string, count: number) => {
    const updated = [...hotels];
    const hotel = updated[hotelIndex];
    
    const existingRoomIndex = hotel.roomTypeCounts.findIndex(rt => rt.roomType === roomType);
    
    if (existingRoomIndex >= 0) {
      if (count === 0) {
        // Remove room type if count is 0
        hotel.roomTypeCounts = hotel.roomTypeCounts.filter(rt => rt.roomType !== roomType);
      } else {
        // Update count
        hotel.roomTypeCounts[existingRoomIndex] = {
          ...hotel.roomTypeCounts[existingRoomIndex],
          count
        };
      }
    } else if (count > 0) {
      // Add new room type
      hotel.roomTypeCounts.push({
        roomType,
        count,
        price: 0
      });
    }
    
    // Update total rooms count
    hotel.numberOfRooms = calculateTotalRooms(hotel.roomTypeCounts);
    
    // Update total price
    hotel.totalHotelPrice = calculateHotelPrice(hotel);
    
    setHotels(updated);
  };

  // Update room price
  const updateRoomPrice = (hotelIndex: number, roomType: string, price: number) => {
    const updated = [...hotels];
    const hotel = updated[hotelIndex];
    
    const roomIndex = hotel.roomTypeCounts.findIndex(rt => rt.roomType === roomType);
    if (roomIndex >= 0) {
      hotel.roomTypeCounts[roomIndex] = {
        ...hotel.roomTypeCounts[roomIndex],
        price
      };
      
      // Update total price
      hotel.totalHotelPrice = calculateHotelPrice(hotel);
    }
    
    setHotels(updated);
  };

  // Get all booked date ranges for hotels to disable overlapping dates
  const getBookedDateRanges = () => {
    return hotels.map(hotel => ({
      checkIn: hotel.checkInDate,
      checkOut: hotel.checkOutDate
    })).filter(range => range.checkIn && range.checkOut);
  };

  // Check if a date is within any booked range
  const isDateBooked = (date: string, currentHotelIndex: number) => {
    const bookedRanges = getBookedDateRanges();
    const dateObj = new Date(date);
    
    return bookedRanges.some((range, index) => {
      if (index === currentHotelIndex) return false;
      if (!range.checkIn || !range.checkOut) return false;
      
      const checkIn = new Date(range.checkIn);
      const checkOut = new Date(range.checkOut);
      
      return dateObj >= checkIn && dateObj <= checkOut;
    });
  };

  // Calculate number of nights
  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Validate check-in/check-out dates
  const validateHotelDates = (checkIn: string, checkOut: string, hotelIndex: number) => {
    if (!checkIn || !checkOut) return { isValid: true, message: '' };
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const min = new Date(minDate);
    const max = new Date(maxDate);
    
    if (checkInDate < min || checkOutDate > max) {
      return { isValid: false, message: 'Dates must be within travel period' };
    }
    
    if (checkOutDate <= checkInDate) {
      return { isValid: false, message: 'Check-out must be after check-in' };
    }
    
    const hasOverlap = getBookedDateRanges().some((range, index) => {
      if (index === hotelIndex || !range.checkIn || !range.checkOut) return false;
      
      const otherCheckIn = new Date(range.checkIn);
      const otherCheckOut = new Date(range.checkOut);
      
      return (
        (checkInDate >= otherCheckIn && checkInDate <= otherCheckOut) ||
        (checkOutDate >= otherCheckIn && checkOutDate <= otherCheckOut) ||
        (checkInDate <= otherCheckIn && checkOutDate >= otherCheckOut)
      );
    });
    
    if (hasOverlap) {
      return { isValid: false, message: 'Dates overlap with another hotel' };
    }
    
    return { isValid: true, message: '' };
  };

  // Initialize form data
  useEffect(() => {
    if (demand && open) {
      if (mode === 'edit' && proposal) {
        // Edit mode - load existing proposal data
        setHotels(proposal.hotelProposals.map(hotel => ({
          hotelCategory: hotel.hotelCategory,
          city: hotel.city,
          hotelName: hotel.hotelName,
          checkInDate: hotel.checkInDate,
          checkOutDate: hotel.checkOutDate,
          numberOfRooms: hotel.numberOfRooms,
          roomTypeCounts: hotel.roomTypeCounts || [
            { roomType: 'double', count: hotel.numberOfRooms, price: hotel.doubleRoomPrice || 0 }
          ],
          totalHotelPrice: hotel.totalHotelPrice || 0,
        })));
        
        setFlights(proposal.flightProposals.map(flight => ({
          airlineCompany: flight.airlineCompany,
          departureFlightDate: flight.departureFlightDate,
          returnFlightDate: flight.returnFlightDate,
          pricePerPerson: flight.pricePerPerson,
        })));
        
        setMazarat(proposal.mazaratProposals.map(maz => ({
          mazaratName: maz.mazaratName,
          pricePerPerson: maz.pricePerPerson,
        })));
        
        setTransportPrice(proposal.transportPrice);
        setVisaPrice(proposal.visaPrice);
        setBeneficePrice(proposal.beneficePrice);
      } else {
        // Create mode - initialize with default data
        const defaultHotel: HotelProposalDTO = {
          hotelCategory: availableHotelCategories[0] || '',
          city: 'MECCA',
          hotelName: '',
          checkInDate: demand.departureDate,
          checkOutDate: demand.returnDate,
          numberOfRooms: demand.numberOfRooms,
          roomTypeCounts: [
            { roomType: 'double', count: demand.numberOfRooms, price: 0 },
          ],
          totalHotelPrice: 0,
        };
        setHotels([defaultHotel]);

        setFlights([{
          airlineCompany: '',
          departureFlightDate: `${demand.departureDate}T00:00`,
          returnFlightDate: `${demand.returnDate}T00:00`,
          pricePerPerson: 0,
        }]);

        setMazarat([{ mazaratName: '', pricePerPerson: 0 }]);
        
        // Reset prices for new proposal
        setTransportPrice(0);
        setVisaPrice(0);
        setBeneficePrice(0);
      }
    }
  }, [demand, open, mode, proposal]);

  const calculateTotal = () => {
    if (!demand) return 0;
    const totalPeople = demand.travelParty.totalTravelers;
    const hotelCost = hotels.reduce((total, hotel) => total + hotel.totalHotelPrice, 0);
    const flightCost = flights.reduce((total, flight) => total + flight.pricePerPerson, 0) * totalPeople;
    const mazaratCost = mazarat.reduce((total, maz) => total + maz.pricePerPerson, 0) * totalPeople;
    const transport = transportPrice * totalPeople;
    const visa = visaPrice * totalPeople;
    return hotelCost + flightCost + mazaratCost + transport + visa + beneficePrice;
  };

  const addHotel = () => {
    const allDates = getBookedDateRanges();
    let availableStartDate = minDate;
    
    if (allDates.length > 0) {
      const lastCheckOut = new Date(Math.max(...allDates.map(range => new Date(range.checkOut).getTime())));
      lastCheckOut.setDate(lastCheckOut.getDate() + 1);
      availableStartDate = lastCheckOut.toISOString().split('T')[0];
    }

    setHotels([...hotels, {
      hotelCategory: availableHotelCategories[0] || '',
      city: hotels[hotels.length - 1]?.city || 'MECCA',
      hotelName: '',
      checkInDate: availableStartDate,
      checkOutDate: maxDate,
      numberOfRooms: demand?.numberOfRooms || 1,
      roomTypeCounts: [
        { roomType: 'double', count: demand?.numberOfRooms || 1, price: 0 },
      ],
      totalHotelPrice: 0,
    }]);
  };

  const removeHotel = (index: number) => {
    if (hotels.length > 1) {
      setHotels(hotels.filter((_, i) => i !== index));
    }
  };

  const updateHotel = (index: number, field: keyof HotelProposalDTO, value: any) => {
    const updated = [...hotels];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'checkInDate' && value && updated[index].checkOutDate) {
      const checkIn = new Date(value);
      const checkOut = new Date(updated[index].checkOutDate);
      if (checkOut <= checkIn) {
        const newCheckOut = new Date(checkIn);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        updated[index].checkOutDate = newCheckOut.toISOString().split('T')[0];
      }
    }
    
    // Recalculate price when dates change
    if (field === 'checkInDate' || field === 'checkOutDate') {
      updated[index].totalHotelPrice = calculateHotelPrice(updated[index]);
    }
    
    setHotels(updated);
  };

  const addMazarat = () => {
    setMazarat([...mazarat, { mazaratName: '', pricePerPerson: 0 }]);
  };

  const removeMazarat = (index: number) => {
    if (mazarat.length > 1) {
      setMazarat(mazarat.filter((_, i) => i !== index));
    }
  };

  const updateMazarat = (index: number, field: keyof MazaratProposalDTO, value: any) => {
    const updated = [...mazarat];
    updated[index] = { ...updated[index], [field]: value };
    setMazarat(updated);
  };

  const handleSubmit = async () => {
    if (!demand) return;

    // Validate all hotel dates
    const invalidHotels = hotels.map((hotel, index) => ({
      index,
      validation: validateHotelDates(hotel.checkInDate, hotel.checkOutDate, index)
    })).filter(item => !item.validation.isValid);

    if (invalidHotels.length > 0) {
      const firstInvalid = invalidHotels[0];
      toast({
        title: 'Invalid Dates',
        description: `Hotel ${firstInvalid.index + 1}: ${firstInvalid.validation.message}`,
        variant: 'destructive',
      });
      return;
    }

    // Validate room capacity
    const capacityIssues = hotels.map((hotel, index) => {
      const totalCapacity = calculateTotalCapacity(hotel.roomTypeCounts);
      const requiredCapacity = demand.travelParty.adults + demand.travelParty.children;
      return { index, totalCapacity, requiredCapacity };
    }).filter(item => item.totalCapacity < item.requiredCapacity);

    if (capacityIssues.length > 0) {
      const firstIssue = capacityIssues[0];
      toast({
        title: 'Insufficient Room Capacity',
        description: `Hotel ${firstIssue.index + 1}: ${firstIssue.totalCapacity} capacity for ${firstIssue.requiredCapacity} people`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        hotelProposals: hotels.filter(h => h.hotelName),
        flightProposals: flights.filter(f => f.airlineCompany),
        mazaratProposals: mazarat.filter(m => m.mazaratName && m.pricePerPerson > 0),
        transportPrice,
        visaPrice,
        beneficePrice,
        totalPrice: calculateTotal(), // <-- Add this line
      };

      if (mode === 'edit' && proposal) {
        await umrahAPI.partenaire.updateProposal(proposal.id, payload);
        toast({
          title: 'Success',
          description: 'Proposal updated successfully',
        });
        onProposalUpdated?.();
      } else {
        await umrahAPI.partenaire.createProposal(demand.id, payload);
        toast({
          title: 'Success',
          description: 'Proposal created successfully',
        });
      }
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${mode === 'edit' ? 'update' : 'create'} proposal`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Show rejection info if editing a rejected proposal
  const showRejectionInfo = mode === 'edit' && proposal?.status === 'REJECTED';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {mode === 'edit' ? (
              <>
                <Edit className="h-5 w-5" />
                Modify Proposal #{proposal?.id}
              </>
            ) : (
              `Create Proposal for Demand #${demand?.id}`
            )}
            {proposal && <ProposalStatusBadge status={proposal.status} />}
          </DialogTitle>
        </DialogHeader>
        
        {demand && (
          <div className="space-y-6">
            {/* Rejection Info */}
            {showRejectionInfo && (
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800">Proposal Rejected</h3>
                    <p className="text-red-700 text-sm mt-1">
                      <strong>Admin Comment:</strong> {proposal.adminComment}
                    </p>
                    <p className="text-red-600 text-xs mt-1">
                      Rejected on {new Date(proposal.rejectedAt!).toLocaleDateString()} by {proposal.rejectedBy?.username}
                    </p>
                    <p className="text-red-600 text-xs mt-2">
                      Please modify your proposal according to the admin's feedback and resubmit.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Demand Summary */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-blue-600">Travel Dates</Label>
                  <p className="font-medium">{minDate} to {maxDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-blue-600">Travelers</Label>
                  <p className="font-medium">
                    {demand.travelParty.adults}A, {demand.travelParty.children}C, {demand.travelParty.infants || 0}I
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-blue-600">Rooms Required</Label>
                  <p className="font-medium">{demand.numberOfRooms} rooms</p>
                </div>
                <div>
                  <Label className="text-xs text-blue-600">Preferred Categories</Label>
                  <p className="font-medium">{availableHotelCategories.join(', ')}</p>
                </div>
              </div>
            </Card>

            {/* Flight Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Flight Information</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Airline Company *</Label>
                  <Input
                    value={flights[0]?.airlineCompany || ''}
                    onChange={(e) => setFlights([{ ...flights[0], airlineCompany: e.target.value }])}
                    placeholder="Airline name"
                  />
                </div>
                <div>
                  <Label>Departure Date *</Label>
                  <Input
                    type="datetime-local"
                    value={flights[0]?.departureFlightDate || ''}
                    onChange={(e) => setFlights([{ ...flights[0], departureFlightDate: e.target.value }])}
                    min={`${minDate}T00:00`}
                    max={`${maxDate}T23:59`}
                  />
                </div>
                <div>
                  <Label>Return Date *</Label>
                  <Input
                    type="datetime-local"
                    value={flights[0]?.returnFlightDate || ''}
                    onChange={(e) => setFlights([{ ...flights[0], returnFlightDate: e.target.value }])}
                    min={`${minDate}T00:00`}
                    max={`${maxDate}T23:59`}
                  />
                </div>
                <div>
                  <Label>Price per Person *</Label>
                  <Input
                    type="number"
                    value={flights[0]?.pricePerPerson || 0}
                    onChange={(e) => setFlights([{ ...flights[0], pricePerPerson: Number(e.target.value) }])}
                    min={0}
                  />
                </div>
              </div>
            </Card>

            {/* Hotels Section */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Hotels</h2>
                  <p className="text-sm text-muted-foreground">
                    Available categories: {availableHotelCategories.join(', ')}
                  </p>
                </div>
                <Button size="sm" onClick={addHotel}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hotel
                </Button>
              </div>
              <div className="space-y-6">
                {hotels.map((hotel, index) => {
                  const nights = calculateNights(hotel.checkInDate, hotel.checkOutDate);
                  const validation = validateHotelDates(hotel.checkInDate, hotel.checkOutDate, index);
                  const totalCapacity = calculateTotalCapacity(hotel.roomTypeCounts);
                  const requiredCapacity = demand.travelParty.adults + demand.travelParty.children;
                  
                  return (
                    <div key={index} className={`p-6 rounded-lg border-2 ${validation.isValid ? 'bg-muted border-transparent' : 'bg-red-50 border-red-200'}`}>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Basic Hotel Info */}
                        <div className="space-y-4">
                          <div>
                            <Label>City *</Label>
                            <Select value={hotel.city} onValueChange={(v) => updateHotel(index, 'city', v as City)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MECCA">Mecca</SelectItem>
                                <SelectItem value="MEDINA">Medina</SelectItem>
                                <SelectItem value="JEDDAH">Jeddah</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Hotel Name *</Label>
                            <Input
                              value={hotel.hotelName}
                              onChange={(e) => updateHotel(index, 'hotelName', e.target.value)}
                              placeholder="Enter hotel name"
                            />
                          </div>
                          <div>
                            <Label>Category *</Label>
                            <Select 
                              value={hotel.hotelCategory} 
                              onValueChange={(v) => updateHotel(index, 'hotelCategory', v)}
                            >
                              <SelectTrigger className={!availableHotelCategories.includes(hotel.hotelCategory) ? 'border-orange-500' : ''}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {availableHotelCategories.map(category => (
                                  <SelectItem key={category} value={category}>
                                    {category === '5-star' ? '5 Stars' : 
                                     category === '4-star' ? '4 Stars' : 
                                     category.charAt(0).toUpperCase() + category.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Check-in *</Label>
                              <Input
                                type="date"
                                value={hotel.checkInDate}
                                onChange={(e) => updateHotel(index, 'checkInDate', e.target.value)}
                                min={minDate}
                                max={maxDate}
                              />
                            </div>
                            <div>
                              <Label>Check-out *</Label>
                              <Input
                                type="date"
                                value={hotel.checkOutDate}
                                onChange={(e) => updateHotel(index, 'checkOutDate', e.target.value)}
                                min={minDate}
                                max={maxDate}
                              />
                            </div>
                          </div>
                          
                          {/* Nights and Validation */}
                          {hotel.checkInDate && hotel.checkOutDate && (
                            <div className={`p-3 rounded ${validation.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">
                                  {validation.isValid ? '✓' : '⚠'} {nights} night{nights !== 1 ? 's' : ''}
                                </span>
                                {!validation.isValid && (
                                  <span className="text-xs">{validation.message}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Room Type Selection */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <Label className="text-lg font-semibold">Room Configuration</Label>
                          <div className="text-sm text-muted-foreground">
                            Total: {hotel.numberOfRooms} rooms • Capacity: {totalCapacity}/{requiredCapacity} people
                            {totalCapacity < requiredCapacity && (
                              <span className="text-red-600 ml-2">⚠ Insufficient capacity</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {ROOM_TYPES.map(roomType => {
                            const roomConfig = hotel.roomTypeCounts.find(rt => rt.roomType === roomType.key);
                            const count = roomConfig?.count || 0;
                            const price = roomConfig?.price || 0;
                            
                            return (
                              <div key={roomType.key} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                  <Label className="font-medium">{roomType.label}</Label>
                                  <p className="text-sm text-muted-foreground">Capacity: {roomType.capacity} person(s)</p>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  {/* Room Count */}
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateRoomTypeCount(index, roomType.key, Math.max(0, count - 1))}
                                      disabled={count === 0}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{count}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateRoomTypeCount(index, roomType.key, count + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  
                                  {/* Price Input */}
                                  <div className="w-32">
                                    <Input
                                      type="number"
                                      placeholder="Price"
                                      value={price || ''}
                                      onChange={(e) => updateRoomPrice(index, roomType.key, Number(e.target.value))}
                                      min={0}
                                      disabled={count === 0}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hotel Total */}
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <div>
                          <Label className="font-semibold">Hotel Total</Label>
                          <p className="text-sm text-muted-foreground">
                            {hotel.numberOfRooms} rooms × {nights} nights
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            {hotel.totalHotelPrice.toLocaleString()} SAR
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {nights > 0 ? (hotel.totalHotelPrice / nights).toLocaleString() : 0} SAR per night
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      {hotels.length > 1 && (
                        <div className="flex justify-end mt-4">
                          <Button size="sm" variant="destructive" onClick={() => removeHotel(index)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Hotel
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Mazarat */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Mazarat (Religious Visits)</h2>
                <Button size="sm" onClick={addMazarat}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Visit
                </Button>
              </div>
              <div className="space-y-3">
                {mazarat.map((maz, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                    <div className="col-span-2">
                      <Label>Visit Name {index === 0 && '(Optional)'}</Label>
                      <Input
                        value={maz.mazaratName}
                        onChange={(e) => updateMazarat(index, 'mazaratName', e.target.value)}
                        placeholder="e.g., Jabal al-Nour, Mount Uhud"
                      />
                    </div>
                    <div>
                      <Label>Price per Person</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={maz.pricePerPerson}
                          onChange={(e) => updateMazarat(index, 'pricePerPerson', Number(e.target.value))}
                          min={0}
                        />
                        {mazarat.length > 1 && (
                          <Button size="sm" variant="destructive" onClick={() => removeMazarat(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Other Costs */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Additional Costs</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Transport (per person)</Label>
                  <Input
                    type="number"
                    value={transportPrice}
                    onChange={(e) => setTransportPrice(Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Visa (per person)</Label>
                  <Input
                    type="number"
                    value={visaPrice}
                    onChange={(e) => setVisaPrice(Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Benefice (total)</Label>
                  <Input
                    type="number"
                    value={beneficePrice}
                    onChange={(e) => setBeneficePrice(Number(e.target.value))}
                    min={0}
                  />
                </div>
              </div>
            </Card>

            {/* Total */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calculator className="h-8 w-8 text-green-600" />
                  <div>
                    <h2 className="text-2xl font-bold">Total Price</h2>
                    <p className="text-muted-foreground">
                      For {demand.travelParty.totalTravelers} travelers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-green-600">{calculateTotal().toLocaleString()} SAR</p>
                  <p className="text-sm text-muted-foreground">
                    {(calculateTotal() / demand.travelParty.totalTravelers).toFixed(0)} SAR per person
                  </p>
                </div>
              </div>
            </Card>

            <DialogFooter>
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  'Submitting...'
                ) : mode === 'edit' ? (
                  'Update Proposal'
                ) : (
                  'Submit Proposal'
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposal;