import { ArrowLeft, Users, Heart, Globe, Award, Star, MapPin, Calendar, Shield, Sparkles, Building, Music, Brush } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import logoImage from '@/assets/mysticLogo.png';

const AboutDetailPage = () => {
  const navigate = useNavigate();

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
              Mystic Travel was born from devotion to beauty, to the sacred, to the unseen threads connecting Morocco’s spirit to the traveler’s soul.
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
                    Founded in 2024 by Mohammed Badre, his father Mohammed Bouchareb, and their lifelong friend Alaoui Chrifi Kamal, Mystic Travel bridges generations and worlds.
                  </p>
                  <p>
                    Raised in Fes, Mohammed Badre, a project management engineer with 15 years of experience, merges modern design with timeless wonder. His father, Mohammed Bouchareb, carries 58 years of mastery in craftsmanship and tourism, embodying the living memory of the medina. Kamal, born of deep Fassi lineage, carries the land in his heart and reveals Morocco’s soul through every encounter.
                  </p>
                  <p>
                    Together, they created Mystic Travel with one vision: To awaken travelers through experiences that blend ancestral wisdom with modern ease, where every journey becomes a ritual of reconnection.
                  </p>
                  <p className="font-semibold text-primary mt-6">
                    Our Essence is Experience<br />
                    Our Passion is Morocco
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={logoImage} 
                  alt="Traditional Moroccan architecture" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10"></div>
              </div>
            </div>
          </section>

          {/* Meet the Founders */}
          <section className="max-w-6xl mx-auto mb-20">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Meet the Founders</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Mohammed Badre */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-transform hover:translate-y-2">
                <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-30" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">Mohammed Badre</h3>
                  <p className="text-primary font-semibold mb-4">Founder & Manager</p>
                  <p className="text-muted-foreground mb-4">
                    Born and raised in Fes, Mohammed grew up surrounded by artisans whose creativity shaped his imagination. With his engineering background, he unites technology and heritage, designing travel experiences where innovation meets human warmth.
                  </p>
                </div>
              </div>
              {/* Mohammed Bouchareb */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-transform hover:translate-y-2">
                <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-30" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">Mohammed Bouchareb</h3>
                  <p className="text-primary font-semibold mb-4">Co-Founder & Technical Director</p>
                  <p className="text-muted-foreground mb-4">
                    A guardian of Moroccan craftsmanship, Mohammed has spent a lifetime preserving and sharing his knowledge of the medina’s arts. His wisdom infuses every detail, from selecting authentic artisans to ensuring each traveler feels the spirit of Fes.
                  </p>
                </div>
              </div>
              {/* Alaoui Chrifi Kamal */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-transform hover:translate-y-2">
                <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-30" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">Alaoui Chrifi Kamal</h3>
                  <p className="text-primary font-semibold mb-4">Co-Creator & Expert Guide</p>
                  <p className="text-muted-foreground mb-4">
                    For Kamal, guiding is not work, it’s a calling. He invites guests into Morocco’s heart through silence, laughter, and shared tea. With him, the country becomes not a destination but a feeling.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Circle / Partnerships */}
          <section className="max-w-6xl mx-auto mb-20">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Our Circle</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Mystic Travel thrives through sacred partnerships with Morocco’s keepers of art, wisdom, and wonder:
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-luxury-beige/50 rounded-xl border border-gray-100 transition-all hover:bg-luxury-beige">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Building className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Sacred Stays</h3>
                  <p className="text-muted-foreground text-sm">
                    Boutique riads and luxury retreats steeped in beauty and history
                  </p>
                </div>
                <div className="text-center p-6 bg-luxury-beige/50 rounded-xl border border-gray-100 transition-all hover:bg-luxury-beige">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Music className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Festival Portals</h3>
                  <p className="text-muted-foreground text-sm">
                    VIP access to iconic cultural events like the Sacred Music Festival of Fes and Mawazine in Rabat
                  </p>
                </div>
                <div className="text-center p-6 bg-luxury-beige/50 rounded-xl border border-gray-100 transition-all hover:bg-luxury-beige">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Brush className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Keepers of Craft</h3>
                  <p className="text-muted-foreground text-sm">
                    Chefs, musicians, calligraphers, and mystics who open their doors and their hearts
                  </p>
                </div>
              </div>
              <p className="text-center text-primary font-semibold mt-8">
                Every partnership is chosen for its soul
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutDetailPage;