import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Plane,
  FileText,
  MapPin,
  CreditCard,
  Building2,
  Bus,
  Shield,
  Users,
  CheckCircle,
} from 'lucide-react';
import logo from '@/assets/logo.png';

interface ProgramSectionProps {
  onBookNowClick: () => void;
}

const programItems = [
  { key: 'program.visa', icon: FileText },
  { key: 'program.flight', icon: Plane },
  { key: 'program.guidance', icon: Users },
  { key: 'program.passport', icon: FileText },
  { key: 'program.payment', icon: CreditCard },
  { key: 'program.hotels', icon: Building2 },
  { key: 'program.transport', icon: Bus },
  { key: 'program.insurance', icon: Shield },
];

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onBookNowClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-sand-beige via-background to-sand-beige relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 islamic-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-in fade-in-0 slide-in-from-bottom duration-700">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-semibold shadow-lg">
              {isRTL ? 'ما يتضمنه البرنامج' : 'What\'s Included'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent ${
            isRTL ? 'font-cairo' : 'font-montserrat'
          }`}>
            {t('program.title')}
          </h2>
          
          <Separator className="w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent h-1 rounded-full" />
          
          <p className={`text-lg text-muted-foreground mt-6 max-w-3xl mx-auto leading-relaxed ${
            isRTL ? 'font-cairo text-xl' : 'font-poppins'
          }`}>
            {isRTL 
              ? 'رحلة شاملة ومريحة لأداء مناسك العمرة بكل يسر وطمأنينة'
              : 'A comprehensive and comfortable journey to perform Umrah rituals with ease and peace of mind'
            }
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Program Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {programItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-primary/10 hover:border-accent/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                    
                    <p className={`text-sm font-semibold text-foreground leading-relaxed group-hover:text-primary transition-colors ${
                      isRTL ? 'font-cairo text-base' : 'font-poppins'
                    }`}>
                      {t(item.key)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary text-white max-w-2xl mx-auto shadow-2xl border-0 animate-in fade-in-0 scale-in-95 duration-700 delay-300">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              <CardContent className="p-6 md:p-10 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl animate-pulse p-3">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  isRTL ? 'font-cairo' : 'font-montserrat'
                }`}>
                  {isRTL 
                    ? 'ابدأ رحلتك المباركة اليوم'
                    : 'Start Your Blessed Journey Today'
                  }
                </h3>
                
                <p className={`text-lg text-white/90 mb-8 max-w-xl mx-auto ${
                  isRTL ? 'font-cairo' : 'font-poppins'
                }`}>
                  {isRTL 
                    ? 'احجز الآن واحصل على خصم خاص للحجوزات المبكرة'
                    : 'Book now and get a special discount for early reservations'
                  }
                </p>
                
                <Button
                  onClick={onBookNowClick}
                  size="lg"
                  className="bg-accent hover:bg-accent-dark text-primary font-bold px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300"
                >
                  {t('program.book')}
                  <MapPin className={`h-6 w-6 ${isRTL ? 'mr-3' : 'ml-3'}`} />
                </Button>
                
                {/* Decorative elements */}
                <div className="flex justify-center items-center space-x-6 mt-8">
                  <div className="text-accent text-2xl">✦</div>
                  <div className="text-accent text-xl">✦</div>
                  <div className="text-accent text-2xl">✦</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};