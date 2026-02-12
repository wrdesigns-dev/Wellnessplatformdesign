import { Check, Sparkles, Zap, Building2 } from 'lucide-react';

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  period: string;
  icon: any;
  popular?: boolean;
  features: Array<{
    text: string;
    included: boolean;
    highlighted?: boolean;
  }>;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Essential',
    tagline: 'For the baseline optimizer.',
    price: '$49',
    period: '/month',
    icon: Sparkles,
    features: [
      { text: 'VitalPath Health Assistant', included: true },
      { text: 'Personalized Meal Plans', included: true },
      { text: 'Activity & Sleep Tracking', included: true },
      { text: '1 Monthly Coaching Session', included: true },
      { text: 'Community Access', included: true },
      { text: 'Advanced Analytics', included: false },
      { text: 'Priority Support', included: false },
      { text: 'Custom Integrations', included: false }
    ]
  },
  {
    name: 'Path+',
    tagline: 'Our most popular holistic journey.',
    price: '$99',
    period: '/month',
    icon: Zap,
    popular: true,
    features: [
      { text: 'VitalPath Health Assistant', included: true, highlighted: true },
      { text: 'Personalized Meal Plans', included: true },
      { text: 'Activity & Sleep Tracking', included: true },
      { text: '2 Monthly Coaching Sessions', included: true, highlighted: true },
      { text: 'Community Access', included: true },
      { text: 'Advanced Analytics Dashboard', included: true, highlighted: true },
      { text: 'Priority Support', included: true },
      { text: 'Wearable Device Integration', included: true }
    ]
  },
  {
    name: 'Enterprise',
    tagline: 'For high-performance teams.',
    price: 'Custom',
    period: 'pricing',
    icon: Building2,
    features: [
      { text: 'Everything in Path+', included: true },
      { text: 'Unlimited Coaching Sessions', included: true, highlighted: true },
      { text: 'Dedicated Wellness Strategist', included: true, highlighted: true },
      { text: 'Team Analytics Dashboard', included: true },
      { text: 'White-Label Options', included: true },
      { text: 'Custom API Access', included: true },
      { text: 'Onboarding & Training', included: true },
      { text: '24/7 Concierge Support', included: true, highlighted: true }
    ]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 pb-0 relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 
          className="text-4xl lg:text-6xl mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Choose Your <span style={{ fontWeight: 500 }}>Wellness Path</span>
        </h2>
        <p 
          className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Transparent pricing with no hidden fees. Cancel anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <div
              key={index}
              className={`relative bg-[#1A1A1A]/60 backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 ${
                tier.popular
                  ? 'border-2 border-[#6B9B8E] shadow-2xl shadow-[#6B9B8E]/20 lg:-translate-y-4'
                  : 'border border-[#2D2640] hover:border-[#6B9B8E]/50'
              }`}
              style={{
                boxShadow: tier.popular 
                  ? '0 0 0 1px rgba(107, 155, 142, 0.2), 0 20px 60px rgba(107, 155, 142, 0.15)'
                  : '0 0 0 1px rgba(107, 155, 142, 0.05)'
              }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Glow Effect */}
              {tier.popular && (
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#6B9B8E]/20 rounded-full blur-3xl"></div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    tier.popular 
                      ? 'bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F]'
                      : 'bg-[#6B9B8E]/20'
                  }`}
                >
                  <Icon className={`w-7 h-7 ${tier.popular ? 'text-white' : 'text-[#6B9B8E]'}`} />
                </div>

                {/* Title */}
                <h3 
                  className="text-3xl text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {tier.name}
                </h3>
                <p 
                  className="text-sm text-gray-400 mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {tier.tagline}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span 
                      className={`text-5xl ${tier.popular ? 'text-[#6B9B8E]' : 'text-white'}`}
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                    >
                      {tier.price}
                    </span>
                    <span 
                      className="text-xl text-gray-400"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  className={`w-full px-6 py-4 rounded-full font-medium transition-all duration-300 mb-8 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white hover:shadow-xl hover:shadow-[#6B9B8E]/40'
                      : 'bg-[#252525] text-white hover:bg-[#2D2D2D] border border-[#3D3650]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Your Path'}
                </button>

                {/* Features List */}
                <ul className="space-y-4">
                  {tier.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            feature.highlighted && tier.popular
                              ? 'bg-[#6B9B8E]'
                              : 'bg-[#6B9B8E]/20'
                          }`}>
                            <Check className={`w-3.5 h-3.5 ${
                              feature.highlighted && tier.popular
                                ? 'text-white'
                                : 'text-[#6B9B8E]'
                            }`} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[#2D2640] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included 
                          ? feature.highlighted && tier.popular
                            ? 'text-white font-medium'
                            : 'text-gray-300'
                          : 'text-gray-600'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Analytics Callout */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div 
          className="bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-[#6B9B8E]/30 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
          style={{
            boxShadow: '0 0 0 1px rgba(107, 155, 142, 0.15), 0 20px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B9B8E]/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#6B9B8E]" />
              <span className="text-sm text-[#6B9B8E]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Powered by Advanced Intelligence
              </span>
            </div>
            
            <h3 
              className="text-2xl lg:text-3xl text-white mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              The Future of Wellness is Predictive
            </h3>
            <p 
              className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Our platform doesn't just track—it anticipates. VitalPath's adaptive learning models analyze your patterns, 
              predict health trends, and intervene proactively before issues arise. Available in Path+ and Enterprise tiers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}