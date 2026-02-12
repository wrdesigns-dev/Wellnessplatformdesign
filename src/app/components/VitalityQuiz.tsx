import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: QuizResults) => void;
}

export interface QuizResults {
  primaryFocus: string;
  energyLevel: number;
  sleepHours: string;
  environment: string;
  preferredStyle: string;
  coachingValue: string;
  vitalityScore: number;
  matchedExpert: {
    name: string;
    role: string;
    specialty: string;
  };
  personalizedGoal: string;
}

const questions = {
  section1: {
    title: 'The "Why"',
    subtitle: 'Goal Identification',
    question: 'What is your primary focus for the next 90 days?',
    options: [
      { value: 'mental-clarity', label: 'Mental Clarity & Stress Resilience', emoji: '🧘' },
      { value: 'metabolic-health', label: 'Metabolic Health & Weight Management', emoji: '🥗' },
      { value: 'physical-performance', label: 'Physical Performance & Strength', emoji: '💪' },
      { value: 'holistic-optimization', label: 'Longevity & Holistic Optimization', emoji: '✨' }
    ]
  },
  section2: {
    title: 'The "Current State"',
    subtitle: 'Baseline Data',
    questions: [
      {
        id: 'energy',
        question: 'How would you rate your average daily energy levels?',
        type: 'slider',
        min: 1,
        max: 10,
        labels: ['Low', 'Steady', 'High']
      },
      {
        id: 'sleep',
        question: 'On average, how many hours of deep focus or restorative sleep are you getting?',
        type: 'select',
        options: [
          { value: '0-4', label: 'Less than 4 hours' },
          { value: '4-6', label: '4-6 hours' },
          { value: '6-8', label: '6-8 hours' },
          { value: '8+', label: '8+ hours' }
        ]
      }
    ]
  },
  section3: {
    title: 'The "Lifestyle"',
    subtitle: 'Environmental Factors',
    questions: [
      {
        id: 'environment',
        question: 'Which best describes your daily environment?',
        options: [
          { value: 'corporate', label: 'High-pressure corporate / Remote desk-bound', icon: '💼' },
          { value: 'active', label: 'Physically active / On-the-go', icon: '🏃' },
          { value: 'caregiver', label: 'Parent / Caregiver', icon: '👨‍👩‍👧' }
        ]
      },
      {
        id: 'style',
        question: 'Do you prefer working toward your goals solo or in a community?',
        options: [
          { value: 'solo', label: 'Solo - I thrive with personalized attention', icon: '🎯' },
          { value: 'community', label: 'Community - I love group accountability', icon: '👥' }
        ]
      }
    ]
  },
  section4: {
    title: 'The "Path"',
    subtitle: 'Matching Experts',
    question: 'When it comes to coaching, what do you value most?',
    options: [
      { value: 'technical', label: 'Technical Expertise & Data', icon: '📊' },
      { value: 'emotional', label: 'Emotional Support & Accountability', icon: '💚' },
      { value: 'high-energy', label: 'High Energy & Push', icon: '⚡' }
    ]
  }
};

