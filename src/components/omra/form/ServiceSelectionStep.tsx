import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plane, Hotel, Car, UserCheck, FileText, Shield, MapPin } from "lucide-react";

interface ServicesData {
  flights: boolean;
  hotels: boolean;
  transportation: boolean;
  guide: boolean;
  visa: boolean;
  insurance: boolean;
  ziyarat: boolean;
}

interface ServiceSelectionStepProps {
  data: ServicesData;
  onChange: (data: Partial<ServicesData>) => void;
}

export const ServiceSelectionStep = ({ data, onChange }: ServiceSelectionStepProps) => {
  const services = [
    {
      key: 'flights' as keyof ServicesData,
      icon: Plane,
      title: 'Flight Booking',
      description: 'Round-trip flights to Jeddah or Medina',
      recommended: true,
      price: 'From $800'
    },
    {
      key: 'hotels' as keyof ServicesData,
      icon: Hotel,
      title: 'Hotel Accommodation',
      description: 'Comfortable stays near the Holy Mosques',
      recommended: true,
      price: 'From $150/night'
    },
    {
      key: 'transportation' as keyof ServicesData,
      icon: Car,
      title: 'Ground Transportation',
      description: 'Airport transfers and city transportation',
      recommended: true,
      price: 'From $200'
    },
    {
      key: 'guide' as keyof ServicesData,
      icon: UserCheck,
      title: 'Religious Guide',
      description: 'Experienced Umrah guide for spiritual guidance',
      recommended: true,
      price: 'From $300'
    },
    {
      key: 'visa' as keyof ServicesData,
      icon: FileText,
      title: 'Visa Processing',
      description: 'Saudi Arabia visa application assistance',
      recommended: true,
      price: 'From $150'
    },
    {
      key: 'insurance' as keyof ServicesData,
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Comprehensive travel and medical coverage',
      recommended: true,
      price: 'From $50'
    },
    {
      key: 'ziyarat' as keyof ServicesData,
      icon: MapPin,
      title: 'Ziyarat Tours',
      description: 'Visits to historical Islamic sites',
      recommended: false,
      price: 'From $200'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✨</span>
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Service Selection</h3>
        <p className="text-muted-foreground">Choose the services you need for your Umrah journey</p>
      </div>

      <div className="grid gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = data[service.key];
          
          return (
            <Card
              key={service.key}
              className={`p-6 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-primary bg-islamic-green-light/10' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onChange({ [service.key]: !isSelected })}
            >
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={isSelected}
                  onChange={() => onChange({ [service.key]: !isSelected })}
                  className="mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">{service.title}</h4>
                        {service.recommended && (
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{service.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-islamic/10">
          <h4 className="font-semibold text-lg mb-3 text-primary">Essential Package</h4>
          <div className="space-y-2 text-sm">
            <p>✓ Flight Booking</p>
            <p>✓ Hotel Accommodation</p>
            <p>✓ Transportation</p>
            <p>✓ Religious Guide</p>
            <p>✓ Visa Processing</p>
            <p>✓ Travel Insurance</p>
          </div>
          <p className="mt-4 text-lg font-bold text-primary">Starting from $2,500</p>
        </Card>

        <Card className="p-6 bg-islamic-gold-light/20">
          <h4 className="font-semibold text-lg mb-3 text-accent-foreground">Premium Package</h4>
          <div className="space-y-2 text-sm">
            <p>✓ All Essential Services</p>
            <p>✓ Ziyarat Tours</p>
            <p>✓ Private Guide</p>
            <p>✓ Premium Hotels</p>
            <p>✓ Business Class Flights</p>
            <p>✓ 24/7 Support</p>
          </div>
          <p className="mt-4 text-lg font-bold text-accent-foreground">Starting from $4,500</p>
        </Card>
      </div>

      <div className="bg-islamic-green-light/20 p-4 rounded-lg border-l-4 border-primary">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> You can customize your package by selecting individual services. 
          Our team will provide a detailed quote based on your selections and travel dates.
        </p>
      </div>
    </div>
  );
};