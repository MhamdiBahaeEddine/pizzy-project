import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import video from "../assets/background/vid.mp4";

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
  ];

  const sliderRef = useRef(null);
  const videoRef = useRef(null);

  const pos = useRef(0);
  const autoSpeed = useRef(-0.6);
  const velocity = useRef(0);
  const isDown = useRef(false);
  const lastX = useRef(0);
  const moved = useRef(false);
  const currentIndexRef = useRef(-1);

  const loopImages = Array(200).fill(images).flat();
  const IMAGE_WIDTH = 240; // w-60
  const totalWidth = loopImages.length * IMAGE_WIDTH;

  useEffect(() => {
    pos.current = -totalWidth / 2; // to start from middle
  }, []);

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoaded = () => {
      setDuration(video.duration);
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  // Main animate loop
  useEffect(() => {
    const animate = () => {
      if (!sliderRef.current) return;

      if (!isDown.current) {
        // Auto scroll + inertia from drag
        pos.current += autoSpeed.current + velocity.current;
        velocity.current *= 0.95; // decay
      }

      // Keep pos reasonable
      const LIMIT = 20000;
      if (pos.current < -LIMIT) pos.current += LIMIT;
      if (pos.current > LIMIT) pos.current -= LIMIT;

      sliderRef.current.style.transform = `translateX(${pos.current}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Drag handlers
  const handleMouseDown = (e) => {
    isDown.current = true;
    moved.current = false;
    velocity.current = 0;
    lastX.current = e.clientX;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    moved.current = true;

    const dx = e.clientX - lastX.current;
    velocity.current = dx * 0.5; // inertia
    pos.current += dx;

    lastX.current = e.clientX;

    sliderRef.current.style.transform = `translateX(${pos.current}px)`;

    // Video sync
    if (!duration) return;
    const index = Math.floor(Math.abs(pos.current) / IMAGE_WIDTH) % images.length;

    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      const segmentDuration = duration / images.length;
      const startTime = index * segmentDuration;
      const video = videoRef.current;
      video.currentTime = startTime;
      video.play();
    }
  };

  return (
    <div className="min-h-screen -z-20">
      <Header />
      <Logo />

      <video
        ref={videoRef}
        src={video}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
      />

      <div
        className={`group absolute flex items-center bottom-[2vw] left-[10vw] right-[10vw] 
        h-[6vh] rounded-lg border border-white hover:h-[12vh] 
        duration-500 overflow-hidden
        ${step === 3 ? "opacity-100" : "opacity-0"}`}
      >
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          className="flex select-none h-full items-center cursor-pointer"
        >
          {loopImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-60 h-full object-cover flex-shrink-0 pointer-events-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};