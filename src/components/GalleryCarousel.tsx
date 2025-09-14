import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Heart } from 'lucide-react';

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using Unsplash images that match your destination descriptions
  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1585004607620-fb4c44331e73?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1101&q=80",
      title: "Marrakech",
      subtitle: "The Red City",
      description: "Where dreams come alive in vibrant colors, mesmerizing scents, and echoes of history."
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1697729887553-b0392581a691?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1071&q=80",
      title: "Fez",
      subtitle: "The Timeless City",
      description: "Morocco's spiritual and cultural heart, a living museum with labyrinthine medinas."
    },
    {
      image: "https://images.unsplash.com/photo-1588609715324-78072fc77cee?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      title: "Rabat",
      subtitle: "Serene Capital by the Sea",
      description: "Where waves kiss shores and history whispers tales of elegance and heritage."
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1697729733847-0ed51661e005?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      title: "Chefchaouen",
      subtitle: "A Dream in Blue",
      description: "Not a place you visit, but a place you feel. A town of sapphire streets and azure doorways."
    },
    {
      image: "https://images.unsplash.com/photo-1592172578991-51bac865e437?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Sahara Desert",
      subtitle: "Sea of Dreams",
      description: "Where golden dunes rise like waves frozen in time, their curves kissed by changing light."
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1697729782324-c1bf5949df6c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Atlas Mountains",
      subtitle: "Majestic and Eternal",
      description: "Morocco's ancient backbone, where clouds touch the heart and Berber villages cling to rocks."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Morocco Destinations
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the diverse beauty of Morocco through its imperial cities, coastal towns, and majestic landscapes
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-luxury group">
            <img
              src={destinations[currentIndex].image}
              alt={destinations[currentIndex].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            {/* Destination Info */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{destinations[currentIndex].subtitle}</span>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
                {destinations[currentIndex].title}
              </h3>
              <p className="text-white/90 text-lg max-w-2xl">
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 group hidden md:block"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 group hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Destination Categories */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">Imperial Cities</h3>
            <p className="text-muted-foreground text-sm">
              Discover the royal heritage of Marrakech, Fes, Rabat, and Meknes
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">Coastal Towns</h3>
            <p className="text-muted-foreground text-sm">
              Experience the Atlantic charm of Essaouira and Agadir
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">Natural Wonders</h3>
            <p className="text-muted-foreground text-sm">
              Explore the Atlas Mountains, Sahara Desert, and hidden valleys
            </p>
          </div>
        </div> */}

        {/* Mobile Navigation */}
        <div className="flex justify-center mt-8 space-x-4 md:hidden">
          <button
            onClick={prevSlide}
            className="bg-primary text-white p-3 rounded-full transition-all duration-300 hover:bg-primary-dark"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-primary text-white p-3 rounded-full transition-all duration-300 hover:bg-primary-dark"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;