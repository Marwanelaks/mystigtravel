import { ArrowLeft, Users, Heart, Globe, Award, Star, MapPin, Calendar, Shield, Sparkles, Building, Music, Brush } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import logoImage from '@/assets/mysticLogo.png';
const AboutDetailPage = () => {
  const navigate = useNavigate();

  const visionaries = [
    {
      name: "Mohammed Badre",
      role: "Founder & Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      description: "At the helm of Mystic Travel, Mohammed Badre represents the perfect blend of heritage and innovation. Born and raised in Fès, he grew up surrounded by artisan communities, forming a deep connection with his cultural roots. With 15 years of experience as a project management engineer, he brings a vital technological perspective to crafting personalized travel experiences.",
      quote: "I create a vibrant synergy between the spirit of Morocco and the digital age, designing journeys where technology meets human experience."
    },
    {
      name: "Mohammed Bouchareb",
      role: "Co-Founder & Technical Director",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      description: "Mohammed is the keeper of invaluable expertise, built over 58 years in the tourism and craftsmanship sectors. Born in the heart of Fès, he has witnessed and participated in the evolution of its medina, knowing every nook and cranny, along with the stories they hold.",
      quote: "Inspired by traditional art masters, I embody the spirit of knowledge transfer and am key to the success of every journey."
    },
    {
      name: "Alaoui Chrifi Kamal",
      role: "Co-Creator & Expert Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      description: "Born in Fès and shaped by tradition, Kamal brings Morocco to life with sincerity and soul. With deep ancestral roots and a heart anchored in his hometown, he sees Mystic Travel not as a business, but as a calling.",
      quote: "With me, Morocco becomes a feeling, gentle, profound, and unforgettable."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Authenticity",
      description: "We prioritize authentic experiences that respect Moroccan culture and traditions."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Excellence",
      description: "Every detail of your journey is carefully orchestrated to offer you an exceptional experience."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sustainability",
      description: "We are committed to responsible tourism that preserves the environment and supports local communities."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Transformation",
      description: "We believe travel should change you, awakening new perspectives and connections."
    }
  ];

  const partnerships = [
    {
      icon: <Building className="w-10 h-10" />,
      title: "Sacred Stays",
      description: "Boutique riads infused with history, beauty and peace"
    },
    {
      icon: <Music className="w-10 h-10" />,
      title: "Festival Portals",
      description: "VIP access to iconic events such as the Sacred Music of Fes or Mawazine of Rabat"
    },
    {
      icon: <Brush className="w-10 h-10" />,
      title: "Keepers of Craft",
      description: "Chefs, calligraphers, musicians, and mystics who guide you through true Moroccan traditions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-luxury-beige/30">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary mb-8 hover:underline transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Mystic Travel was born from a devotion to the unseen, the sacred, the poetic spirit of Morocco.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto"></div>
          </div>

          {/* Our Journey */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Our Journey</h2>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2024 by Mohammed Badre, his father Mohammed Bouchareb, and their lifelong friend Alaoui Chrifi Kamal, 
                    Mystic Travel bridges generations and worlds. Mohammed Badre, a project management engineer with 15 years of experience, 
                    brings modernity and a digital edge to every journey.
                  </p>
                  <p>
                    Their shared vision is simple yet powerful: to awaken travelers to the beauty of Morocco through transformative, 
                    high-touch experiences that blend ancestral wisdom with technological finesse. For them, travel isn't just a destination, 
                    it's a ritual, a revival, a return to wonder.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Our Roots
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Born in the heart of Fès, we have witnessed and participated in the evolution of its medina, 
                      knowing every nook and cranny, along with the stories they hold.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      To create journeys that are not just trips but transformative experiences that connect you 
                      with the soul of Morocco and your own inner journey.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="">
                  <img 
                    src={logoImage} 
                    alt="Traditional Moroccan architecture" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10"></div>
              </div>
            </div>
          </section>

                  {/* Visionaries Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Meet Our Visionaries</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {visionaries.map((visionary, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-transform hover:translate-y-2">
                <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-30" />
                  {/* In a real implementation, you would use an actual image */}
                  {/* <img src={visionary.image} alt={visionary.name} className="w-full h-full object-cover" /> */}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">{visionary.name}</h3>
                  <p className="text-primary font-semibold mb-4">{visionary.role}</p>
                  <p className="text-muted-foreground mb-4">{visionary.description}</p>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                    "{visionary.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>


          {/* Our Values */}
          <section className="max-w-6xl mx-auto mb-20">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 transition-all hover:shadow-md">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Partnerships */}
          <section className="max-w-6xl mx-auto mb-20">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Our Sacred Alliances</h2>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Mystic Travel thrives through sacred alliances with Morocco's guardians of art, wisdom, and wonder.
                Every partnership is chosen for its soul.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {partnerships.map((partner, index) => (
                  <div key={index} className="text-center p-6 bg-luxury-beige/50 rounded-xl border border-gray-100 transition-all hover:bg-luxury-beige">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {partner.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg">{partner.title}</h3>
                    <p className="text-muted-foreground text-sm">{partner.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-2xl mb-2">1+</h4>
                <p className="text-white/90">Year of operation</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-2xl mb-2">25+</h4>
                <p className="text-white/90">Happy travelers</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-2xl mb-2">12+</h4>
                <p className="text-white/90">Curated destinations</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-white shadow-lg">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-2xl mb-2">100%</h4>
                <p className="text-white/90">Satisfaction rate</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutDetailPage;