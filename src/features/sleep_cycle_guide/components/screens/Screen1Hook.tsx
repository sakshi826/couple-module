interface Props { onNext: () => void }

const Screen1Hook = ({ onNext }: Props) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <div className="text-5xl mb-4">😫</div>

    <h1 className="text-xl font-semibold mb-4" style={{ color: "#1a2a4a" }}>
      Ever sleep 8 hours and still feel terrible?
    </h1>

    <div className="text-sm leading-relaxed mb-5" style={{ color: "#3a5070" }}>
      <p className="mb-2">
        It's not about <span className="font-bold" style={{ color: "#4a7ee8" }}>how long</span> you sleep.
      </p>
      <p className="mb-2">
        It's about <span className="font-bold" style={{ color: "#7050d0" }}>where</span> in your sleep cycle you wake up.
      </p>
      <p>One thing changes when you understand this — everything.</p>
    </div>

    <div className="insight-card w-full p-3 mb-5 text-left">
      <p className="text-xs italic" style={{ color: "#3a5070" }}>
        💡 Your brain is actually more active during REM sleep than when you're fully awake!
      </p>
    </div>

    <div className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "#8a9cbc" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      Takes 3 minutes · lasts a lifetime
    </div>

    <button className="sleep-cta" onClick={onNext}>
      Wait, really? Tell me more →
    </button>
  </div>
);

export default Screen1Hook;
