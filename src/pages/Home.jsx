import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";

export const Home = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setTimeout(() => setStep(3), 2200);
  }, []);

  const images = [
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
    "https://picsum.photos/300/200?4",
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
    "https://picsum.photos/300/200?4",
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
    "https://picsum.photos/300/200?4",
  ];

  // const sliderRef = useRef(null);
  // const [isDown, setIsDown] = useState(false);
  // const startX = useRef(0);
  // const scrollLeft = useRef(0);

  // const handleMouseDown = (e) => {
  //   setIsDown(true);
  //   startX.current = e.pageX - sliderRef.current.offsetLeft;
  //   scrollLeft.current = sliderRef.current.scrollLeft;
  // };

  // const handleMouseLeave = () => setIsDown(false);
  // const handleMouseUp = () => setIsDown(false);

  // const handleMouseMove = (e) => {
  //   if (!isDown) return;

  //   const x = e.pageX - sliderRef.current.offsetLeft;
  //   const walk = (x - startX.current) * 2;

  //   sliderRef.current.scrollLeft = scrollLeft.current - walk;
  // };

  // useEffect(() => {
  //   const slider = sliderRef.current;
  
  //   const handleScroll = () => {
  //     if (slider.scrollLeft >= slider.scrollWidth / 2) {
  //       slider.scrollLeft = 0;
  //     }
  
  //     if (slider.scrollLeft <= 0) {
  //       slider.scrollLeft = slider.scrollWidth / 2;
  //     }
  //   };
  
  //   slider.addEventListener("scroll", handleScroll);
  
  //   return () => slider.removeEventListener("scroll", handleScroll);
  // }, []);

  const sliderRef = useRef(null);
  const pos = useRef(0);
  const speed = useRef(0.3);
  const isDown = useRef(false);
  const startX = useRef(0);

  const loopImages = [...images, ...images];

  useEffect(() => {
    const animate = () => {
      if (!isDown.current) {
        pos.current -= speed.current;
        if (pos.current <= -sliderRef.current.scrollWidth / 2) {
          pos.current = 0;
        }
        sliderRef.current.style.transform = `translateX(${pos.current}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
    
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    const walk = e.clientX - startX.current;
    pos.current += walk;
    startX.current = e.clientX;

    sliderRef.current.style.transform = `translateX(${pos.current}px)`;
  };

  return (
    <div
      className={`min-h-screen bg-[url('./assets/background/test.jpg')] bg-cover -z-20`}
    >
      <Header />
      <Logo />

      <div
        className={`group absolute flex items-center bottom-[2vw] left-[10vw] right-[10vw] 
        h-[6vh] rounded-lg border border-white hover:h-[12vh] 
        duration-500 overflow-hidden
        ${step === 3 ? "opacity-100" : "opacity-0"}`}
      >
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex no-scrollbar select-none h-full items-center cursor-pointer`}
        >
          {loopImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-60 h-full object-cover object-center flex-shrink-0 pointer-events-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
