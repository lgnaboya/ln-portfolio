import { useState, useRef } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; elemX: number; elemY: number }>({
    startX: 0,
    startY: 0,
    elemX: 0,
    elemY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemX: position.x,
      elemY: position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.elemX + deltaX,
      y: dragRef.current.elemY + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Draggable Lanyard Profile Card */}
        <div className="flex justify-center md:justify-end animate-fade-in">
          <div className="relative">
            {/* Lanyard String */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-muted to-transparent"></div>
            
            {/* ID Card */}
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
              className="relative bg-gradient-card backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow duration-300"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-primary/30">
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground">Loudett Gleac Naboya</h3>
                  <p className="text-sm text-muted-foreground">UI/UX Designer & Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ✨ Crafting user-centered experiences
              </span>
              <br />
              <span className="text-foreground">for games and the web.</span>
            </h1>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I design and build user-centered digital experiences for games and web applications. 
                With a balance of creativity and technical expertise, I craft intuitive, engaging, and impactful products.
              </p>
              
              <p>
                Driven by curiosity and continuous learning, I thrive in dynamic environments where I can 
                explore new tools, solve complex problems, and deliver solutions that provide real value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
