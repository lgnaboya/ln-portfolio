import { useEffect, useRef, useState } from "react";
import GameProjectCard3D from "./GameProjectCard3D";

interface ProjectLink {
  label: string;
  url: string;
}

interface GameProject {
  title: string;
  date: string;
  description: string;
  features: string[];
  links?: ProjectLink[];
  imageBackground: string;
}

interface CircularGallery3DProps {
  projects: GameProject[];
}

const CircularGallery3D = ({ projects }: CircularGallery3DProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (activeIndex + 1) % projects.length;

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Swipe / Drag Controls ---
  const startDrag = (x: number) => setDragStart(x);
  const moveDrag = (x: number) => {
    if (dragStart !== null) setDragOffset(x - dragStart);
  };
  const endDrag = () => {
    if (dragStart !== null) {
      if (dragOffset > 100) {
        setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
      } else if (dragOffset < -100) {
        setActiveIndex((i) => (i + 1) % projects.length);
      }
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const handleCardClick = (index: number) => {
    if (Math.abs(dragOffset) < 10) setActiveIndex(index);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700px] md:h-[700px] sm:h-[550px] overflow-hidden select-none"
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={endDrag}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* LEFT CARD */}
        {!isMobile && (
          <div
            className="absolute top-1/2 left-1/2 w-72 h-[500px] transition-all duration-700 ease-out hover:scale-95 cursor-pointer"
            style={{
              transform: `translate(-170%, -50%) rotateY(35deg) scale(0.85) translateZ(-200px)`,
              zIndex: 1,
              opacity: 0.6,
              filter: "blur(1px)",
            }}
            onClick={() => handleCardClick(prevIndex)}
          >
            <GameProjectCard3D {...projects[prevIndex]} />
          </div>
        )}

        {/* CENTER CARD */}
        <div
          className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-out ${
            isMobile ? "w-64 h-[440px]" : "w-80 h-[520px]"
          }`}
          style={{
            transform: `translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(${
              isMobile ? "60px" : "120px"
            })`,
            zIndex: 5,
            opacity: 1,
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <GameProjectCard3D {...projects[activeIndex]} />
        </div>

        {/* RIGHT CARD */}
        {!isMobile && (
          <div
            className="absolute top-1/2 left-1/2 w-72 h-[500px] transition-all duration-700 ease-out hover:scale-95 cursor-pointer"
            style={{
              transform: `translate(70%, -50%) rotateY(-35deg) scale(0.85) translateZ(-200px)`,
              zIndex: 1,
              opacity: 0.6,
              filter: "blur(1px)",
            }}
            onClick={() => handleCardClick(nextIndex)}
          >
            <GameProjectCard3D {...projects[nextIndex]} />
          </div>
        )}
      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(${
            isMobile ? "60px" : "120px"
          }) translateY(0px); }
          50% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(${
            isMobile ? "60px" : "120px"
          }) translateY(-12px); }
          100% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(${
            isMobile ? "60px" : "120px"
          }) translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default CircularGallery3D;
