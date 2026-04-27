const BedIllustration = () => (
  <svg width="72" height="60" viewBox="0 0 72 60" fill="none" style={{ flexShrink: 0 }}>
    {/* Bed frame */}
    <rect x="4" y="30" width="64" height="20" rx="4" fill="#1E3A5F" />
    {/* Pillow */}
    <rect x="8" y="26" width="20" height="12" rx="4" fill="#185FA5" opacity="0.7" />
    {/* Person head */}
    <circle cx="18" cy="22" r="7" fill="#FAC775" />
    {/* Person body */}
    <rect x="22" y="30" width="30" height="10" rx="3" fill="#378ADD" opacity="0.5" />
    {/* Eye (open) */}
    <circle cx="20" cy="21" r="1.5" fill="#112240" />
    {/* Thought bubble */}
    <circle cx="40" cy="10" r="12" fill="#0C447C" opacity="0.8" />
    <circle cx="32" cy="18" r="3" fill="#0C447C" opacity="0.6" />
    <circle cx="28" cy="22" r="2" fill="#0C447C" opacity="0.4" />
    {/* Clock face */}
    <circle cx="40" cy="10" r="7" stroke="#378ADD" strokeWidth="1" fill="none" />
    {/* Clock hands */}
    <line x1="40" y1="10" x2="40" y2="5" stroke="#B5D4F4" strokeWidth="1" strokeLinecap="round" />
    <line x1="40" y1="10" x2="44" y2="12" stroke="#B5D4F4" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export default BedIllustration;
