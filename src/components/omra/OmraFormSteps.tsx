import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PersonalInfoStep } from "./form/PersonalInfoStep";
import { TravelPartyStep } from "./form/TravelPartyStep";
import { TripPreferencesStep } from "./form/TripPreferencesStep";
import { ServiceSelectionStep } from "./form/ServiceSelectionStep";
import { AccommodationStep } from "./form/AccommodationStep";
import { ReviewStep } from "./form/ReviewStep";
import { SuccessStep } from "./form/SuccessStep";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaUser, FaUsers, FaCalendarAlt, FaCog, FaBed, FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passportNumber: string;
    passportExpiry: string;
    nationality: string;
  };
  travelParty: {
    adults: number;
    children: number;
    infants: number;
    ages: number[];
  };
  tripPreferences: {
    departureDate: string;
    returnDate: string;
    duration: string;
    flexibility: string;
    departureAirport: string;
  };
  services: {
    flights: boolean;
    hotels: boolean;
    transportation: boolean;
    guide: boolean;
    visa: boolean;
    insurance: boolean;
    ziyarat: boolean;
  };
  accommodation: {
    hotelCategory: string;
    locationPreference: string;
    roomType: string;
    mealPlan: string;
  };
  specialRequests: string;
}

const initialFormData: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passportNumber: "",
    passportExpiry: "",
    nationality: "",
  },
  travelParty: {
    adults: 1,
    children: 0,
    infants: 0,
    ages: [],
  },
  tripPreferences: {
    departureDate: "",
    returnDate: "",
    duration: "7",
    flexibility: "flexible",
    departureAirport: "",
  },
  services: {
    flights: true,
    hotels: true,
    transportation: true,
    guide: true,
    visa: true,
    insurance: true,
    ziyarat: false,
  },
  accommodation: {
    hotelCategory: "4-star",
    locationPreference: "close-to-haram",
    roomType: "double",
    mealPlan: "half-board",
  },
  specialRequests: "",
};

const steps = [
  { id: 1, titleKey: "form.step1.title", icon: FaUser },
  { id: 2, titleKey: "form.step2.title", icon: FaUsers },
  { id: 3, titleKey: "form.step3.title", icon: FaCalendarAlt },
  { id: 4, titleKey: "form.step4.title", icon: FaCog },
  { id: 5, titleKey: "form.step5.title", icon: FaBed },
  { id: 6, titleKey: "form.step6.title", icon: FaCheckCircle },
];

export const OmraFormSteps = () => {
  const { t, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && prev[section] !== null 
        ? { ...(prev[section] as object), ...data }
        : data
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return <SuccessStep />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData.personalInfo} onChange={(data) => updateFormData('personalInfo', data)} />;
      case 2:
        return <TravelPartyStep data={formData.travelParty} onChange={(data) => updateFormData('travelParty', data)} />;
      case 3:
        return <TripPreferencesStep data={formData.tripPreferences} onChange={(data) => updateFormData('tripPreferences', data)} />;
      case 4:
        return <ServiceSelectionStep data={formData.services} onChange={(data) => updateFormData('services', data)} />;
      case 5:
        return <AccommodationStep data={formData.accommodation} onChange={(data) => updateFormData('accommodation', data)} />;
      case 6:
        return <ReviewStep formData={formData} onChange={setFormData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-12 fade-in-up">
          <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center relative transition-all duration-500 shadow-lg backdrop-blur-sm ${
                        currentStep === step.id
                          ? "bg-gradient-islamic text-white shadow-islamic-green/40 border-2 border-islamic-green/30 ring-4 ring-islamic-gold/20"
                          : currentStep > step.id
                          ? "bg-gradient-islamic text-white shadow-islamic-green/40 border-2 border-islamic-green/30"
                          : "bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-muted/30 border-2 border-muted/40"
                      }`}
                    >
                      {currentStep === step.id && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-islamic-gold/0 via-islamic-gold/20 to-islamic-gold/0 animate-pulse" />
                      )}
                      <div className="relative z-10">
                        <StepIcon className={`h-5 w-5 drop-shadow-sm ${currentStep === step.id ? 'animate-pulse' : ''}`} />
                      </div>
                    </div>
                    <span className={`text-xs font-medium mt-3 text-center max-w-20 transition-all duration-300 ${
                      isRTL ? 'font-amiri text-right' : 'font-playfair text-center'
                    } ${
                      currentStep === step.id
                        ? 'text-islamic-green-dark font-bold scale-105'
                        : currentStep > step.id
                        ? 'text-islamic-green'
                        : 'text-muted-foreground'
                    }`}>
                      {t(step.titleKey)}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 px-2 relative">
                      <div className="relative h-1 mx-2">
                        <div className="absolute inset-0 bg-muted-dark/30 rounded-full" />
                        <div
                          className={`absolute inset-0 rounded-full transition-all duration-700 ease-out ${
                            currentStep > step.id
                              ? 'bg-gradient-islamic shadow-sm'
                              : 'bg-transparent'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-foreground ${
              isRTL ? 'font-amiri text-right' : 'font-playfair text-center'
            }`}>
              {t('form.step')} {currentStep}: {t(steps[currentStep - 1].titleKey)}
            </h2>
            <p className={`text-lg text-muted-foreground ${
              isRTL ? 'font-amiri text-right' : 'font-inter text-center'
            }`}>
              {t('form.subtitle')}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <Card className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-islamic-green/20 shadow-2xl overflow-hidden">
          <div className="p-8 bg-islamic-pattern bg-opacity-5">
            {renderStepContent()}
            
            {/* Navigation */}
            <div className={`flex justify-between mt-8 pt-6 border-t border-islamic-green/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 bg-gradient-to-r from-card/80 to-card/60 border-islamic-green/30 text-islamic-green-dark hover:bg-islamic-green/10 hover:border-islamic-green/50 transition-all duration-300 ${
                  isRTL ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                <span className={isRTL ? 'font-amiri' : 'font-inter'}>{t('form.previous')}</span>
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  className={`bg-gradient-islamic hover:bg-islamic-green-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ${
                    isRTL ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <span className={isRTL ? 'font-amiri' : 'font-inter'}>{t('form.continue')}</span>
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};