import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Heart, Mountain, Waves, Palette, Sun } from 'lucide-react';
import marrakech from '@/assets/marrakech-5095887.jpg';
import fez from '@/assets/fez-1691603.jpg';
import rabat from '@/assets/rabat-5014427.jpg';
import chefchaouen from '@/assets/morocco-3735564.jpg';
import sahara from '@/assets/sahara-4937450.jpg';
import atlas from '@/assets/morocco-4030733.jpg';
import essaouira from '@/assets/essaouira.jpg';
import meknes from '@/assets/meknes.jpg';
import agadir from '@/assets/agadir.jpg';
import imlil from '@/assets/imlil.jpg';
import ourika from '@/assets/morocco-4030733.jpg';
import toubkal from '@/assets/morocco-3735564.jpg';
import ouarzazate from '@/assets/sahara-4937450.jpg';
import zagora from '@/assets/rabat-5014427.jpg';

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const destinations = [
    // Imperial Cities
    {
      image: marrakech,
      title: "Marrakech",
      subtitle: "The Red City",
      category: "Imperial Cities",
      description: "Vibrant, magnetic, alive. Jemaa el Fnaa hums with music and spice, the Majorelle Garden glows in cobalt blue. End your day in a hammam, steam, scrub, and renewal beneath flickering light.",
      icon: <Sun className="w-5 h-5" />
    },
    {
      image: fez,
      title: "Fez",
      subtitle: "The Timeless City",
      category: "Imperial Cities",
      description: "A living museum of craft and spirit. Wander Fes el Bali, where artisans shape zellij and leather, and scholars still study at Al Qarawiyyin, the world's oldest university.",
      icon: <Sun className="w-5 h-5" />
    },
    {
      image: rabat,
      title: "Rabat",
      subtitle: "The Serene Capital",
      category: "Imperial Cities",
      description: "By the Atlantic, Rabat whispers elegance. Blue-white Kasbah streets, Andalusian gardens, and hammams glowing with rosewater and calm.",
      icon: <Sun className="w-5 h-5" />
    },
    {
      image: meknes,
      title: "Meknes",
      subtitle: "The Imperial Gem",
      category: "Imperial Cities",
      description: "Quietly majestic, palaces, mosques, and the mighty Bab Mansour gate tell tales of empire and artistry.",
      icon: <Sun className="w-5 h-5" />
    },
    // Coastal Towns
    {
      image: essaouira,
      title: "Essaouira",
      subtitle: "The Coastal Dreamscape",
      category: "Coastal Towns",
      description: "Time slows by the ocean breeze. Blue boats, sea-sprayed ramparts, and the joyful pulse of the Gnaoua Festival.",
      icon: <Waves className="w-5 h-5" />
    },
    {
      image: agadir,
      title: "Agadir",
      subtitle: "The Sunshine Haven",
      category: "Coastal Towns",
      description: "Golden beaches, endless sun, ocean-inspired hammams. Modern, easy, and full of light.",
      icon: <Waves className="w-5 h-5" />
    },
    // Atlas Mountains
    {
      image: imlil,
      title: "Imlil",
      subtitle: "Gateway to Serenity",
      category: "Atlas Mountains",
      description: "At the foot of Mount Toubkal, Imlil is pure calm, Berber villages, fresh air, and soul-deep peace.",
      icon: <Mountain className="w-5 h-5" />
    },
    {
      image: ourika,
      title: "Ourika",
      subtitle: "A Lush Retreat",
      category: "Atlas Mountains",
      description: "Green valleys, gentle waterfalls, and the hum of Amazigh life. A sanctuary just beyond Marrakech.",
      icon: <Mountain className="w-5 h-5" />
    },
    {
      image: toubkal,
      title: "Toubkal",
      subtitle: "The Summit of Morocco",
      category: "Atlas Mountains",
      description: "Snow-capped peaks and endless views, a journey for those seeking clarity, silence, and strength.",
      icon: <Mountain className="w-5 h-5" />
    },
    // Hidden Gems
    {
      image: chefchaouen,
      title: "Chefchaouen",
      subtitle: "The Blue Dream",
      category: "Hidden Gems",
      description: "Blue streets, soft light, mountain air, a watercolor world that feels like a sigh.",
      icon: <Palette className="w-5 h-5" />
    },
    {
      image: ouarzazate,
      title: "Ouarzazate",
      subtitle: "The Cinematic Oasis",
      category: "Hidden Gems",
      description: "Aït Benhaddou glows gold against the desert, walk through history and film, where stories and sand become one.",
      icon: <Palette className="w-5 h-5" />
    },
    // Sahara Desert
    {
      image: sahara,
      title: "Merzouga",
      subtitle: "The Sea of Sand",
      category: "Sahara Desert",
      description: "Dunes that shift with light, stars that seem close enough to touch. Luxury tents, firelight, and the heartbeat of the Sahara.",
      icon: <Sun className="w-5 h-5" />
    },
    {
      image: zagora,
      title: "Zagora",
      subtitle: "The Desert's Quiet Soul",
      category: "Sahara Desert",
      description: "Gentle dunes, palm groves, and stillness. Here, time slows and you remember how to listen.",
      icon: <Sun className="w-5 h-5" />
    }
  ];

  const categories = [
    { name: "Imperial Cities", icon: <Sun className="w-4 h-4" />, count: 4 },
    { name: "Coastal Towns", icon: <Waves className="w-4 h-4" />, count: 2 },
    { name: "Atlas Mountains", icon: <Mountain className="w-4 h-4" />, count: 3 },
    { name: "Hidden Gems", icon: <Palette className="w-4 h-4" />, count: 2 },
    { name: "Sahara Desert", icon: <Sun className="w-4 h-4" />, count: 2 }
  ];

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="destinations" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Morocco Destinations
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the soul of Morocco through its imperial cities, coastal dreamscapes, majestic mountains, and golden deserts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                destinations[currentIndex].category === category.name
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-white/80 text-foreground border-gray-200 hover:bg-primary/10 hover:border-primary/30'
              }`}
              onClick={() => {
                const categoryIndex = destinations.findIndex(dest => dest.category === category.name);
                if (categoryIndex !== -1) goToSlide(categoryIndex);
              }}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
              <span className="text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-luxury group">
            <img
              src={destinations[currentIndex].image}
              alt={destinations[currentIndex].title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isTransitioning ? 'opacity-70 scale-105' : 'opacity-100 scale-100'
              } group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Destination Info */}
            <div className={`absolute bottom-8 left-8 right-8 transition-all duration-500 ${
              isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
              <div className="flex items-center gap-3 text-white/80 mb-3">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {destinations[currentIndex].icon}
                  <span className="text-sm font-medium">{destinations[currentIndex].category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destinations[currentIndex].subtitle}</span>
                </div>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                {destinations[currentIndex].title}
              </h3>
              <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
                {destinations[currentIndex].description}
              </p>
            </div>

            {/* Favorite Button */}
            <button className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 group">
              <Heart className="w-6 h-6 text-white group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-4 rounded-full transition-all duration-300 group hidden md:block hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-4 rounded-full transition-all duration-300 group hidden md:block hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125 w-8'
                    : 'bg-gray-300 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Category Display */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
            {destinations[currentIndex].icon}
            <span className="font-semibold text-foreground">
              Exploring: {destinations[currentIndex].category}
            </span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center mt-8 space-x-4 md:hidden">
          <button
            onClick={prevSlide}
            className="bg-primary text-white p-4 rounded-full transition-all duration-300 hover:bg-primary-dark hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-primary text-white p-4 rounded-full transition-all duration-300 hover:bg-primary-dark hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;