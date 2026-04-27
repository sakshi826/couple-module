const stars = [
  { top: '8%', left: '15%', size: 8, duration: 2.5, delay: 0 },
  { top: '12%', left: '55%', size: 7, duration: 3, delay: 0.8 },
  { top: '6%', left: '80%', size: 9, duration: 2, delay: 1.5 },
  { top: '18%', left: '35%', size: 10, duration: 3.5, delay: 0.3 },
  { top: '10%', left: '70%', size: 7, duration: 2.8, delay: 2 },
];

const TwinklingStars = () => (
  <>
    {stars.map((s, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          fontSize: s.size,
          color: '#B5D4F4',
          animation: `twinkle ${s.duration}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
          zIndex: 0,
        }}
      >
        ★
      </span>
    ))}
  </>
);

export default TwinklingStars;
