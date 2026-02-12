import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, CheckCircle2 } from 'lucide-react';

interface Expert {
  name: string;
  role: string;
  specialty: string;
  image: string;
  verified: boolean;
  rating: number;
  sessions: number;
  bio: string;
}

const experts: Expert[] = [
  {
    name: 'Marcus Rodriguez',
    role: 'Master Fitness Trainer',
    specialty: 'Performance Optimization',
    image: 'https://images.pexels.com/photos/5336914/pexels-photo-5336914.jpeg',
    verified: true,
    rating: 4.9,
    sessions: 2400,
    bio: 'Former Olympic trainer specializing in adaptive strength programs for modern professionals.'
  },
  {
    name: 'James Park',
    role: 'Wellness Strategist',
    specialty: 'Holistic Integration',
    image: 'https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg',
    verified: true,
    rating: 5.0,
    sessions: 1850,
    bio: 'Expert in longevity science and sustainable lifestyle design for high-performers.'
  },
  {
    name: 'Dr. Elena Vance',
    role: 'Lead Nutritionist',
    specialty: 'Metabolic Optimization',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb25pc3QlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA4NTI0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    rating: 4.9,
    sessions: 3200,
    bio: 'Board-certified clinical nutritionist with expertise in precision metabolic health.'
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'Clinical Nutritionist',
    specialty: 'Metabolic Health',
    image: 'https://images.unsplash.com/photo-1601341348280-550b5e87281b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb25pc3QlMjBwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NzA4MjY0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    rating: 4.8,
    sessions: 2100,
    bio: 'Integrative nutritionist focused on gut health and sustainable dietary interventions.'
  },
  {
    name: 'Dr. Amelia Foster',
    role: 'Mental Health Coach',
    specialty: 'Mindfulness & Resilience',
    image: 'https://images.unsplash.com/photo-1758273240403-052b3c99f636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB0aGVyYXBpc3QlMjBjYWxtfGVufDF8fHx8MTc3MDg1MjQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    rating: 5.0,
    sessions: 1950,
    bio: 'Licensed therapist specializing in CBT and stress resilience for executive wellness.'
  }
];

export function ExpertsShowcase() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 400; // Approximate card width including gap
  const maxScroll = (experts.length - 1) * cardWidth;

  const scroll = (direction: 'left' | 'right') => {
    setScrollPosition((prev) => {
      if (direction === 'left') {
        return Math.max(0, prev - cardWidth);
      } else {
        return Math.min(maxScroll, prev + cardWidth);
      }
    });
  };

  return (
    <section id="experts" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center">
          <h2 
            className="text-4xl lg:text-6xl mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Meet Your <span style={{ fontWeight: 500 }}>Expert Team</span>
          </h2>
          <p 
            className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            World-class specialists dedicated to your transformation.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          disabled={scrollPosition === 0}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#1A1A1A]/80 backdrop-blur-xl border border-[#2D2640] flex items-center justify-center transition-all ${
            scrollPosition === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-[#252525] hover:border-[#6B9B8E]/50'
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => scroll('right')}
          disabled={scrollPosition >= maxScroll}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#1A1A1A]/80 backdrop-blur-xl border border-[#2D2640] flex items-center justify-center transition-all ${
            scrollPosition >= maxScroll 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-[#252525] hover:border-[#6B9B8E]/50'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Scrollable Cards */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 px-4 sm:px-6 lg:px-24 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {experts.map((expert, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] lg:w-[380px] bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl overflow-hidden hover:border-[#6B9B8E]/50 transition-all duration-300 group"
                style={{
                  boxShadow: '0 0 0 1px rgba(107, 155, 142, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  {/* Verified Badge */}
                  {expert.verified && (
                    <div className="absolute top-4 right-4 bg-[#6B9B8E] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Specialist
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-[#6B9B8E] text-[#6B9B8E]" />
                    <span className="text-sm font-semibold text-gray-900">{expert.rating}</span>
                    <span className="text-xs text-gray-500">({expert.sessions})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 
                    className="text-2xl text-white mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {expert.name}
                  </h3>
                  <p 
                    className="text-sm text-gray-400 mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {expert.role}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-4">
                    <span className="text-xs text-[#6B9B8E]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {expert.specialty}
                    </span>
                  </div>

                  <p 
                    className="text-sm text-gray-400 mb-6 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {expert.bio}
                  </p>

                  {/* Book Now Button */}
                  <button 
                    className="w-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-[#6B9B8E]/30 transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(experts.length / 2) }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              Math.floor(scrollPosition / (cardWidth * 2)) === index
                ? 'w-8 bg-[#6B9B8E]'
                : 'w-1.5 bg-[#2D2640]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
