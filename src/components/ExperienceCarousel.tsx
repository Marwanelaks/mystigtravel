import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Star, Quote } from 'lucide-react';
import cultural from '@/assets/santa-fe-2367043.jpg';

const ExperienceCarousel = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Updated experiences with your new content
  const experiences = [
    {
      id: 'imperial-mystique',
      image: "https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&h=600&fit=crop",
      title: 'Imperial Mystique',
      shortDescription: 'Unravel Morocco\'s royal cities with private guides',
      category: 'Cultural',
      details: {
        description: 'Unravel Morocco\'s royal cities, Marrakech, Fes, and Rabat with private guides who turn every alley into a story. Discover palaces, sacred medinas, and the whispers of centuries past.',
        highlights: [
          'Private guided tours through imperial cities',
          'Exclusive access to historical palaces and monuments',
          'Explore sacred medinas with local experts',
          'Discover centuries of history and culture'
        ],
        duration: 'Full day',
        location: 'Marrakech, Fes, Rabat'
      }
    },
    {
      id: 'cultural-soulcraft',
      image: cultural,
      title: 'Cultural Soulcraft',
      shortDescription: 'Step into the heart of Moroccan artistry',
      category: 'Artisan',
      details: {
        description: 'Step into the heart of Moroccan artistry. Shape clay with master potters, learn Arabic calligraphy, weave stories into textiles, every encounter is a meeting of hands and heart.',
        highlights: [
          'Hands-on pottery workshops with master artisans',
          'Arabic calligraphy lessons from skilled teachers',
          'Traditional textile weaving experiences',
          'Cultural immersion with local craftspeople'
        ],
        duration: '3-4 hours',
        location: 'Fes, Marrakech'
      }
    },
    {
      id: 'culinary-rituals',
      image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&h=600&fit=crop",
      title: 'Culinary Rituals',
      shortDescription: 'Where flavors sing like poetry',
      category: 'Culinary',
      details: {
        description: 'Step into a kitchen where flavors sing like poetry, guided by local chefs, summon the spirit of spices. Cook traditional dishes, and share a meal born of your own hands and memories.',
        highlights: [
          'Interactive cooking classes with local chefs',
          'Traditional spice market visits',
          'Hands-on preparation of authentic Moroccan dishes',
          'Shared meals in beautiful traditional settings'
        ],
        duration: '3-4 hours',
        location: 'Throughout Morocco'
      }
    },
    {
      id: 'wellness-renewal',
      image: "https://images.unsplash.com/photo-1615275219949-b31d641fce23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      title: 'Wellness & Renewal',
      shortDescription: 'Find yourself again in sacred spaces',
      category: 'Wellness',
      details: {
        description: 'Find yourself again in hammams, spas, and yoga sanctuaries scented with rosewater and silence. Let warmth, steam, and calm bring you back home to yourself.',
        highlights: [
          'Traditional hammam experiences with expert therapists',
          'Yoga and meditation in serene settings',
          'Rosewater and argan oil treatments',
          'Silent retreats and mindfulness practices'
        ],
        duration: '2-4 hours',
        location: 'Marrakech, Fes, Atlas Mountains'
      }
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "From private palace tours to intimate cooking classes, every moment was pure magic!",
      author: "Sophia, NYC",
      rating: 5
    },
    {
      id: 2,
      quote: "Mystic Travel felt like a dream I didn't want to end. Every detail was perfect!",
      author: "James, San Francisco",
      rating: 5
    },
    {
      id: 3,
      quote: "The calligraphy and tea ceremonies made me feel part of something ancient and beautiful",
      author: "Emily, Chicago",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <section id="experiences" className="py-20 bg-luxury-beige/10">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Unforgettable Moroccan Experiences
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in the rich culture and traditions of Morocco through these carefully curated experiences
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="group cursor-pointer bg-white rounded-2xl shadow-luxury overflow-hidden hover:shadow-luxury-hover transition-all duration-500 hover:translate-y-2"
                onClick={() => setSelectedExperience(experience)}
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-foreground">
                      {experience.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {experience.shortDescription}
                  </p>
                  <button className="text-primary hover:text-primary-dark font-semibold transition-colors duration-300 group">
                    Discover More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-2xl shadow-luxury p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Quote className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Traveler Stories</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Voices of Wonder
              </h3>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Discover what our travelers say about their transformative journeys with Mystic Travel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-luxury-beige/30 rounded-xl p-6 hover:bg-luxury-beige/50 transition-all duration-500 hover:translate-y-1"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-foreground italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-primary font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative">
              <div className="h-64 md:h-80">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-foreground">
                  {selectedExperience.category}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedExperience.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {selectedExperience.details.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Experience Highlights</h3>
                <ul className="space-y-3">
                  {selectedExperience.details.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start transition-all duration-300 hover:translate-x-2">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-luxury-beige/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Duration</h4>
                  <p className="text-foreground font-medium">{selectedExperience.details.duration}</p>
                </div>
                <div className="bg-luxury-beige/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Location</h4>
                  <p className="text-foreground font-medium">{selectedExperience.details.location}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 font-semibold">
                  Book This Experience
                </button>
                <button 
                  onClick={() => setSelectedExperience(null)}
                  className="px-6 py-3 border border-gray-300 text-foreground rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ExperienceCarousel;