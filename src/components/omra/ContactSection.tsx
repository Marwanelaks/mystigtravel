import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  MapPin,
} from 'lucide-react';
import logo from '@/assets/logo-new.png';

const phoneNumbers = [
  '+212 661-566380',
  '+212 661-796995', 
  '+212 661-596315',
];

export const ContactSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="islamic-ornament inline-block">
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${
              isRTL ? 'font-cairo' : 'font-montserrat'
            }`}>
              {t('contact.title')}
            </h2>
          </div>
          
          <Separator className="w-24 mx-auto bg-accent h-1 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Phone Numbers */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold text-center mb-6 text-white ${
                  isRTL ? 'font-cairo' : 'font-montserrat'
                }`}>
                  {t('contact.phone')}
                </h3>
                
                <div className="space-y-4">
                  {phoneNumbers.map((phone, index) => (
                    <div key={index} className="text-center">
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="text-lg text-accent hover:text-accent-light transition-colors duration-200 font-mono"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Contact */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold text-center mb-6 text-white ${
                  isRTL ? 'font-cairo' : 'font-montserrat'
                }`}>
                  {t('contact.follow')}
                </h3>
                
                <div className="flex flex-col space-y-4">
                  {/* WhatsApp */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-accent hover:bg-accent-dark text-primary border-accent hover:border-accent-dark transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => window.open(`https://wa.me/${phoneNumbers[0].replace(/[\s-]/g, '')}`, '_blank')}
                  >
                    <MessageCircle className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    WhatsApp
                  </Button>
                  
                  {/* Facebook */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <Facebook className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    Facebook
                  </Button>
                  
                  {/* Instagram */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <Instagram className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Office Location */}
          <Card className="mt-8 bg-white/5 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-accent mr-2" />
                <span className={`text-lg text-white ${
                  isRTL ? 'font-cairo' : 'font-poppins'
                }`}>
                  {isRTL ? 'المغرب - سلا' : 'Morocco - Sale'}
                </span>
              </div>
              
              {/* Islamic decoration */}
              <div className="flex justify-center items-center space-x-4 mt-6">
                <div className="text-accent text-2xl">✦</div>
                <img src={logo} alt="Logo" style={{ width: 'auto' }} className="w-auto h-12" />
                <div className="text-accent text-2xl">✦</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};