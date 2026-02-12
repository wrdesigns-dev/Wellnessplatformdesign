import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { QuizResults } from './VitalityQuiz';
import { BookingConfirmationModal } from './BookingConfirmationModal';

interface ResultsViewProps {
  results: QuizResults;
  onBookSession: () => void;
}

export function ResultsView({ results, onBookSession }: ResultsViewProps) {
  const [scoreAnimation, setScoreAnimation] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    // Animate score
    const duration = 2000;
    const steps = 60;
    const increment = results.vitalityScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= results.vitalityScore) {
        setScoreAnimation(results.vitalityScore);
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 300);
      } else {
        setScoreAnimation(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [results.vitalityScore]);

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#6B9B8E';
    if (score >= 60) return '#8FA49A';
    return '#A0ADA8';
  };

  // Get personalized insights based on quiz answers
  const getInsights = () => {
    const insights = [];

    if (results.energyLevel <= 3) {
      insights.push({
        title: 'Recovery Focus',
        description: 'Your energy levels suggest prioritizing restorative practices and gentle nutrition.',
        icon: '🌱'
      });
    } else if (results.energyLevel >= 8) {
      insights.push({
        title: 'Peak Performance',
        description: 'Leverage your high energy with advanced AI tracking and performance optimization.',
        icon: '⚡'
      });
    } else {
      insights.push({
        title: 'Consistency Building',
        description: 'Focus on habit stacking and sustainable routines for steady progress.',
        icon: '📈'
      });
    }

    if (results.environment === 'corporate') {
      insights.push({
        title: 'Desk Wellness',
        description: 'Receive prompts for desk stretches and mindfulness breaks during your workday.',
        icon: '💼'
      });
    } else if (results.environment === 'active') {
      insights.push({
        title: 'On-the-Go Nutrition',
        description: 'High-calorie nutrition plans designed for your active lifestyle.',
        icon: '🏃'
      });
    } else if (results.environment === 'caregiver') {
      insights.push({
        title: 'Efficient Wellness',
        description: 'Bite-sized 15-minute wellness blocks that fit your busy schedule.',
        icon: '⏱️'
      });
    }

    if (results.preferredStyle === 'community') {
      insights.push({
        title: 'Community Power',
        description: 'Access exclusive group challenges and leaderboards for accountability.',
        icon: '👥'
      });
    }

    return insights;
  };

  const scoreColor = getScoreColor(results.vitalityScore);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white py-32 px-4 relative z-0">
      <div className="max-w-4xl mx-auto">
        {/* Vitality Score Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#6B9B8E]" />
            <span className="text-sm text-[#6B9B8E]">Your Assessment Results</span>
          </div>

          <h1 
            className="text-4xl lg:text-6xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Your Vitality Score
          </h1>

          {/* Animated Score Circle */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <svg className="w-64 h-64 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="#2D2640"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke={scoreColor}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 100}`}
                strokeDashoffset={`${2 * Math.PI * 100 * (1 - scoreAnimation / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.3s ease-out',
                  filter: `drop-shadow(0 0 20px ${scoreColor}40)`
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span 
                className="text-6xl font-semibold"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  color: scoreColor
                }}
              >
                {scoreAnimation}
              </span>
              <span className="text-gray-400 text-lg">/100</span>
            </div>
          </div>

          <p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {results.personalizedGoal}
          </p>
        </div>

        {/* Matched Expert Card */}
        {showContent && (
          <div className="mb-12 animate-fade-in">
            <div 
              className="bg-[#151515]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl p-8 relative overflow-hidden"
              style={{
                boxShadow: '0 0 0 1px rgba(107, 155, 142, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B9B8E]/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#6B9B8E]" />
                  <h2 
                    className="text-2xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    Your Matched Expert
                  </h2>
                </div>

                <div className="bg-[#1A1A1A]/60 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center">
                      <span 
                        className="text-white text-2xl"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                      >
                        {results.matchedExpert.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 
                        className="text-xl text-white mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                      >
                        {results.matchedExpert.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{results.matchedExpert.role}</p>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6B9B8E]/20 border border-[#6B9B8E]/30">
                    <div className="w-2 h-2 rounded-full bg-[#6B9B8E]"></div>
                    <span className="text-sm text-[#6B9B8E]">{results.matchedExpert.specialty}</span>
                  </div>
                </div>

                <p 
                  className="text-gray-400 mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Based on your profile, we've matched you with <span className="text-white font-medium">{results.matchedExpert.name}</span>, 
                  who specializes in {results.matchedExpert.specialty.toLowerCase()}. They'll help you achieve your goals with personalized guidance.
                </p>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white px-8 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-[#6B9B8E]/30 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Calendar className="w-5 h-5" />
                  Book Your First Session
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Personalized Insights */}
        {showContent && (
          <div className="animate-fade-in-delayed">
            <h2 
              className="text-3xl text-center mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              Your Personalized Path
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {getInsights().map((insight, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-2xl p-6 hover:border-[#6B9B8E]/50 transition-all"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="text-4xl mb-3">{insight.icon}</div>
                  <h3 
                    className="text-lg text-white mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {insight.title}
                  </h3>
                  <p 
                    className="text-sm text-gray-400"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>

      <BookingConfirmationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookSession={onBookSession}
        expertName={results.matchedExpert.name}
        specialty={results.matchedExpert.specialty}
      />
    </div>
  );
}