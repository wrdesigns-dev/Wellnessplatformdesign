import { useState, useEffect } from 'react';
import { X, Apple, Brain, Activity, Heart, Check } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const focusAreas = [
  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: Apple,
    description: 'Optimize your diet'
  },
  {
    id: 'mindfulness',
    label: 'Mindfulness',
    icon: Brain,
    description: 'Mental clarity & peace'
  },
  {
    id: 'fitness',
    label: 'Fitness',
    icon: Activity,
    description: 'Build strength & energy'
  },
  {
    id: 'longevity',
    label: 'Longevity',
    icon: Heart,
    description: 'Long-term wellness'
  }
];

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
}

const categoryQuestions: Record<string, Question[]> = {
  nutrition: [
    {
      id: 'nutrition-goal',
      category: 'nutrition',
      question: 'What is your primary dietary goal?',
      options: ['Metabolic health', 'Weight management', 'Muscle gain', 'Anti-inflammatory focus']
    },
    {
      id: 'nutrition-boundaries',
      category: 'nutrition',
      question: 'Do you have any specific dietary boundaries?',
      options: ['Plant-based', 'Keto', 'Paleo', 'No restrictions']
    }
  ],
  mindfulness: [
    {
      id: 'mindfulness-stress',
      category: 'mindfulness',
      question: 'How does stress typically manifest for you?',
      options: ['Mental fog', 'Physical tension', 'Sleep disruptions']
    },
    {
      id: 'mindfulness-experience',
      category: 'mindfulness',
      question: 'What is your experience level with meditation?',
      options: ['Beginner', 'Intermediate', 'Advanced']
    }
  ],
  fitness: [
    {
      id: 'fitness-activity',
      category: 'fitness',
      question: 'What best describes your current activity level?',
      options: ['Sedentary (desk-bound)', 'Lightly active', 'Highly active']
    },
    {
      id: 'fitness-objective',
      category: 'fitness',
      question: 'What is your primary physical objective?',
      options: ['Functional mobility', 'Cardiovascular health', 'Peak performance']
    }
  ],
  longevity: [
    {
      id: 'longevity-tracking',
      category: 'longevity',
      question: 'Are you currently tracking biomarkers through wearables?',
      options: ['Yes (Apple Watch/Oura/Whoop)', 'No (manual tracking)']
    }
  ]
};

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'selection' | 'questions' | 'processing' | 'summary'>('selection');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [statusMessage, setStatusMessage] = useState('Analyzing metabolic biomarkers...');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const statusMessages = [
    'Analyzing metabolic biomarkers...',
    'Optimizing coach matching...',
    'Calibrating wellness algorithms...',
    'Reviewing behavioral patterns...',
    'Personalizing nutrition protocols...',
    'Mapping stress response metrics...',
    'Configuring fitness parameters...',
    'Synchronizing longevity markers...'
  ];

  // Auto-cycle status messages during processing
  useEffect(() => {
    if (currentStep === 'processing') {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % statusMessages.length;
        setStatusMessage(statusMessages[messageIndex]);
      }, 2000);

      // Auto-advance to summary after 6 seconds
      const timeout = setTimeout(() => {
        setCurrentStep('summary');
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [currentStep]);

  if (!isOpen && !isClosing) return null;

  const toggleArea = (id: string) => {
    setSelectedAreas(prev => 
      prev.includes(id) 
        ? prev.filter(area => area !== id)
        : [...prev, id]
    );
  };

  const generateQuestions = () => {
    const questions: Question[] = [];
    selectedAreas.forEach(area => {
      if (categoryQuestions[area]) {
        questions.push(...categoryQuestions[area]);
      }
    });
    return questions;
  };

  const handleContinueClick = () => {
    if (currentStep === 'selection' && selectedAreas.length === 0) {
      toast('Please select at least one focus area to proceed.', {
        style: {
          background: 'linear-gradient(to right, #6B9B8E, #4A7C6F)',
          color: 'white',
          border: 'none'
        }
      });
      return;
    }
    handleContinueFromSelection();
  };

  const handleContinueFromSelection = () => {
    const questions = generateQuestions();
    setGeneratedQuestions(questions);
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
  };

  const handleAnswerQuestion = (answer: string) => {
    const currentQuestion = generatedQuestions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    // Move to next question or processing
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep('processing');
    }
  };

  const handleBack = () => {
    if (currentStep === 'questions') {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else {
        setCurrentStep('selection');
      }
    } else if (currentStep === 'summary') {
      setCurrentStep('questions');
      setCurrentQuestionIndex(generatedQuestions.length - 1);
    }
  };

  const handleComplete = () => {
    // Show success animation
    setShowSuccessAnimation(true);
    
    // After 1 second, start closing animation
    setTimeout(() => {
      setIsClosing(true);
      
      // After transition completes (500ms), reset and close
      setTimeout(() => {
        setCurrentStep('selection');
        setSelectedAreas([]);
        setAnswers({});
        setCurrentQuestionIndex(0);
        setGeneratedQuestions([]);
        setShowSuccessAnimation(false);
        setIsClosing(false);
        onClose();
      }, 500);
    }, 1000);
  };

  const totalSteps = 3;
  const currentStepNumber = currentStep === 'selection' ? 1 : currentStep === 'questions' ? 2 : 3;
  const progress = (currentStepNumber / totalSteps) * 100;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop - Blurred dark background */}
      <div 
        className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-2xl"
        onClick={!showSuccessAnimation ? onClose : undefined}
      />

      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-3xl bg-[#151515]/70 backdrop-blur-3xl rounded-[40px] border border-[#2D2640] p-8 lg:p-12 shadow-2xl transition-all duration-500 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.15), 0 0 60px rgba(139, 92, 246, 0.2), 0 30px 60px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Success Animation Overlay */}
        {showSuccessAnimation && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0D0D0D]/60 backdrop-blur-sm rounded-[40px]">
            <div className="relative">
              {/* Pulsing glow */}
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] opacity-30 animate-ping"></div>
              
              {/* V Logo Circle */}
              <div 
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center animate-bounce"
                style={{
                  boxShadow: '0 0 60px rgba(107, 155, 142, 0.6), 0 0 120px rgba(107, 155, 142, 0.3)'
                }}
              >
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
        )}

        {/* Lavender Glow Effect */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Close Button */}
        {!showSuccessAnimation && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1A1A1A]/60 backdrop-blur-md border border-[#2D2640] flex items-center justify-center hover:bg-[#252525] transition-colors text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Progress Bar */}
        <div className="mb-8 lg:mb-12">
          <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p 
            className="text-sm text-gray-400 mt-2 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Step {currentStepNumber} of {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 
            className="text-4xl lg:text-5xl mb-4 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Let's define your path
          </h2>
          <p 
            className="text-lg text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {currentStep === 'selection' && 'Select the areas you want to focus on'}
            {currentStep === 'questions' && 'Tell us about your current wellness routine'}
            {currentStep === 'processing' && statusMessage}
            {currentStep === 'summary' && 'Your personalized wellness journey'}
          </p>
        </div>

        {/* Step 1: Focus Areas */}
        {currentStep === 'selection' && (
          <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-10">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              const isSelected = selectedAreas.includes(area.id);
              
              return (
                <button
                  key={area.id}
                  onClick={() => toggleArea(area.id)}
                  className={`group relative rounded-3xl p-6 lg:p-8 transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#6B9B8E]/20 to-[#4A7C6F]/20 border-2 border-[#6B9B8E]'
                      : 'bg-[#1A1A1A]/40 border-2 border-[#2D2640] hover:border-[#6B9B8E]/50'
                  }`}
                  style={{
                    boxShadow: isSelected ? '0 0 30px rgba(107, 155, 142, 0.2)' : 'none'
                  }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] scale-110'
                      : 'bg-[#252525] group-hover:bg-[#2D2D2D]'
                  }`}>
                    <Icon className={`w-8 h-8 lg:w-10 lg:h-10 ${
                      isSelected ? 'text-white' : 'text-gray-400 group-hover:text-[#6B9B8E]'
                    }`} />
                  </div>

                  {/* Label */}
                  <h3 
                    className={`text-xl lg:text-2xl mb-2 ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {area.label}
                  </h3>
                  <p 
                    className="text-sm text-gray-400"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {area.description}
                  </p>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#6B9B8E] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Questions */}
        {currentStep === 'questions' && generatedQuestions.length > 0 && (
          <div className="mb-10">
            {/* Question Counter */}
            <div className="text-center mb-8">
              <span 
                className="text-sm text-gray-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Question {currentQuestionIndex + 1} of {generatedQuestions.length}
              </span>
            </div>

            {/* Question */}
            <h3 
              className="text-2xl lg:text-3xl text-center text-white mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              {generatedQuestions[currentQuestionIndex].question}
            </h3>

            {/* Options */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {generatedQuestions[currentQuestionIndex].options.map((option, index) => {
                const currentQuestion = generatedQuestions[currentQuestionIndex];
                const isSelected = answers[currentQuestion.id] === option;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerQuestion(option)}
                    className={`w-full px-8 py-5 rounded-2xl transition-all duration-300 text-left group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#6B9B8E]/20 to-[#4A7C6F]/20 border-2 border-[#6B9B8E]'
                        : 'bg-[#1A1A1A]/40 border-2 border-[#2D2640] hover:border-[#6B9B8E]/50 hover:bg-[#252525]'
                    }`}
                    style={{
                      boxShadow: isSelected ? '0 0 30px rgba(107, 155, 142, 0.15)' : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span 
                        className={`text-base lg:text-lg ${
                          isSelected ? 'text-white font-medium' : 'text-gray-300'
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {option}
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#6B9B8E] flex items-center justify-center flex-shrink-0 ml-4">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Processing State */}
        {currentStep === 'processing' && (
          <div className="mb-10">
            {/* Central Pulsing Loader */}
            <div className="flex justify-center items-center mb-12">
              <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] opacity-30 animate-ping"></div>
                {/* Middle ring */}
                <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-[#6B9B8E]/40 animate-pulse"></div>
                {/* Core circle */}
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center shadow-2xl"
                  style={{
                    boxShadow: '0 0 60px rgba(107, 155, 142, 0.5), 0 0 120px rgba(107, 155, 142, 0.2)'
                  }}
                >
                  <div className="w-24 h-24 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                </div>
              </div>
            </div>

            {/* Scanning Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12 max-w-xl mx-auto">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;
                const isSelected = selectedAreas.includes(area.id);
                
                return (
                  <div
                    key={area.id}
                    className={`relative rounded-3xl p-6 bg-[#1A1A1A]/20 backdrop-blur-sm border transition-all duration-500 ${
                      isSelected 
                        ? 'border-[#6B9B8E]/50 opacity-100' 
                        : 'border-[#2D2640]/30 opacity-40'
                    }`}
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Scanning animation overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <div 
                          className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#6B9B8E]/20 to-transparent"
                          style={{
                            animation: 'scan 3s ease-in-out infinite',
                            animationDelay: `${index * 0.5}s`
                          }}
                        ></div>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      isSelected 
                        ? 'bg-gradient-to-br from-[#6B9B8E]/30 to-[#4A7C6F]/30' 
                        : 'bg-[#252525]'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-[#6B9B8E]' : 'text-gray-600'}`} />
                    </div>

                    {/* Label */}
                    <p 
                      className={`text-center text-sm ${isSelected ? 'text-white' : 'text-gray-600'}`}
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                      {area.label}
                    </p>

                    {/* Scanning indicator */}
                    {isSelected && (
                      <div className="mt-3 flex justify-center">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6B9B8E] animate-pulse" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6B9B8E] animate-pulse" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6B9B8E] animate-pulse" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status Ticker */}
            <div className="text-center">
              <div className="inline-block px-6 py-3 rounded-full bg-[#1A1A1A]/40 border border-[#2D2640]">
                <p 
                  className="text-[#6B9B8E] text-sm font-medium transition-all duration-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  key={statusMessage}
                >
                  {statusMessage}
                </p>
              </div>
            </div>

            <style>{`
              @keyframes scan {
                0% {
                  top: -4rem;
                }
                50% {
                  top: 100%;
                }
                100% {
                  top: -4rem;
                }
              }
            `}</style>
          </div>
        )}

        {/* Step 3: Summary */}
        {currentStep === 'summary' && (
          <div className="mb-10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 
                className="text-3xl lg:text-4xl text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Your Personalized Path
              </h3>
              <p 
                className="text-gray-400 text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Based on your selections, here's your wellness journey
              </p>
            </div>

            {/* Focus Areas Summary */}
            <div className="mb-8">
              <h4 
                className="text-xl text-white mb-4 text-center"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Your Focus Areas
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {selectedAreas.map(areaId => {
                  const area = focusAreas.find(a => a.id === areaId);
                  const Icon = area?.icon;
                  return (
                    <div 
                      key={areaId}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6B9B8E]/20 to-[#4A7C6F]/20 border border-[#6B9B8E]/50"
                    >
                      {Icon && <Icon className="w-4 h-4 text-[#6B9B8E]" />}
                      <span 
                        className="text-white text-sm"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                      >
                        {area?.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Answers Summary */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {generatedQuestions.map((question) => {
                const answer = answers[question.id];
                if (!answer) return null;

                return (
                  <div 
                    key={question.id}
                    className="bg-[#1A1A1A]/40 border border-[#2D2640] rounded-2xl p-5"
                  >
                    <p 
                      className="text-sm text-gray-500 mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {question.question}
                    </p>
                    <p 
                      className="text-white font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {answer}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Next Steps Preview */}
            <div className="mt-10 p-6 bg-gradient-to-br from-[#6B9B8E]/10 to-[#4A7C6F]/10 border border-[#6B9B8E]/30 rounded-2xl">
              <h4 
                className="text-xl text-white mb-3 text-center"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                What's Next?
              </h4>
              <p 
                className="text-gray-400 text-center text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We'll match you with expert coaches, create personalized wellness plans, and track your progress with intelligent insights tailored to your goals.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {currentStep !== 'processing' && !showSuccessAnimation && (
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            {currentStepNumber > 1 && currentStep !== 'summary' && (
              <button
                onClick={handleBack}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A1A1A]/60 border border-[#2D2640] text-white hover:bg-[#252525] transition-all"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep === 'selection' ? handleContinueClick : handleComplete}
              className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white font-medium hover:shadow-xl hover:shadow-[#6B9B8E]/30 transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {currentStep === 'summary' ? 'Complete & Enter Dashboard' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
