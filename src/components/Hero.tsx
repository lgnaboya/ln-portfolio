import { useState, useRef } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
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

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
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
        {/* 3D Draggable Lanyard Profile Card */}
        <div className="flex justify-center md:justify-end animate-fade-in">
          <div 
            className="relative pt-24"
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            {/* Thick Lanyard String - ID style */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-24">
              {/* Main lanyard ribbon */}
              <div className="w-full h-full bg-gradient-to-b from-primary/70 via-primary/50 to-primary/30 rounded-sm shadow-lg">
                {/* Woven texture pattern */}
                <div className="absolute inset-0 bg-repeat-y opacity-40" 
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(90deg, 
                        transparent, 
                        transparent 2px, 
                        hsl(var(--primary) / 0.4) 2px, 
                        hsl(var(--primary) / 0.4) 3px
                      ),
                      repeating-linear-gradient(0deg, 
                        transparent, 
                        transparent 3px, 
                        hsl(var(--primary) / 0.2) 3px, 
                        hsl(var(--primary) / 0.2) 4px
                      )
                    `,
                  }}
                />
                {/* Edge highlights */}
                <div className="absolute left-0 w-[1px] h-full bg-gradient-to-b from-primary to-transparent" />
                <div className="absolute right-0 w-[1px] h-full bg-gradient-to-b from-primary to-transparent" />
              </div>
            </div>
            
            {/* Lanyard Clip/Hook */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-5 bg-muted-foreground/80 border-2 border-border rounded-md shadow-lg">
              {/* Clip detail */}
              <div className="absolute inset-1 border border-border/30 rounded-sm" />
            </div>
            
            {/* 3D Card Container */}
            <div 
              style={{ 
                perspective: '1000px',
              }}
            >
              <div
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="relative bg-gradient-card backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow duration-300"
              >
                {/* Card shine effect */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, 
                      transparent 0%, 
                      hsl(var(--primary) / 0.1) ${50 + rotation.y * 2}%, 
                      transparent 100%)`,
                  }}
                />
                
                <div className="flex flex-col items-center gap-4 relative" style={{ transform: 'translateZ(20px)' }}>
                  {/* Hole punch at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border border-border shadow-inner" />
                  
                  <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg">
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