export function VitalityQuiz({ isOpen, onClose, onComplete }: QuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    primaryFocus: '',
    energyLevel: 5,
    sleepHours: '',
    environment: '',
    preferredStyle: '',
    coachingValue: ''
  });

  if (!isOpen) return null;

  const calculateResults = (): QuizResults => {
    // Calculate vitality score based on answers
    let score = 50; // Base score

    // Energy level contribution (30 points max)
    score += (answers.energyLevel / 10) * 30;

    // Sleep contribution (20 points max)
    const sleepScore = {
      '0-4': 0,
      '4-6': 10,
      '6-8': 18,
      '8+': 20
    }[answers.sleepHours] || 0;
    score += sleepScore;

    // Match expert based on coaching value and primary focus
    let matchedExpert = {
      name: 'Dr. Sarah Chen',
      role: 'Clinical Nutritionist',
      specialty: 'Metabolic Health'
    };

    if (answers.coachingValue === 'technical' || answers.primaryFocus === 'metabolic-health') {
      matchedExpert = {
        name: 'Dr. Sarah Chen',
        role: 'Clinical Nutritionist',
        specialty: 'Metabolic Health'
      };
    } else if (answers.coachingValue === 'emotional' || answers.primaryFocus === 'mental-clarity') {
      matchedExpert = {
        name: 'Dr. Amelia Foster',
        role: 'Mental Health Coach',
        specialty: 'Mindfulness & Resilience'
      };
    } else if (answers.coachingValue === 'high-energy' || answers.primaryFocus === 'physical-performance') {
      matchedExpert = {
        name: 'Marcus Rodriguez',
        role: 'Master Fitness Trainer',
        specialty: 'Performance Optimization'
      };
    } else {
      matchedExpert = {
        name: 'James Park',
        role: 'Wellness Strategist',
        specialty: 'Holistic Integration'
      };
    }

    // Personalized goal based on primary focus
    const goals = {
      'mental-clarity': 'Achieve mental clarity and build stress resilience',
      'metabolic-health': 'Optimize your metabolism and reach your ideal weight',
      'physical-performance': 'Build strength and peak physical performance',
      'holistic-optimization': 'Create a sustainable longevity-focused lifestyle'
    };

    return {
      ...answers,
      vitalityScore: Math.round(score),
      matchedExpert,
      personalizedGoal: goals[answers.primaryFocus as keyof typeof goals] || 'Transform your wellness journey'
    };
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const results = calculateResults();
      onComplete(results);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return answers.primaryFocus !== '';
      case 2:
        return answers.sleepHours !== '';
      case 3:
        return answers.environment !== '' && answers.preferredStyle !== '';
      case 4:
        return answers.coachingValue !== '';
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="bg-[#151515] border border-[#2D2640] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#151515] border-b border-[#2D2640] p-6 flex items-center justify-between">
          <div>
            <h2 
              className="text-2xl text-white mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              Vitality Assessment
            </h2>
            <p className="text-sm text-gray-400">Step {step} of 4</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#252525] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#1A1A1A]">
          <div 
            className="h-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Section 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-4">
                  <Sparkles className="w-4 h-4 text-[#6B9B8E]" />
                  <span className="text-sm text-[#6B9B8E]">{questions.section1.subtitle}</span>
                </div>
                <h3 
                  className="text-2xl lg:text-3xl text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {questions.section1.question}
                </h3>
              </div>

              <div className="grid gap-4">
                {questions.section1.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, primaryFocus: option.value })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      answers.primaryFocus === option.value
                        ? 'border-[#6B9B8E] bg-[#6B9B8E]/10'
                        : 'border-[#2D2640] hover:border-[#3D3650] bg-[#1A1A1A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.emoji}</span>
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 2 */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-4">
                  <Sparkles className="w-4 h-4 text-[#6B9B8E]" />
                  <span className="text-sm text-[#6B9B8E]">{questions.section2.subtitle}</span>
                </div>
              </div>

              {/* Energy Level Slider */}
              <div>
                <label className="block text-white text-lg mb-4">
                  How would you rate your average daily energy levels?
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={answers.energyLevel}
                  onChange={(e) => setAnswers({ ...answers, energyLevel: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B9B8E 0%, #6B9B8E ${(answers.energyLevel / 10) * 100}%, #2D2640 ${(answers.energyLevel / 10) * 100}%, #2D2640 100%)`
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-400">1 - Low</span>
                  <span className="text-lg font-semibold text-[#6B9B8E]">{answers.energyLevel}</span>
                  <span className="text-sm text-gray-400">10 - High</span>
                </div>
              </div>

              {/* Sleep Hours */}
              <div>
                <label className="block text-white text-lg mb-4">
                  On average, how many hours of deep focus or restorative sleep are you getting?
                </label>
                <div className="grid gap-3">
                  {questions.section2.questions[1].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAnswers({ ...answers, sleepHours: option.value })}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        answers.sleepHours === option.value
                          ? 'border-[#6B9B8E] bg-[#6B9B8E]/10'
                          : 'border-[#2D2640] hover:border-[#3D3650] bg-[#1A1A1A]/40'
                      }`}
                    >
                      <span className="text-white">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 3 */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-4">
                  <Sparkles className="w-4 h-4 text-[#6B9B8E]" />
                  <span className="text-sm text-[#6B9B8E]">{questions.section3.subtitle}</span>
                </div>
              </div>

              {/* Environment */}
              <div>
                <label className="block text-white text-lg mb-4">
                  Which best describes your daily environment?
                </label>
                <div className="grid gap-3">
                  {questions.section3.questions[0].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAnswers({ ...answers, environment: option.value })}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        answers.environment === option.value
                          ? 'border-[#6B9B8E] bg-[#6B9B8E]/10'
                          : 'border-[#2D2640] hover:border-[#3D3650] bg-[#1A1A1A]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="text-white">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Style */}
              <div>
                <label className="block text-white text-lg mb-4">
                  Do you prefer working toward your goals solo or in a community?
                </label>
                <div className="grid gap-3">
                  {questions.section3.questions[1].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAnswers({ ...answers, preferredStyle: option.value })}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        answers.preferredStyle === option.value
                          ? 'border-[#6B9B8E] bg-[#6B9B8E]/10'
                          : 'border-[#2D2640] hover:border-[#3D3650] bg-[#1A1A1A]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="text-white">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9B8E]/10 border border-[#6B9B8E]/20 mb-4">
                  <Sparkles className="w-4 h-4 text-[#6B9B8E]" />
                  <span className="text-sm text-[#6B9B8E]">{questions.section4.subtitle}</span>
                </div>
                <h3 
                  className="text-2xl lg:text-3xl text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {questions.section4.question}
                </h3>
              </div>

              <div className="grid gap-4">
                {questions.section4.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, coachingValue: option.value })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      answers.coachingValue === option.value
                        ? 'border-[#6B9B8E] bg-[#6B9B8E]/10'
                        : 'border-[#2D2640] hover:border-[#3D3650] bg-[#1A1A1A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.icon}</span>
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="sticky bottom-0 bg-[#151515] border-t border-[#2D2640] p-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              step === 1
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white hover:shadow-lg hover:shadow-[#6B9B8E]/30'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {step === 4 ? 'Complete Assessment' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6B9B8E;
          cursor: pointer;
          border: 3px solid #0D0D0D;
          box-shadow: 0 0 10px rgba(107, 155, 142, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6B9B8E;
          cursor: pointer;
          border: 3px solid #0D0D0D;
          box-shadow: 0 0 10px rgba(107, 155, 142, 0.5);
        }
      `}</style>
    </div>
  );
}
