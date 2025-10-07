import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send, CheckCircle } from 'lucide-react';

interface FormNavigationProps {
  onSubmit?: () => void;
  loading?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ onSubmit, loading }) => {
  const { t, isRTL } = useLanguage();
  const { currentStep, nextStep, prevStep, isLastStep } = useForm();

  const handleNext = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else {
      nextStep();
    }
  };

  const canGoPrev = currentStep > 1;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <div className={`flex items-center gap-4 mt-8 ${
      isRTL ? 'flex-row-reverse' : ''
    }`}>
      {/* Previous Button */}
      {canGoPrev && (
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="bg-sacred-white hover:bg-islamic-green-lighter/20 border-islamic-green-lighter text-islamic-green hover:text-islamic-green-dark"
          disabled={loading}
        >
          <PrevIcon className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('form.back')}
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next/Submit Button */}
      <Button
        type="button"
        onClick={handleNext}
        disabled={loading}
        className={`bg-gradient-islamic hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
            {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
          </>
        ) : isLastStep ? (
          <>
            <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('form.submit')}
          </>
        ) : (
          <>
            {t('form.next')}
            <NextIcon className={`h-4 w-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </>
        )}
      </Button>
    </div>
  );
};