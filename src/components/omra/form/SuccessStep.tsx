import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Heart, Phone, Mail, MessageCircle } from "lucide-react";

export const SuccessStep = () => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
      <div className="fade-in-up">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-accent-foreground" />
        </div>
        
        <h2 className="text-4xl font-bold text-primary mb-4">
          <span className="font-arabic text-3xl block mb-2">الحمد لله</span>
          Request Submitted Successfully!
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8">
          May Allah accept your intention and bless your sacred journey to the Holy Cities.
        </p>
      </div>

      <Card className="form-card text-left">
        <div className="space-y-6">
          <div className="text-center">
            <Heart className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-primary mb-4">What happens next?</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Review & Quote Preparation</h4>
                <p className="text-sm text-muted-foreground">
                  Our Umrah specialists will carefully review your requirements and prepare a detailed, 
                  personalized quotation within 72 hours.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Personal Consultation</h4>
                <p className="text-sm text-muted-foreground">
                  We'll contact you via phone or email to discuss your preferences, answer any questions, 
                  and finalize the details of your spiritual journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Booking Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  Once you approve the quotation, we'll proceed with securing your reservations and 
                  begin the visa application process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Pre-Departure Support</h4>
                <p className="text-sm text-muted-foreground">
                  Complete guidance on preparation, documentation, and spiritual readiness for your 
                  blessed journey to the Holy Cities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="form-card bg-islamic-green-light/10">
        <div className="text-center space-y-4">
          <h4 className="text-xl font-semibold text-primary">Need Immediate Assistance?</h4>
          <p className="text-muted-foreground">
            Our Umrah specialists are available to help with any questions or concerns
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+1 (555) 123-OMRA</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>info@omrajourney.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>Live Chat Support</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-lg font-semibold text-primary">
          <span className="font-arabic text-xl block mb-2">تقبل الله منا ومنكم</span>
          May Allah accept it from us and from you
        </p>
        
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Plan Another Journey
        </Button>
      </div>

      <div className="bg-gradient-islamic/10 p-6 rounded-lg">
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          "And whoever enters it shall be safe. Pilgrimage to the House is a duty unto Allah for mankind, 
          for him who can find a way thither." - Quran 3:97
        </p>
      </div>
    </div>
  );
};