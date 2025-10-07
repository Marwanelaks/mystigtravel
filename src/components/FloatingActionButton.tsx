import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <Button
      onClick={onClick}
      className={`fixed z-50 bg-gradient-islamic hover:bg-islamic-green-dark text-white shadow-2xl hover:shadow-xl transition-all duration-300 rounded-full px-6 py-6 flex items-center space-x-3 bottom-6 right-6 ${
        isRTL ? 'flex-row-reverse space-x-reverse' : ''
      }`}
      size="lg"
    >
      <MessageSquare className="w-5 h-5" />
      <span className={`font-semibold ${isRTL ? 'font-amiri' : 'font-inter'}`}>
        {t('hero.cta')}
      </span>
    </Button>
  );
};