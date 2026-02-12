export function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative h-px">
        {/* Base line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2D2640] to-transparent"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6B9B8E]/30 to-transparent blur-sm"></div>
        
        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-[#6B9B8E] shadow-lg shadow-[#6B9B8E]/50"></div>
        </div>
      </div>
    </div>
  );
}
