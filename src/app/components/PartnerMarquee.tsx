export function PartnerMarquee() {
  const partners = [
    'Stanford Medicine',
    'Mayo Clinic',
    'Cleveland Clinic',
    'Johns Hopkins',
    'MIT Media Lab',
    'Harvard Medical',
    'UCSF Health',
    'NYU Langone'
  ];

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-marquee">
        {/* First set */}
        {partners.map((partner, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 mx-8 text-gray-500 font-medium whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {partner}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {partners.map((partner, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 mx-8 text-gray-500 font-medium whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {partner}
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0D0D0D] to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0D0D0D] to-transparent pointer-events-none"></div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
