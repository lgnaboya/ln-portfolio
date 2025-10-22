import { useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (activeIndex + 1) % projects.length;

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.clientX - dragStart);
    }
  };

  const handleMouseUp = () => {
    if (dragStart !== null) {
      if (dragOffset > 100) {
        // Swipe right → previous
        setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
      } else if (dragOffset < -100) {
        // Swipe left → next
        setActiveIndex((i) => (i + 1) % projects.length);
      }
    }
    setDragStart(null);
    setDragOffset(0);
  };

  // Handle click on side cards
  const handleCardClick = (index: number) => {
    // Prevent accidental click when dragging
    if (Math.abs(dragOffset) < 10) {
      setActiveIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Left card */}
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

        {/* Center card (floating pop-out) */}
        <div
          className="absolute top-1/2 left-1/2 w-80 h-[520px] transition-all duration-700 ease-out cursor-default"
          style={{
            transform: `translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(120px)`,
            zIndex: 5,
            opacity: 1,
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <GameProjectCard3D {...projects[activeIndex]} />
        </div>

        {/* Right card */}
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
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(120px) translateY(0px); }
          50% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(120px) translateY(-12px); }
          100% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05) translateZ(120px) translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default CircularGallery3D;
