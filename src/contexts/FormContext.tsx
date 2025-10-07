import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, FormErrors, initialFormData } from '@/types/form';

interface FormContextType {
  formData: FormData;
  errors: FormErrors;
  currentStep: number;
  updateFormData: (data: Partial<FormData>) => void;
  setErrors: (errors: FormErrors) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  resetForm: () => void;
  isLastStep: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const TOTAL_STEPS = 4;

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const setStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(1);
  };

  const value = {
    formData,
    errors,
    currentStep,
    updateFormData,
    setErrors,
    nextStep,
    prevStep,
    setStep,
    resetForm,
    isLastStep: currentStep === TOTAL_STEPS,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};