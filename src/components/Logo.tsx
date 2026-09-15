export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Top Left Triangle */}
      <polygon points="18,18 40,18 28,38" />
      
      {/* Top Right Triangle */}
      <polygon points="82,18 60,18 72,38" />
      
      {/* Bottom Center Triangle */}
      <polygon points="50,45 35,75 65,75" />
      
      {/* Left Swoosh */}
      <path d="M 15 75 Q 35 30 55 25 L 45 15 Q 15 35 5 75 Z" />
      
      {/* Right Swoosh */}
      <path d="M 85 75 Q 65 30 45 25 L 55 15 Q 85 35 95 75 Z" />
      
      {/* Text: ABRAHAM */}
      <text 
        x="50" 
        y="95" 
        textAnchor="middle" 
        fontFamily="sans-serif" 
        fontWeight="600" 
        fontSize="16" 
        letterSpacing="2"
      >
        ABRAHAM
      </text>
    </svg>
  );
}
