import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";

export const Home = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setTimeout(() => setStep(3), 2200);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[url('./assets/background/test.jpg')] bg-cover -z-20`}
    >
      <Header />
      <Logo />

      <div
        className={`absolute bottom-[2vw] left-[10vw] right-[10vw] w-auto h-[5vh] rounded-lg border border-white hover:h-[10vh] duration-300 cursor-pointer
        ${step === 3 ? "opacity-100" : "opacity-0"}
        `}
      ></div>
    </div>
  );
};
