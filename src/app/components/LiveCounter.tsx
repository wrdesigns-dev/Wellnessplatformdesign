import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface LiveCounterProps {
  label: string;
  targetValue: number;
  suffix?: string;
}

export function LiveCounter({ label, targetValue, suffix = '' }: LiveCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div 
      className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl p-6 relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Animated glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#6B9B8E]/20 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-[#6B9B8E]" />
          <p className="text-gray-400 text-sm">{label}</p>
        </div>
        <h3 
          className="text-4xl text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
        >
          {count.toLocaleString()}{suffix}
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>
    </div>
  );
}