import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { FaHeart, FaStar, FaHandsHelping } from 'react-icons/fa';
import kaabaAerial from '@/assets/kaaba-aerial.jpg';
import medinaMosque from '@/assets/medina-prophet-mosque.jpg';
import pilgrimsTawaf from '@/assets/pilgrims-tawaf.jpg';

export const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: FaHeart,
      titleKey: 'about.feature1.title',
      descKey: 'about.feature1.desc',
      color: 'from-primary to-primary-light',
    },
    {
      icon: FaStar,
      titleKey: 'about.feature2.title',
      descKey: 'about.feature2.desc',
      color: 'from-secondary to-accent',
    },
    {
      icon: FaHandsHelping,
      titleKey: 'about.feature3.title',
      descKey: 'about.feature3.desc',
      color: 'from-accent to-primary',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in-0 slide-in-from-bottom duration-700">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-semibold shadow-lg">
              {isRTL ? 'من نحن' : 'Who We Are'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent ${
            isRTL ? 'font-cairo' : 'font-montserrat'
          }`}>
            {t('about.title')}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${
            isRTL ? 'font-cairo' : 'font-poppins'
          }`}>
            {t('about.subtitle')}
          </p>
        </div>

        {/* Image Gallery with Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="group overflow-hidden border-2 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 animate-in slide-in-from-left duration-700">
            <div className="relative h-72 overflow-hidden">
              <img 
                src={kaabaAerial} 
                alt="Kaaba Aerial View" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Card>
          
          <Card className="group overflow-hidden border-2 border-accent/20 shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:scale-105 animate-in slide-in-from-bottom duration-700 delay-100">
            <div className="relative h-72 overflow-hidden">
              <img 
                src={medinaMosque} 
                alt="Prophet's Mosque in Medina" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Card>
          
          <Card className="group overflow-hidden border-2 border-secondary/20 shadow-2xl hover:shadow-secondary/20 transition-all duration-500 hover:scale-105 animate-in slide-in-from-right duration-700 delay-200">
            <div className="relative h-72 overflow-hidden">
              <img 
                src={pilgrimsTawaf} 
                alt="Pilgrims performing Tawaf" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                style={{ animationDelay: `${index * 150}ms` }}
                className="group relative overflow-hidden border-2 border-primary/10 hover:border-primary/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-in slide-in-from-bottom duration-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors ${
                    isRTL ? 'font-cairo text-right' : 'font-montserrat'
                  }`}>
                    {t(feature.titleKey)}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${
                    isRTL ? 'font-cairo text-right' : 'font-poppins'
                  }`}>
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
