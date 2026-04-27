interface ProgressDotsProps {
  current: number;
  total: number;
}

const ProgressDots = ({ current, total }: ProgressDotsProps) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-all duration-500 ${
            i < current
              ? "bg-primary scale-110"
              : "bg-border"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
