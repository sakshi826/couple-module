import { useMemo } from "react";

interface FloatingHeartsProps {
  colors: string[];
}

const FloatingHearts = ({ colors }: FloatingHeartsProps) => {
  const hearts = useMemo(() => {
    const sizes = [8, 10, 12, 14, 16];
    const lefts = [15, 30, 50, 70, 85];
    const durations = [6, 7, 7.5, 8, 9];
    const delays = [0, 0.8, 1.6, 2.5, 3.5];

    return Array.from({ length: 5 }, (_, i) => ({
      size: sizes[i],
      left: lefts[i],
      color: colors[i % colors.length],
      duration: durations[i],
      delay: delays[i],
    }));
  }, [colors]);

  return (
    <>
      {hearts.map((h, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            bottom: 60,
            left: `${h.left}%`,
            fontSize: h.size,
            color: h.color,
            opacity: 0,
            zIndex: 0,
            animation: `floatHeart ${h.duration}s ${h.delay}s ease-in-out infinite`,
            pointerEvents: "none",
          }}
        >
          ♥
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;
