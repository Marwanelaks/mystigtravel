import React, { useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/omra/HeroSection';
import { AboutSection } from '@/components/omra/AboutSection';
import { ProgramSection } from '@/components/omra/ProgramSection';
import { OmraForm } from '@/components/omra/OmraForm';
import { ContactSection } from '@/components/omra/ContactSection';
import { FloatingActionButton } from '@/components/FloatingActionButton';

const IndexUmrah = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header onNavigateToForm={scrollToForm} />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSection onCTAClick={scrollToForm} />
        </section>
        
        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>
        
        {/* Program Includes Section */}
        <ProgramSection onBookNowClick={scrollToForm} />
        
        {/* Umrah Form */}
        <div ref={formRef}>
          <OmraForm />
        </div>
        
        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={scrollToForm} />
    </div>
  );
};

export default IndexUmrah;