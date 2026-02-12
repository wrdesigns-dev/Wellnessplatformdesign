import { useEffect, useState } from 'react';

export function VitalityGraph() {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock data points for the line graph
  const dataPoints = [45, 52, 48, 65, 72, 68, 78, 85, 82, 88, 92];
  const maxValue = 100;

  return (
    <div 
      className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#2D2640] rounded-3xl p-6 relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6B9B8E]/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Your Vitality Score</p>
            <h3 
              className="text-4xl text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
            >
              92<span className="text-2xl text-gray-400">/100</span>
            </h3>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
              <span>↑</span>
              <span>+12%</span>
            </div>
            <p className="text-xs text-gray-500">vs. last month</p>
          </div>
        </div>

        {/* Mini Line Graph */}
        <div className="h-24 relative">
          <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={100 - y}
                x2="300"
                y2={100 - y}
                stroke="#2D2640"
                strokeWidth="0.5"
                opacity="0.5"
              />
            ))}

            {/* Area gradient fill */}
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6B9B8E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area */}
            <path
              d={`
                M 0 100
                ${dataPoints.map((value, index) => {
                  const x = (index / (dataPoints.length - 1)) * 300;
                  const y = 100 - (value / maxValue) * 100;
                  return `L ${x} ${y}`;
                }).join(' ')}
                L 300 100
                Z
              `}
              fill="url(#areaGradient)"
              style={{
                opacity: animationProgress / 100,
                transition: 'opacity 1s ease-out'
              }}
            />

            {/* Line */}
            <path
              d={`
                M ${dataPoints.map((value, index) => {
                  const x = (index / (dataPoints.length - 1)) * 300;
                  const y = 100 - (value / maxValue) * 100;
                  return `${x} ${y}`;
                }).join(' L ')}
              `}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: 500 - (animationProgress / 100) * 500,
                transition: 'stroke-dashoffset 1.5s ease-out'
              }}
            />

            <defs>
              <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#6B9B8E" />
                <stop offset="100%" stopColor="#4A7C6F" />
              </linearGradient>
            </defs>

            {/* Points */}
            {dataPoints.map((value, index) => {
              const x = (index / (dataPoints.length - 1)) * 300;
              const y = 100 - (value / maxValue) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#6B9B8E"
                  opacity={animationProgress / 100}
                  style={{
                    transition: `opacity 1s ease-out ${index * 0.1}s`
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>Jan</span>
          <span>Feb</span>
        </div>
      </div>
    </div>
  );
}