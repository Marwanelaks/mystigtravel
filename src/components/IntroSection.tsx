// IntroSection.js (updated)
import { Heart, Crown, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IntroSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/philosophy');
  };

  return (
    <section className="py-32 bg-gradient-to-b from-luxury-beige to-luxury-beige/70 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto fade-in-up">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-foreground">
              Why travel with us
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the difference of traveling with those who know Morocco's soul
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Tailored journeys of the soul</h3>
              <p className="text-muted-foreground leading-relaxed">Every voyage is intricately designed to reflect your dreams and inner yearnings</p>
              <div className="mt-4">
                <div className="w-8 h-0.5 bg-primary mx-auto group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Luxury with spirit</h3>
              <p className="text-muted-foreground leading-relaxed">From opulent riads to secluded desert camps, each detail whispers indulgence and reverence</p>
              <div className="mt-4">
                <div className="w-8 h-0.5 bg-primary mx-auto group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Seamless booking</h3>
              <p className="text-muted-foreground leading-relaxed">Effortless planning with Google Pay and real-time support from our expert team</p>
              <div className="mt-4">
                <div className="w-8 h-0.5 bg-primary mx-auto group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleLearnMore}
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-lg transition-all bg-primary rounded-lg hover:bg-primary-dark text-white"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-primary-dark rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary-dark rounded-lg group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white flex items-center gap-2 justify-center">
                Learn more about our philosophy
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4">
        <Sparkles className="w-6 h-6 text-primary/30 animate-pulse" />
      </div>
      <div className="absolute bottom-1/3 right-1/4">
        <Sparkles className="w-5 h-5 text-primary/40 animate-pulse delay-300" />
      </div>
    </section>
  );
};

export default IntroSection;