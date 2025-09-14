import React, { useState } from 'react';
import { X, MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';

const ImageTextSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const sections = [
    {
      image: "https://images.unsplash.com/photo-1719084198651-5ac167cb3e6e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1101&q=80",
      title: 'Marrakech: The Red City',
      description: 'Marrakech is a city where dreams come alive in the form of vibrant colors, mesmerizing scents, and echoes of history. Jemaa el Fnaa, the beating heart of the city, is a spectacle of life musicians serenade the crowd, storytellers spin their magic, and the air fills with the aroma of sizzling spices.',
      imageLeft: true,
      modalContent: {
        highlights: [
          "Jemaa el Fnaa square spectacle",
          "Majorelle Garden sanctuary",
          "Traditional hammam experiences",
          "Vibrant souks and markets"
        ],
        experiences: [
          "Evening food tours through the medina",
          "Private palace tours and dining",
          "Artisan workshops with local craftsmen",
          "Sunset views from rooftop terraces"
        ],
        bestTime: "Year-round destination, best in Spring and Fall",
        idealFor: "Culture enthusiasts, food lovers, photographers"
      }
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1697730007162-3acd986a87f6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: 'Essaouira: The Coastal Dreamscape',
      description: 'Essaouira is a place where time slows down, and the soul takes flight. The salty breeze carries the melody of seagulls as you wander through the medina, a labyrinth of colorful stalls and artisans weaving stories into their crafts. The ancient ramparts stand guard against the crashing waves.',
      imageLeft: false,
      modalContent: {
        highlights: [
          "Historic medina and ramparts",
          "Vibrant fishing harbor",
          "Gnaoua Music Festival",
          "Windswept beaches"
        ],
        experiences: [
          "Seafood feasts by the ocean",
          "Wind and kite surfing lessons",
          "Medina photography tours",
          "Traditional music performances"
        ],
        bestTime: "April to October for best weather",
        idealFor: "Beach lovers, musicians, artists, relaxation seekers"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1695061854597-efe4f25a49f7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      title: 'Rabat: The Serene Capital',
      description: 'Rabat whispers tales of elegance and history as the waves of the Atlantic kiss its shores. The Kasbah of the Oudayas is a haven of charm, its white and blue streets a painter\'s palette brought to life. The Hassan Tower stands tall, a poetic relic of a grand vision left incomplete.',
      imageLeft: true,
      modalContent: {
        highlights: [
          "Kasbah of the Oudayas",
          "Hassan Tower monument",
          "Royal Palace grounds",
          "Andalusian Gardens"
        ],
        experiences: [
          "Cultural walking tours",
          "Traditional tea ceremonies",
          "Coastal photography sessions",
          "Historical site visits"
        ],
        bestTime: "March to June and September to November",
        idealFor: "History buffs, architecture lovers, peaceful travelers"
      }
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1694475072465-ef5455203721?q=80&w=877&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1071&q=80",
      title: 'Fez: The Timeless City',
      description: 'Fez is Morocco\'s spiritual and cultural heart, a city that feels like a living museum. Within its labyrinthine medina, Fes el Bali artisans work tirelessly, crafting zellij tiles, leather goods, and intricate lanterns. Discover the Al Qarawiyyin University, the world\'s oldest continuously operating university.',
      imageLeft: false,
      modalContent: {
        highlights: [
          "Fes el Bali Medina",
          "Al Qarawiyyin University",
          "Traditional tanneries",
          "Artisan workshops"
        ],
        experiences: [
          "Medina exploration with local guides",
          "Craftsmanship workshops",
          "Culinary tours and cooking classes",
          "Historical and spiritual tours"
        ],
        bestTime: "Spring and Autumn for pleasant temperatures",
        idealFor: "Cultural explorers, artisans, spiritual seekers"
      }
    }
  ];

  const openModal = (destination) => {
    setSelectedDestination(destination);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedDestination(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="py-20 bg-luxury-ivory">
        {sections.map((section, index) => (
          <div key={index} className={`${index > 0 ? 'mt-20' : ''}`}>
            <div className="container mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                section.imageLeft ? '' : 'lg:grid-flow-col-dense'
              }`}>
                {/* Image */}
                <div className={`${section.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative group">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-luxury">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>

                {/* Text */}
                <div className={`${section.imageLeft ? 'lg:order-2' : 'lg:order-1'} fade-in-up`}>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
                    {section.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {section.description}
                  </p>
                  <button 
                    onClick={() => openModal(section)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all bg-primary rounded-lg hover:bg-primary-dark text-white"
                  >
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary-dark rounded-lg group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white flex items-center gap-2 justify-center">
                      Discover this destination
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Modal Header with Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
                <div className="absolute bottom-6 left-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                    {selectedDestination.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <p className="text-lg text-muted-foreground mb-8">
                  {selectedDestination.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Highlights */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Key Highlights
                    </h3>
                    <ul className="space-y-2">
                      {selectedDestination.modalContent.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experiences */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Unique Experiences
                    </h3>
                    <ul className="space-y-2">
                      {selectedDestination.modalContent.experiences.map((experience, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{experience}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid md:grid-cols-2 gap-6 p-6 bg-luxury-beige rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Best Time to Visit</p>
                      <p className="text-muted-foreground text-sm">{selectedDestination.modalContent.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Ideal For</p>
                      <p className="text-muted-foreground text-sm">{selectedDestination.modalContent.idealFor}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 text-center">
                  <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Plan Your Journey to {selectedDestination.title.split(':')[0]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageTextSection;