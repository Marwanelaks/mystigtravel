import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, User, Users, Calendar, MapPin, Hotel, FileText } from "lucide-react";
import { FormData } from "../OmraFormSteps";

interface ReviewStepProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ReviewStep = ({ formData, onChange, onSubmit, isSubmitting }: ReviewStepProps) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSpecialRequestsChange = (value: string) => {
    onChange({ ...formData, specialRequests: value });
  };

  const totalTravelers = formData.travelParty.adults + formData.travelParty.children + formData.travelParty.infants;
  const selectedServices = Object.entries(formData.services).filter(([_, selected]) => selected).map(([service, _]) => service);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Review Your Umrah Journey</h3>
        <p className="text-muted-foreground">Please review all details before submitting your request</p>
      </div>

      <div className="grid gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Personal Information</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}
            </div>
            <div>
              <span className="font-medium">Email:</span> {formData.personalInfo.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {formData.personalInfo.phone}
            </div>
            <div>
              <span className="font-medium">Nationality:</span> {formData.personalInfo.nationality}
            </div>
            <div>
              <span className="font-medium">Passport:</span> {formData.personalInfo.passportNumber}
            </div>
            <div>
              <span className="font-medium">Passport Expiry:</span> {formData.personalInfo.passportExpiry}
            </div>
          </div>
        </Card>

        {/* Travel Party */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Travel Party</h4>
          </div>
          <div className="text-sm">
            <p><span className="font-medium">Total Travelers:</span> {totalTravelers}</p>
            <p><span className="font-medium">Adults:</span> {formData.travelParty.adults}</p>
            {formData.travelParty.children > 0 && <p><span className="font-medium">Children:</span> {formData.travelParty.children}</p>}
            {formData.travelParty.infants > 0 && <p><span className="font-medium">Infants:</span> {formData.travelParty.infants}</p>}
            {formData.travelParty.ages.length > 0 && (
              <p><span className="font-medium">Ages:</span> {formData.travelParty.ages.join(', ')}</p>
            )}
          </div>
        </Card>

        {/* Trip Preferences */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Trip Preferences</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Departure Date:</span> {formData.tripPreferences.departureDate}
            </div>
            <div>
              <span className="font-medium">Return Date:</span> {formData.tripPreferences.returnDate}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {formData.tripPreferences.duration} days
            </div>
            <div>
              <span className="font-medium">Flexibility:</span> {formData.tripPreferences.flexibility}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Departure Airport:</span> {formData.tripPreferences.departureAirport}
            </div>
          </div>
        </Card>

        {/* Services */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Selected Services</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {selectedServices.map((service) => (
              <div key={service} className="flex items-center">
                <span className="text-accent mr-2">✓</span>
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </div>
            ))}
          </div>
        </Card>

        {/* Accommodation */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Hotel className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-semibold text-lg">Accommodation</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Hotel Category:</span> {formData.accommodation.hotelCategory}
            </div>
            <div>
              <span className="font-medium">Location:</span> {formData.accommodation.locationPreference}
            </div>
            <div>
              <span className="font-medium">Room Type:</span> {formData.accommodation.roomType}
            </div>
            <div>
              <span className="font-medium">Meal Plan:</span> {formData.accommodation.mealPlan}
            </div>
          </div>
        </Card>

        {/* Special Requests */}
        <Card className="p-6">
          <h4 className="font-semibold text-lg mb-4">Special Requests & Additional Information</h4>
          <div className="space-y-2">
            <Label htmlFor="specialRequests">
              Any special requirements, dietary restrictions, or additional information?
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleSpecialRequestsChange(e.target.value)}
              placeholder="Please share any special needs, dietary requirements, medical conditions, mobility assistance, or other requests that would help us serve you better during your spiritual journey..."
              rows={4}
            />
          </div>
        </Card>

        {/* Terms and Conditions */}
        <Card className="p-6 bg-islamic-green-light/10">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I acknowledge that I have reviewed all the information provided and agree to the{' '}
              <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I understand that this is a 
              request for quotation and that final pricing and availability will be confirmed by your team.
            </Label>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={onSubmit}
            disabled={!agreedToTerms || isSubmitting}
            className="btn-islamic text-lg px-8 py-4 h-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Your Request...
              </>
            ) : (
              <>
                Submit Umrah Request
                <span className="arabic-text mr-2">بسم الله</span>
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Our team will review your request and contact you within 72 hours with a detailed quotation
          </p>
        </div>
      </div>
    </div>
  );
};