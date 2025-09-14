// PhilosophyPage.js
import { ArrowLeft, Heart, Sparkles, Globe, Users, Star, Target, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IntroSection from './IntroSection';
import Navbar from './Navbar';

const PhilosophyPage = () => {
  const navigate = useNavigate();

  const philosophyPoints = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Soulful Connection",
      description: "We believe travel should be a sacred encounter that connects you to the essence of a place and your own inner journey."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Transformative Experiences",
      description: "Each journey is designed to awaken new perspectives, creating moments of wonder and personal transformation."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cultural Reverence",
      description: "We approach Moroccan culture with deep respect, honoring traditions while creating meaningful exchanges."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-Centered",
      description: "Our connections with local artisans, guides, and communities are the heart of every experience we create."
    }
  ];

  const approachElements = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Ancestral Wisdom",
      description: "Drawing from generations of knowledge about Moroccan culture, craftsmanship, and hospitality"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Technological Finesse",
      description: "Modern planning tools and digital convenience seamlessly integrated with traditional experiences"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Personalization",
      description: "Every detail tailored to reflect your dreams, interests, and inner yearnings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-luxury-beige/30">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16">
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
            Our Philosophy
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Where ancestral wisdom meets technological finesse, creating journeys that are rituals of revival and returns to wonder
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto"></div>
        </div>

        {/* Main Philosophy */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">The Heart of Mystic Travel</h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Mystic Travel was born from a devotion to the unseen, the sacred, the poetic spirit of Morocco. 
                  We believe travel isn't just about destinations—it's about transformation. Each journey is a carefully 
                  woven tapestry of experiences designed to awaken your senses and connect you to the soul of Morocco.
                </p>
                <p>
                  Founded by three visionaries who bridge generations and worlds, we combine 58 years of traditional 
                  expertise with modern digital innovation. This unique blend allows us to create experiences that 
                  honor ancient traditions while providing seamless, personalized service.
                </p>
                <p>
                  For us, travel is a ritual, a revival, a return to wonder. It's the moment when the scent of spices 
                  in a Marrakech souk becomes a memory that lingers for years, when the silence of the Sahara under 
                  a blanket of stars feels like coming home to yourself.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1071&q=80" 
                  alt="Moroccan cultural experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Our Core Principles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPoints.map((point, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 transition-all hover:shadow-md">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {point.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">{point.title}</h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="bg-luxury-beige/50 rounded-2xl p-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">Our Unique Approach</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {approachElements.map((element, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {element.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{element.title}</h3>
                  <p className="text-muted-foreground text-sm">{element.description}</p>
                </div>
              ))}
            </div>
            
            <p className="text-lg text-muted-foreground text-center italic">
              "We don't just show you Morocco—we invite you to feel it, live it, and carry its spirit with you long after you return home."
            </p>
          </div>
        </section>

        {/* Promise Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">Our Promise to You</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                When you travel with us, you're not just a tourist—you're a seeker, a storyteller, part of a continuing 
                narrative that connects ancient traditions with modern wonder. We promise to craft journeys that:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Respect and celebrate authentic Moroccan culture and traditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Create meaningful connections with local artisans and communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Blend luxury comforts with spiritual depth and cultural immersion</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Offer seamless planning while preserving the magic of spontaneity</span>
                </li>
              </ul>
              
              <p className="pt-4">
                This is more than tourism—it's a transformative journey that awakens your senses, expands your perspective, 
                and connects you to the timeless beauty of Morocco.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PhilosophyPage;