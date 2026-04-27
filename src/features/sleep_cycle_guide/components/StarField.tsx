const stars = [
  { top: "5%", left: "10%", size: 2, delay: "0s" },
  { top: "8%", left: "75%", size: 3, delay: "0.4s" },
  { top: "12%", left: "45%", size: 2, delay: "1.1s" },
  { top: "3%", left: "30%", size: 3, delay: "1.8s" },
  { top: "18%", left: "85%", size: 2, delay: "0.7s" },
  { top: "22%", left: "20%", size: 2, delay: "2.2s" },
  { top: "15%", left: "60%", size: 3, delay: "1.5s" },
  { top: "25%", left: "50%", size: 2, delay: "0.3s" },
];

const StarField = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    {stars.map((s, i) => (
      <div
        key={i}
        className="star-dot"
        style={{
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          animationDelay: s.delay,
          animationDuration: `${3 + i * 0.4}s`,
        }}
      />
    ))}
  </div>
);

export default StarField;
