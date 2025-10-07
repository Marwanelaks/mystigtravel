import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import gbFlag from '@/assets/flags/gb.svg';
import saFlag from '@/assets/flags/sa.svg';
import frFlag from '@/assets/flags/fr.svg';
import deFlag from '@/assets/flags/de.svg';

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: gbFlag },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: saFlag },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: frFlag },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: deFlag },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-sacred-white/90 backdrop-blur-sm border-islamic-green-lighter hover:bg-islamic-green-lighter/20"
        >
          <img src={currentLanguage?.flag} alt={currentLanguage?.name} className="w-5 h-5 object-cover rounded-sm" />
          <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-sacred-white border-islamic-green-lighter shadow-lg"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer flex items-center gap-3 ${
              language === lang.code 
                ? 'bg-islamic-green-lighter text-islamic-green font-medium' 
                : 'hover:bg-islamic-green-lighter/50'
            }`}
          >
            <img src={lang.flag} alt={lang.name} className="w-5 h-5 object-cover rounded-sm" />
            <span className="font-medium">{lang.nativeName}</span>
            <span className="text-muted-foreground ml-auto text-sm">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};