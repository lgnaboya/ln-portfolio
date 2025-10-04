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
  const [targetRotation, setTargetRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const angleStep = 360 / projects.length;
  const radius = 400; // Smaller radius to show 3 cards

  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        // Snap to nearest card
        const diff = targetRotation - rotation;
        if (Math.abs(diff) > 0.5) {
          setRotation((prev) => prev + diff * 0.1);
          animationRef.current = requestAnimationFrame(animate);
        } else if (Math.abs(velocity) > 0.01) {
          setRotation((prev) => prev + velocity);
          setVelocity((prev) => prev * 0.95);
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, isDragging, rotation, targetRotation]);

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
    // Snap to nearest card
    const nearestAngle = Math.round(rotation / angleStep) * angleStep;
    setTargetRotation(nearestAngle);
    setVelocity(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.1;
    setRotation((prev) => prev + delta);
    setVelocity(delta * 0.5);
    
    // Snap to nearest card after wheel
    setTimeout(() => {
      const nearestAngle = Math.round((rotation + delta) / angleStep) * angleStep;
      setTargetRotation(nearestAngle);
      setVelocity(0);
    }, 100);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[700px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
            
            // Calculate distance from center (0 is center, increases as it moves away)
            const normalizedAngle = ((angle - rotation) % 360 + 360) % 360;
            const distanceFromCenter = Math.min(normalizedAngle, 360 - normalizedAngle);
            
            // Scale: 1 at center, smaller when further away
            const scale = 1 - (distanceFromCenter / 360) * 0.3;
            
            // Opacity: 1 at center, fades on sides
            const opacity = 1 - (distanceFromCenter / 180) * 0.5;
            
            // Blur for depth effect
            const blur = distanceFromCenter / 60;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-72 h-[500px] transition-all duration-300"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
              >
                <GameProjectCard3D {...project} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <div className="text-4xl text-primary/30 animate-pulse">‹</div>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
        <div className="text-4xl text-primary/30 animate-pulse">›</div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center space-y-2 pointer-events-none">
        <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
          <span>← Drag to explore →</span>
        </p>
      </div>
    </div>
  );
};

export default CircularGallery3D;
