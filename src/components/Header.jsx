import { useState, useEffect } from "react";

export const Header = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setTimeout(() => setStep(1), 600);
    setTimeout(() => setStep(2), 1600);
    setTimeout(() => setStep(3), 2200);
  }, []);

  const Pizzy = "Pizzy";

  return (
    <div
      className={`h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${
        step === 3 ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div
        className={` flex items-center justify-center text-xl
        transition-all duration-700 
        ${
          step === 1
            ? "opacity-100 scale-[5]"
            : step === 2
            ? "-translate-x-[37vw] scale-[5]"
            : step === 3
            ? "-translate-x-[46vw] -translate-y-[45vh] scale-100 text-white"
            : " scale-[5] opacity-10"
        }`}
      >
        {Pizzy.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block opacity-0 animate-fade"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
