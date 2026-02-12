import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Expert {
  name: string;
  role: string;
  specialty: string;
  image: string;
  status: 'Available' | 'In Session' | 'Online';
}

const experts: Expert[] = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Clinical Nutritionist',
    specialty: 'Metabolic Health',
    image: 'https://images.unsplash.com/photo-1601341348280-550b5e87281b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb25pc3QlMjBwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NzA4MjY0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Master Fitness Trainer',
    specialty: 'Performance Optimization',
    image: 'https://images.pexels.com/photos/5336914/pexels-photo-5336914.jpeg',
    status: 'In Session'
  },
  {
    name: 'Dr. Amelia Foster',
    role: 'Mental Health Coach',
    specialty: 'Mindfulness & Resilience',
    image: 'https://images.unsplash.com/photo-1758273240403-052b3c99f636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB0aGVyYXBpc3QlMjBjYWxtfGVufDF8fHx8MTc3MDg1MjQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online'
  },
  {
    name: 'James Park',
    role: 'Wellness Strategist',
    specialty: 'Holistic Integration',
    image: 'https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg',
    status: 'Available'
  }
];

export function ExpertCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % experts.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + experts.length) % experts.length);

  const currentExpert = experts[currentIndex];
  const statusColors = {
    Available: 'bg-green-500',
    'In Session': 'bg-yellow-500',
    Online: 'bg-blue-500'
  };

  return (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden relative group">
        <img 
          src={currentExpert.image}
          alt={currentExpert.name}
          className="w-full h-[400px] object-cover transition-all duration-700"
          key={currentIndex}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Expert Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 
                className="text-2xl text-white mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                {currentExpert.name}
              </h3>
              <p 
                className="text-gray-300 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {currentExpert.role}
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div 
              className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <div className={`w-2 h-2 rounded-full ${statusColors[currentExpert.status]} animate-pulse`}></div>
              <span className="text-xs font-medium text-gray-900">{currentExpert.status}</span>
            </div>
            <div 
              className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="text-xs font-medium text-gray-900">{currentExpert.specialty}</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {experts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}