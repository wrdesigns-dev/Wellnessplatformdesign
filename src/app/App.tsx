import { useState, useEffect } from 'react';
import { Check, Plus, Star, Radio } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExpertCarousel } from './components/ExpertCarousel';
import { VitalityGraph } from './components/VitalityGraph';
import { LiveCounter } from './components/LiveCounter';
import { PartnerMarquee } from './components/PartnerMarquee';
import { VitalityQuiz, QuizResults } from './components/VitalityQuiz';
import { ResultsView } from './components/ResultsView';
import { ServicesSection } from './components/ServicesSection';
import { ExpertsShowcase } from './components/ExpertsShowcase';
import { PricingSection } from './components/PricingSection';
import { SectionDivider } from './components/SectionDivider';
import { BackToTop } from './components/BackToTop';
import { OnboardingModal } from './components/OnboardingModal';
import { Toaster } from 'sonner';

type TabType = '1-on-1 Coaching' | 'Personalized Nutrition' | 'VitalPath AI' | 'Community Challenges';

const tabContent = {
  '1-on-1 Coaching': {
    title: '1-on-1 Vitality Sessions',
    description: 'Access immediate, personalized support from world-class experts. We match you with specialists based on your unique metabolic and mental health profile.',
    bullets: [
      'Verified Clinical Nutritionists and Master Trainers.',
      'Seamless, one-click video booking.',
      'Personalized health roadmaps updated in real-time.'
    ]
  },
  'Personalized Nutrition': {
    title: 'Tailored Nutrition Intelligence',
    description: 'Transform your relationship with food through precision nutrition planning. Our AI analyzes your biometrics, preferences, and goals to create meal plans that evolve with you.',
    bullets: [
      'Metabolic-based meal recommendations.',
      'Real-time macro tracking and insights.',
      'Integration with popular food delivery services.'
    ]
  },
  'VitalPath AI': {
    title: 'Your 24/7 Health Intelligence',
    description: 'Harness the power of advanced machine learning to predict health trends, optimize recovery, and receive proactive wellness interventions before issues arise.',
    bullets: [
      'Predictive health analytics and risk assessment.',
      'Sleep, stress, and activity pattern recognition.',
      'Automated health report generation.'
    ]
  },
  'Community Challenges': {
    title: 'Transform Together',
    description: 'Join curated wellness challenges with like-minded individuals. Compete, collaborate, and celebrate milestones in a supportive, science-backed community environment.',
    bullets: [
      'Monthly themed challenges with expert guidance.',
      'Peer accountability and progress sharing.',
      'Exclusive rewards and milestone recognition.'
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('1-on-1 Coaching');
  const [liveSessions, setLiveSessions] = useState(142);
  const [quizOpen, setQuizOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Simulate live session count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSessions(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setQuizOpen(false);
    setShowResults(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookSession = () => {
    alert('Session booking functionality would open here!');
    setShowResults(false);
  };

  const handleGoHome = () => {
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = () => {
    setShowResults(false);
  };

  if (showResults && quizResults) {
    return (
      <>
        <Header 
          onGetStarted={() => setOnboardingOpen(true)} 
          onLogoClick={handleGoHome}
          onNavigate={handleNavigate}
        />
        <ResultsView results={quizResults} onBookSession={handleBookSession} />
        <Footer />
        
        {/* Onboarding Modal */}
        <OnboardingModal 
          isOpen={onboardingOpen} 
          onClose={() => setOnboardingOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Toaster for notifications */}
      <Toaster position="top-center" richColors />
      
      {/* Bokeh Background Effects - Subtle Wellness Colors */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#6B9B8E]/15 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#8FA49A]/10 rounded-full blur-[100px] animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-[#5A8A7D]/10 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#6B9B8E]/12 rounded-full blur-[90px] animate-float"></div>
      </div>

      <Header onGetStarted={() => setOnboardingOpen(true)} onLogoClick={handleGoHome} />

      <div className="relative z-10">
        {/* Live Activity Ticker */}
        <div className="fixed top-20 right-4 lg:top-6 lg:right-6 z-40">
          <div 
            className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-[#2D2640] px-3 lg:px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-[#6B9B8E]/10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Radio className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 animate-pulse" />
            <span className="text-xs lg:text-sm">
              <span className="text-gray-400 hidden sm:inline">Live Now:</span>{' '}
              <span className="text-white font-medium">{liveSessions}</span>{' '}
              <span className="text-gray-400 hidden lg:inline">coaching sessions</span>
              <span className="text-gray-400 lg:hidden">live</span>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32 pt-32 lg:pt-40">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <h1 
              className="mb-4 lg:mb-6 text-4xl sm:text-5xl lg:text-8xl tracking-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: '1.1' }}
            >
              Wellness, <span style={{ fontWeight: 500 }}>Mastered.</span>
            </h1>
            <p 
              className="text-base sm:text-lg lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 lg:mb-10 px-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              Precision nutrition and mental clarity, powered by intelligent insights.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4 px-4">
              <button 
                className="w-full sm:w-auto bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-[#6B9B8E]/30 transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.5rem' }}
                onClick={() => setOnboardingOpen(true)}
              >
                Start Your Path
              </button>
              <button 
                className="w-full sm:w-auto bg-transparent border-2 border-[#6B9B8E]/50 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium hover:bg-[#6B9B8E]/10 hover:border-[#6B9B8E] transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.5rem' }}
                onClick={() => setQuizOpen(true)}
              >
                Take Vitality Assessment
              </button>
            </div>
          </div>

          {/* Tab Pills */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-12 lg:mb-16 px-4">
            {(Object.keys(tabContent) as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full transition-all duration-300 text-sm lg:text-base ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white shadow-lg shadow-[#6B9B8E]/20'
                    : 'bg-[#1A1A1A]/60 backdrop-blur-md text-gray-400 hover:bg-[#252525] border border-[#2D2640]'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Bento Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 px-4">
            {/* Left: Expert Carousel Card */}
            <div 
              className="rounded-3xl lg:rounded-[32px] bg-[#151515]/60 backdrop-blur-xl border border-[#2D2640] p-6 lg:p-8 relative overflow-hidden shadow-xl shadow-[#6B9B8E]/5 hover:shadow-[#6B9B8E]/10 transition-shadow duration-500"
              style={{
                boxShadow: '0 0 0 1px rgba(107, 155, 142, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Glassmorphic glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B9B8E]/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 pr-2">
                    <h2 
                      className="text-2xl lg:text-3xl xl:text-4xl mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                    >
                      {tabContent[activeTab].title}
                    </h2>
                    <p 
                      className="text-gray-400 text-sm lg:text-base leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tabContent[activeTab].description}
                    </p>
                  </div>
                  <button 
                    className="flex-shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#6B9B8E]/30"
                    aria-label="Add to My Path"
                  >
                    <Plus className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </button>
                </div>

                <ExpertCarousel />

                {/* Bullet Points */}
                <ul className="space-y-3 mt-6">
                  {tabContent[activeTab].bullets.map((bullet, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div className="mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 lg:w-5 lg:h-5 text-[#6B9B8E]" />
                      </div>
                      <span className="text-gray-300 text-sm lg:text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="space-y-6 lg:space-y-8">
              {/* Vitality Graph */}
              <VitalityGraph />

              {/* Live Counters */}
              <div className="grid grid-cols-2 gap-4">
                <LiveCounter 
                  label="Healthy habits tracked today"
                  targetValue={12403}
                />
                <LiveCounter 
                  label="Active members"
                  targetValue={8924}
                />
              </div>

              {/* Trust Card */}
              <div 
                className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl p-6 relative overflow-hidden"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="text-4xl lg:text-5xl"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                    >
                      4.9
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-[#6B9B8E] text-[#6B9B8E]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Based on <span className="text-white font-medium">15,000+</span> client transformations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Marquee */}
          <div className="mt-16 lg:mt-20">
            <p 
              className="text-center text-gray-500 text-sm mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Trusted by leading institutions worldwide
            </p>
            <PartnerMarquee />
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <VitalityQuiz 
        isOpen={quizOpen} 
        onClose={() => setQuizOpen(false)}
        onComplete={handleQuizComplete} 
      />

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={onboardingOpen} 
        onClose={() => setOnboardingOpen(false)}
      />

      {/* Services Section */}
      <SectionDivider />
      <ServicesSection />

      {/* Experts Showcase */}
      <SectionDivider />
      <ExpertsShowcase />

      {/* Pricing Section */}
      <SectionDivider />
      <PricingSection />

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-30px, 30px);
          }
          66% {
            transform: translate(20px, -20px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}