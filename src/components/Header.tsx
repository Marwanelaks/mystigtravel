import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onNavigateToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToForm }) => {
  const { t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary/10 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <img 
              src={logo} 
              alt="Private Umrah by Mystic Travel" 
              className="h-14 w-auto sm:h-16 md:h-20 object-contain transition-transform hover:scale-105 duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`relative text-foreground hover:text-primary transition-all duration-300 font-medium text-sm group ${
                  isRTL ? 'font-cairo' : 'font-poppins'
                }`}
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-primary-light hover:bg-primary/5 rounded-xl"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with smooth animation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 bg-white/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">
            <nav className="py-6 space-y-2">
              {navigation.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`block w-full px-6 py-3 text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-xl transition-all duration-300 animate-in slide-in-from-left ${
                    isRTL ? 'font-cairo text-right' : 'font-poppins'
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};