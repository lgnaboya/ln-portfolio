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
  imageGradient: string;
}

interface CircularGallery3DProps {
  projects: GameProject[];
}

const CircularGallery3D = ({ projects }: CircularGallery3DProps) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const angleStep = 360 / projects.length;
  const radius = 600; // Distance from center

  useEffect(() => {
    const animate = () => {
      if (!isDragging && Math.abs(velocity) > 0.01) {
        setRotation((prev) => prev + velocity);
        setVelocity((prev) => prev * 0.95); // Damping
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setVelocity(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation((prev) => prev + deltaX * 0.3);
    setVelocity(deltaX * 0.3);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setRotation((prev) => prev + e.deltaY * 0.1);
    setVelocity(e.deltaY * 0.05);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[800px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* 3D Scene Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Carousel Container */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {projects.map((project, index) => {
            const angle = angleStep * index;
            const x = Math.sin((angle * Math.PI) / 180) * radius;
            const z = Math.cos((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-80 h-[600px]"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <GameProjectCard3D {...project} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center space-y-2 pointer-events-none">
        <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
          Drag or scroll to rotate the gallery
        </p>
      </div>
    </div>
  );
};

export default CircularGallery3D;
