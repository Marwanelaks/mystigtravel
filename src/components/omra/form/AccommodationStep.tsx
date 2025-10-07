import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Hotel, MapPin, Bed, Utensils } from "lucide-react";

interface AccommodationData {
  hotelCategory: string;
  locationPreference: string;
  roomType: string;
  mealPlan: string;
}

interface AccommodationStepProps {
  data: AccommodationData;
  onChange: (data: Partial<AccommodationData>) => void;
}

export const AccommodationStep = ({ data, onChange }: AccommodationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Hotel className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">Accommodation Preferences</h3>
        <p className="text-muted-foreground">Choose your preferred accommodation for your sacred journey</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Hotel className="w-5 h-5 text-primary mr-2" />
          <h4 className="font-semibold text-lg">Hotel Category</h4>
        </div>
        <RadioGroup
          value={data.hotelCategory}
          onValueChange={(value) => onChange({ hotelCategory: value })}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="3-star" id="3star" />
            <Label htmlFor="3star" className="flex-1">
              <div>
                <span className="font-medium">3-Star Hotels</span>
                <p className="text-sm text-muted-foreground">Basic comfort, clean rooms, essential amenities</p>
              </div>
            </Label>
            <span className="text-sm font-medium">$100-150/night</span>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="4-star" id="4star" />
            <Label htmlFor="4star" className="flex-1">
              <div>
                <span className="font-medium">4-Star Hotels</span>
                <p className="text-sm text-muted-foreground">Superior comfort, good facilities, room service</p>
              </div>
            </Label>
            <span className="text-sm font-medium">$200-300/night</span>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="5-star" id="5star" />
            <Label htmlFor="5star" className="flex-1">
              <div>
                <span className="font-medium">5-Star Hotels</span>
                <p className="text-sm text-muted-foreground">Luxury accommodation, premium amenities, concierge</p>
              </div>
            </Label>
            <span className="text-sm font-medium">$400-600/night</span>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
            <RadioGroupItem value="deluxe" id="deluxe" />
            <Label htmlFor="deluxe" className="flex-1">
              <div>
                <span className="font-medium">5-Star Deluxe</span>
                <p className="text-sm text-muted-foreground">Ultra-luxury, premium location, exceptional service</p>
              </div>
            </Label>
            <span className="text-sm font-medium">$800+/night</span>
          </div>
        </RadioGroup>
      </Card>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <MapPin className="w-5 h-5 text-primary mr-2" />
          <h4 className="font-semibold text-lg">Location Preference</h4>
        </div>
        <RadioGroup
          value={data.locationPreference}
          onValueChange={(value) => onChange({ locationPreference: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="close-to-haram" id="closeHaram" />
            <Label htmlFor="closeHaram">
              Walking distance to Masjid al-Haram (Mecca) - Premium pricing
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="near-haram" id="nearHaram" />
            <Label htmlFor="nearHaram">
              Near Masjid al-Haram (5-10 minutes by shuttle/walking)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="city-center" id="cityCenter" />
            <Label htmlFor="cityCenter">
              Mecca city center (15-20 minutes to Haram)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aziziah" id="aziziah" />
            <Label htmlFor="aziziah">
              Aziziah area (Budget-friendly, shuttle service provided)
            </Label>
          </div>
        </RadioGroup>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Bed className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Room Type</h4>
          </div>
          <Select value={data.roomType} onValueChange={(value) => onChange({ roomType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Room</SelectItem>
              <SelectItem value="double">Double Room (2 beds)</SelectItem>
              <SelectItem value="twin">Twin Room (1 double bed)</SelectItem>
              <SelectItem value="triple">Triple Room (3 beds)</SelectItem>
              <SelectItem value="quad">Quad Room (4 beds)</SelectItem>
              <SelectItem value="family">Family Suite</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Utensils className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Meal Plan</h4>
          </div>
          <Select value={data.mealPlan} onValueChange={(value) => onChange({ mealPlan: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select meal plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Room Only</SelectItem>
              <SelectItem value="breakfast">Breakfast Only</SelectItem>
              <SelectItem value="half-board">Half Board (Breakfast + Dinner)</SelectItem>
              <SelectItem value="full-board">Full Board (All Meals)</SelectItem>
              <SelectItem value="all-inclusive">All Inclusive</SelectItem>
            </SelectContent>
          </Select>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-islamic-green-light/20 p-4 rounded-lg border-l-4 border-primary">
          <h5 className="font-semibold mb-2">🕋 Mecca Recommendations</h5>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Stay close to Haram for easy access</li>
            <li>• Book early for Ramadan season</li>
            <li>• Higher floors offer better views</li>
            <li>• Consider air conditioning quality</li>
          </ul>
        </div>

        <div className="bg-islamic-gold-light/20 p-4 rounded-lg border-l-4 border-accent">
          <h5 className="font-semibold mb-2">🕌 Medina Recommendations</h5>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Walking distance to Prophet's Mosque</li>
            <li>• Quiet areas for better rest</li>
            <li>• Traditional Middle Eastern breakfast</li>
            <li>• 24-hour room service available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};