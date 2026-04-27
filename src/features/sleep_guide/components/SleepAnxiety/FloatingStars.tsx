const floaters = [
  { left: '20%', size: 9, duration: 7, delay: 0 },
  { left: '50%', size: 8, duration: 6, delay: 2 },
  { left: '75%', size: 11, duration: 9, delay: 1 },
  { left: '35%', size: 10, duration: 8, delay: 3.5 },
];

const FloatingStars = () => (
  <>
    {floaters.map((s, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          bottom: 70,
          left: s.left,
          fontSize: s.size,
          color: '#B5D4F4',
          animation: `floatUp ${s.duration}s linear infinite`,
          animationDelay: `${s.delay}s`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        ★
      </span>
    ))}
  </>
);

export default FloatingStars;
