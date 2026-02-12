import { useState, useEffect } from 'react';
import { X, Check, Calendar, MessageCircle } from 'lucide-react';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSession: () => void;
  expertName: string;
  specialty: string;
}

export function BookingConfirmationModal({ isOpen, onClose, onBookSession, expertName, specialty }: BookingConfirmationModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-2xl"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-2xl bg-[#151515]/70 backdrop-blur-3xl rounded-[40px] border border-[#2D2640] p-8 lg:p-12 shadow-2xl transition-all duration-500 ${
          isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{
          boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.15), 0 0 60px rgba(139, 92, 246, 0.2), 0 30px 60px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Lavender Glow Effect */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1A1A1A]/60 backdrop-blur-md border border-[#2D2640] flex items-center justify-center hover:bg-[#252525] transition-colors text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Checkmark Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] opacity-30 animate-ping"></div>
            
            {/* Middle ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-[#6B9B8E]/40 animate-pulse"></div>
            
            {/* Core circle with checkmark */}
            <div 
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: '0 0 60px rgba(107, 155, 142, 0.6), 0 0 120px rgba(107, 155, 142, 0.3)'
              }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h2 
          className="text-4xl lg:text-5xl text-center text-white mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          Session Confirmed.
        </h2>

        {/* Sub-headline */}
        <p 
          className="text-center text-gray-400 text-base lg:text-lg mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Your request has been sent to {expertName}. You will receive a calendar invitation and a confirmation message in your inbox shortly.
        </p>

        {/* Summary Card */}
        <div 
          className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl p-6 lg:p-8 mb-8 relative overflow-hidden"
          style={{
            boxShadow: '0 0 0 1px rgba(107, 155, 142, 0.1), 0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Subtle green glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#6B9B8E]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            {/* Coach */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6B9B8E]/30 to-[#4A7C6F]/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-[#6B9B8E]" />
              </div>
              <div className="flex-1">
                <p 
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Coach
                </p>
                <p 
                  className="text-white text-lg font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {expertName}
                </p>
              </div>
            </div>

            {/* Topic */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6B9B8E]/30 to-[#4A7C6F]/30 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-[#6B9B8E]" />
              </div>
              <div className="flex-1">
                <p 
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Topic
                </p>
                <p 
                  className="text-white text-lg font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {specialty}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6B9B8E]/30 to-[#4A7C6F]/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-[#6B9B8E]" />
              </div>
              <div className="flex-1">
                <p 
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Status
                </p>
                <p 
                  className="text-[#6B9B8E] text-lg font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Message Sent Successfully
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <button
            onClick={handleClose}
            className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white font-medium hover:shadow-xl hover:shadow-[#6B9B8E]/30 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Return to Dashboard
          </button>
          <button
            onClick={handleClose}
            className="flex-1 px-8 py-4 rounded-full bg-[#1A1A1A]/60 border border-[#2D2640] text-white hover:bg-[#252525] transition-all"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            Explore Resources
          </button>
        </div>
      </div>
    </div>
  );
}