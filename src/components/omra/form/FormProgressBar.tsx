import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import { FaUser, FaUsers, FaCalendarAlt, FaCog, FaBed, FaCommentDots, FaCheckCircle } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const steps = [
  { key: 'form.step1', icon: FaUser, titleKey: 'form.step1.title' },
  { key: 'form.step2', icon: FaUsers, titleKey: 'form.step2.title' }, 
  { key: 'form.step3', icon: FaCalendarAlt, titleKey: 'form.step3.title' },
  { key: 'form.step4', icon: FaCog, titleKey: 'form.step4.title' },
  { key: 'form.step5', icon: FaBed, titleKey: 'form.step5.title' },
  { key: 'form.step6', icon: FaCommentDots, titleKey: 'form.step6.title' },
  { key: 'form.step7', icon: FaCheckCircle, titleKey: 'form.step7.title' },
];

export const FormProgressBar: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { currentStep, setStep } = useForm();

  return (
    <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-islamic-green/20 mb-8 shadow-xl">
      <CardContent className="p-8">
        <div className={`stepper-container ${isRTL ? 'flex-row-reverse' : 'flex'} items-center justify-between relative`}>
          {/* Background decorative line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-islamic-green/20 to-transparent rounded-full" />
          
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isClickable = stepNumber <= currentStep;
            const StepIcon = step.icon;

            return (
              <div key={index} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div
                  className={`stepper-step flex flex-col items-center cursor-pointer transition-all duration-500 group ${
                    isClickable ? 'hover:scale-110' : 'cursor-not-allowed opacity-70'
                  }`}
                  onClick={() => isClickable && setStep(stepNumber)}
                >
                  {/* Step Circle with enhanced styling */}
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg backdrop-blur-sm group-hover:shadow-2xl ${
                      isCompleted
                        ? 'bg-gradient-islamic text-white shadow-islamic-green/40 border-2 border-islamic-green/30'
                        : isCurrent
                        ? 'bg-gradient-to-br from-islamic-gold to-islamic-gold-light text-islamic-green-dark shadow-islamic-gold/50 border-2 border-islamic-gold/40 ring-4 ring-islamic-gold/20'
                        : 'bg-gradient-to-br from-muted to-muted-dark text-muted-foreground shadow-muted/30 border-2 border-muted/40'
                    }`}
                  >
                    {/* Animated background for current step */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-islamic-gold/0 via-islamic-gold/20 to-islamic-gold/0 animate-pulse" />
                    )}
                    
                    {/* Step icon */}
                    <div className="relative z-10">
                      {isCompleted ? (
                        <IoMdCheckmarkCircle className="h-6 w-6 drop-shadow-sm" />
                      ) : (
                        <StepIcon className={`h-5 w-5 drop-shadow-sm ${isCurrent ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Step Label with improved typography */}
                  <div className="mt-4 text-center">
                    <span
                      className={`text-xs font-medium leading-tight max-w-20 block transition-all duration-300 ${
                        isRTL ? 'font-amiri text-right' : 'font-playfair text-center'
                      } ${
                        isCurrent
                          ? 'text-islamic-green-dark font-bold scale-105'
                          : isCompleted
                          ? 'text-islamic-green'
                          : 'text-muted-foreground group-hover:text-foreground/80'
                      }`}
                    >
                      {t(step.key)}
                    </span>
                    
                    {/* Step number indicator */}
                    <div className={`mt-1 text-xs opacity-60 ${
                      isRTL ? 'font-amiri' : 'font-inter'
                    }`}>
                      {stepNumber}/{steps.length}
                    </div>
                  </div>
                </div>

                {/* Enhanced Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 px-2 relative">
                    <div className="relative h-1 mx-2">
                      {/* Background line */}
                      <div className="absolute inset-0 bg-muted-dark/30 rounded-full" />
                      
                      {/* Progress line with gradient */}
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-700 ease-out ${
                          stepNumber < currentStep
                            ? 'bg-gradient-to-r from-islamic-green via-islamic-green-light to-islamic-green shadow-sm'
                            : 'bg-transparent'
                        }`}
                      />
                      
                      {/* Animated dots for current progress */}
                      {stepNumber === currentStep - 1 && (
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                          <div className="h-full bg-gradient-to-r from-islamic-green to-transparent animate-pulse" 
                               style={{ width: '60%' }} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Percentage */}
        <div className="mt-4">
          <div className="bg-muted-dark rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-islamic transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-2">
            <span className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% {
                isRTL ? 'مكتمل' : 'Complete'
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};