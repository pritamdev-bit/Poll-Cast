import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-lime-500 flex items-center justify-center">
      <div className="relative select-none">
        {/* Stacked shadow layers */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="absolute text-8xl md:text-[12rem] font-black tracking-tighter transition-all duration-300"
            style={{
              top: `${(3 - i) * 8}px`,
              left: `${(3 - i) * 8}px`,
              color: i === 3 ? "#000" : "transparent",
              WebkitTextStroke: i === 3 ? "none" : "4px #000",
              opacity: activeIndex === i ? 1 : 0.15,
            }}
          >
            WAIT
          </span>
        ))}
        {/* Base layer */}
        <span className="relative text-8xl md:text-[12rem] font-black tracking-tighter text-transparent invisible">
          WAIT
        </span>
      </div>
    </main>
  );
}
