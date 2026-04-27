const BrainIllustration = () => (
  <svg width="72" height="60" viewBox="0 0 72 60" fill="none" style={{ flexShrink: 0 }}>
    {/* Brain shape */}
    <path
      d="M36 8C24 8 16 16 16 26C16 36 24 44 36 44C48 44 56 36 56 26C56 16 48 8 36 8Z"
      fill="#185FA5"
      opacity="0.5"
    />
    {/* Neural pathways */}
    <path d="M24 22C28 18 32 24 36 20C40 16 44 22 48 20" stroke="#378ADD" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <path d="M22 30C26 26 30 32 36 28C42 24 46 30 50 28" stroke="#378ADD" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <path d="M26 36C30 32 34 38 38 34C42 30 46 36 48 34" stroke="#378ADD" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    {/* Alert circle */}
    <circle cx="48" cy="14" r="6" fill="#BA7517" opacity="0.3" />
    <text x="48" y="17" textAnchor="middle" fill="#FAC775" fontSize="10" fontWeight="bold">!</text>
    {/* Heartbeat line */}
    <polyline points="8,52 20,52 24,46 28,56 32,48 36,52 44,52" stroke="#378ADD" strokeWidth="1.5" fill="none" />
    <line x1="44" y1="52" x2="64" y2="52" stroke="#1E3A5F" strokeWidth="1.5" />
  </svg>
);

export default BrainIllustration;
