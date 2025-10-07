import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';
import heroModern from '@/assets/hero-modern.jpg';
import logo from '@/assets/logo-new.png';

interface HeroSectionProps {
  onCTAClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroModern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/60"></div>
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Logo with animation */}
        <div className="flex justify-center mt-5 mb-2 animate-in fade-in-0 zoom-in-95 duration-700">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
            <img 
                src={logo} 
                alt="Logo" 
                className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl"
                style={{ 
                  width: 'auto',
                }}
              />
          </div>
        </div>
        {/* Decorative calligraphy with modern styling */}
        {/* <div className="mt-5 flex justify-center animate-in fade-in-0 duration-1000 delay-500">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative text-white/90 text-5xl drop-shadow-xl font-satisfy">
              ﷽
            </div>
          </div>
        </div> */}
        <h1 className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 drop-shadow-2xl animate-in slide-in-from-bottom duration-700 px-2 ${
          isRTL ? 'font-cairo' : 'font-montserrat'
        }`}>
          {t('hero.title')}
        </h1>
        
        <p className={`text-lg sm:text-xl md:text-3xl text-white/95 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-in slide-in-from-bottom duration-700 delay-150 px-2 ${
          isRTL ? 'font-cairo text-right' : 'font-poppins'
        }`}>
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-in slide-in-from-bottom duration-700 delay-300 px-4">
          <Button
            onClick={onCTAClick}
            size="lg"
            className="group relative overflow-hidden bg-white hover:bg-white text-primary font-bold px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-110 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {t('hero.cta')}
              <ArrowDown className={`h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-y-1 transition-transform ${isRTL ? 'mr-2' : ''}`} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="group border-2 border-white/80 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <Play className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            {isRTL ? 'شاهد الفيديو' : 'Watch Video'}
          </Button>
        </div>

        
      </div>

      {/* Scroll indicator with modern design */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-3 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/5 shadow-lg">
          <div className="w-1.5 h-4 bg-white/90 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 md:h-30 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};
