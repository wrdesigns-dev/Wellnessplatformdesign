import { TrendingUp, Brain, Dumbbell, Sparkles } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Personalized Nutrition',
    description: 'Data-driven meal planning synced to your metabolic biomarkers.',
    color: '#6B9B8E',
    metrics: [
      { label: 'Meal Plans', value: '2.4k+' },
      { label: 'Avg. Success', value: '94%' }
    ]
  },
  {
    icon: Brain,
    title: 'Mindfulness Coaching',
    description: 'CBT-based stress resilience and neuro-alignment sessions.',
    color: '#8FA49A',
    metrics: [
      { label: 'Sessions', value: '15k+' },
      { label: 'Stress Reduction', value: '87%' }
    ]
  },
  {
    icon: Dumbbell,
    title: 'Functional Fitness',
    description: 'Adaptive strength programs designed for distributed lifestyles.',
    color: '#5A8A7D',
    metrics: [
      { label: 'Programs', value: '1.2k+' },
      { label: 'Completion', value: '91%' }
    ]
  },
  {
    icon: Sparkles,
    title: 'VitalPath Intelligence',
    description: '24/7 personalized health assistant that tracks recovery and insights in real-time.',
    color: '#6B9B8E',
    metrics: [
      { label: 'Active Users', value: '8.9k' },
      { label: 'Accuracy', value: '96%' }
    ]
  }
];

// Mini Chart Component
function MiniChart({ color }: { color: string }) {
  const data = [65, 72, 68, 85, 78, 92, 88];
  const max = Math.max(...data);
  
  return (
    <svg width="120" height="40" className="opacity-60">
      <defs>
        <linearGradient id={`miniGradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      
      {/* Area */}
      <path
        d={`M 0 40 ${data.map((val, i) => {
          const x = (i / (data.length - 1)) * 120;
          const y = 40 - (val / max) * 35;
          return `L ${x} ${y}`;
        }).join(' ')} L 120 40 Z`}
        fill={`url(#miniGradient-${color})`}
      />
      
      {/* Line */}
      <path
        d={`M ${data.map((val, i) => {
          const x = (i / (data.length - 1)) * 120;
          const y = 40 - (val / max) * 35;
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ')}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 
          className="text-4xl lg:text-6xl mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Comprehensive <span style={{ fontWeight: 500 }}>Wellness Services</span>
        </h2>
        <p 
          className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Science-backed modalities tailored to your unique biology and lifestyle.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl p-6 hover:border-[#6B9B8E]/50 transition-all duration-300 group relative overflow-hidden"
              style={{
                boxShadow: '0 0 0 1px rgba(107, 155, 142, 0.05)'
              }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: `${service.color}20` }}
              ></div>

              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                {/* Content */}
                <h3 
                  className="text-xl text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm text-gray-400 mb-6 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {service.description}
                </p>

                {/* Mini Chart */}
                <div className="mb-4">
                  <MiniChart color={service.color} />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {service.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-[#0D0D0D]/60 rounded-xl p-3">
                      <div 
                        className="text-lg font-semibold mb-0.5"
                        style={{ 
                          fontFamily: "'Cormorant Garamond', serif",
                          color: service.color 
                        }}
                      >
                        {metric.value}
                      </div>
                      <div 
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}