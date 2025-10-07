import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Step1PersonalInfo } from './form/Step1PersonalInfo';
import { Step2AccommodationDetails } from './form/Step2AccommodationDetails';
import { Step3TripPreferences } from './form/Step3TripPreferences';
import { Step4Review } from './form/Step4Review';
import { SuccessStep } from './form/SuccessStep';
import { FormProvider } from '@/contexts/FormContext';
import { useForm } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaUser, FaBed, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const steps = [
  { id: 1, titleKey: 'Personal Information', icon: FaUser },
  { id: 2, titleKey: 'Accommodation Details', icon: FaBed },
  { id: 3, titleKey: 'Trip Preferences', icon: FaCalendarAlt },
  { id: 4, titleKey: 'Review & Submit', icon: FaCheckCircle },
];

const OmraFormContent: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { currentStep, nextStep, prevStep, isLastStep } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const scrollToForm = () => {
    const formElement = document.querySelector('.form-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextStep = () => {
    nextStep();
    setTimeout(scrollToForm, 100);
  };

  const handlePrevStep = () => {
    prevStep();
    setTimeout(scrollToForm, 100);
  };

  if (isSubmitted) {
    return <SuccessStep />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2AccommodationDetails />;
      case 3:
        return <Step3TripPreferences />;
      case 4:
        return <Step4Review onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-4xl mx-auto form-container">
        {/* Step Indicator */}
        <div className="mb-8 md:mb-12 fade-in-up">
          <div className={`flex items-center justify-between mb-8 overflow-x-auto pb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center min-w-fit">
                  <div className="flex flex-col items-center px-2">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative transition-all duration-500 shadow-lg backdrop-blur-sm ${
                        currentStep === step.id
                          ? 'bg-gradient-islamic text-white shadow-islamic-green/40 border-2 border-islamic-green/30 ring-4 ring-islamic-gold/20'
                          : currentStep > step.id
                          ? 'bg-gradient-islamic text-white shadow-islamic-green/40 border-2 border-islamic-green/30'
                          : 'bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-muted/30 border-2 border-muted/40'
                      }`}
                    >
                      {currentStep === step.id && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-islamic-gold/0 via-islamic-gold/20 to-islamic-gold/0 animate-pulse" />
                      )}
                      <div className="relative z-10">
                        <StepIcon className={`h-4 w-4 md:h-5 md:w-5 drop-shadow-sm ${currentStep === step.id ? 'animate-pulse' : ''}`} />
                      </div>
                    </div>
                    <span className={`text-[10px] md:text-xs font-medium mt-2 md:mt-3 text-center max-w-16 md:max-w-20 transition-all duration-300 ${
                      isRTL ? 'font-amiri text-right' : 'font-playfair text-center'
                    } ${
                      currentStep === step.id
                        ? 'text-islamic-green-dark font-bold scale-105'
                        : currentStep > step.id
                        ? 'text-islamic-green'
                        : 'text-muted-foreground'
                    }`}>
                      {step.titleKey}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 px-1 md:px-2 relative min-w-[20px] md:min-w-[40px]">
                      <div className="relative h-1 mx-1 md:mx-2">
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
        </div>

        {/* Form Content */}
        <Card className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-islamic-green/20 shadow-2xl overflow-hidden">
          <div className="p-4 md:p-8 bg-islamic-pattern bg-opacity-5">
            {renderStepContent()}

            {/* Navigation */}
            {currentStep < 4 && (
              <div className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-islamic-green/10 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-card/80 to-card/60 border-islamic-green/30 text-islamic-green-dark hover:bg-islamic-green/10 hover:border-islamic-green/50 transition-all duration-300 ${
                    isRTL ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  <span className={isRTL ? 'font-amiri' : 'font-inter'}>
                    {isRTL ? 'السابق' : 'Previous'}
                  </span>
                </Button>

                <Button
                  onClick={handleNextStep}
                  className={`w-full sm:w-auto bg-gradient-islamic hover:bg-islamic-green-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isRTL ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <span className={isRTL ? 'font-amiri' : 'font-inter'}>
                    {isRTL ? 'التالي' : 'Continue'}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export const OmraForm: React.FC = () => {
  return (
    <FormProvider>
      <OmraFormContent />
    </FormProvider>
  );
};
