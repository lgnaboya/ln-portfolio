import profilePhoto from "@/assets/profile-photo.jpg";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swingRotation, setSwingRotation] = useState(0);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
    lastTime: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    elemX: 0,
    elemY: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });
  const animationRef = useRef<number>();

  // Swinging physics animation
  useEffect(() => {
    if (isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      setPosition((prev) => {
        const newX = prev.x + velocity.x;
        const newY = prev.y + velocity.y;
        return { x: newX, y: newY };
      });

      setVelocity((prev) => ({
        x: prev.x * 0.95, // damping
        y: prev.y * 0.95,
      }));

      setSwingRotation((prev) => {
        const target = velocity.x * -0.5;
        return prev + (target - prev) * 0.1;
      });

      // Spring back to center
      setPosition((prev) => ({
        x: prev.x * 0.95,
        y: prev.y * 0.95,
      }));

      if (
        Math.abs(velocity.x) > 0.1 ||
        Math.abs(velocity.y) > 0.1 ||
        Math.abs(position.x) > 0.1 ||
        Math.abs(position.y) > 0.1
      ) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, isDragging, position.x, position.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const now = Date.now();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemX: position.x,
      elemY: position.y,
      lastTime: now,
      lastX: e.clientX,
      lastY: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const now = Date.now();
    const dt = now - dragRef.current.lastTime;

    if (dt > 0) {
      const vx = ((e.clientX - dragRef.current.lastX) / dt) * 16;
      const vy = ((e.clientY - dragRef.current.lastY) / dt) * 16;
      setVelocity({ x: vx, y: vy });
    }

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.elemX + deltaX,
      y: dragRef.current.elemY + deltaY,
    });

    dragRef.current.lastTime = now;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pb-10"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Draggable Lanyard Profile Card */}
        <div className="flex justify-center md:justify-end animate-fade-in">
          <div
            className="relative pt-32"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${swingRotation}deg)`,
              transformOrigin: "top center",
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {/* Lanyard String - Woven fabric style */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-32">
              {/* Main lanyard ribbon with gradient */}
              <div className="relative w-full h-full bg-gradient-to-b from-primary via-primary/80 to-primary/60 rounded-sm shadow-xl overflow-hidden">
                {/* Woven fabric texture */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(90deg,
                        hsl(var(--primary) / 0.8) 0px,
                        hsl(var(--primary) / 0.6) 2px,
                        hsl(var(--primary) / 0.8) 4px
                      ),
                      repeating-linear-gradient(0deg,
                        transparent 0px,
                        hsl(0 0% 100% / 0.1) 2px,
                        transparent 4px
                      )
                    `,
                  }}
                />
                {/* Center stitching line */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-primary-foreground/20" />
                {/* Edge highlights for 3D effect */}
                <div className="absolute left-0 w-[2px] h-full bg-gradient-to-r from-primary-foreground/30 to-transparent" />
                <div className="absolute right-0 w-[2px] h-full bg-gradient-to-l from-black/30 to-transparent" />
              </div>
            </div>

            {/* Metal Lanyard Clip */}
            <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10">
              <div className="relative w-10 h-6">
                {/* Clip body */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-md shadow-lg border border-zinc-500">
                  <div className="absolute inset-[2px] bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-sm" />
                  {/* Clip opening */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-3 bg-background/50 rounded-sm" />
                </div>
                {/* Clip shine */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-md pointer-events-none" />
              </div>
            </div>

            {/* ID Badge Card */}
            <div
              style={{
                perspective: "1000px",
              }}
            >
              <div
                style={{
                  transformStyle: "preserve-3d",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                className="relative bg-gradient-card backdrop-blur-xl border-2 border-[var(--glass-border)] rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow duration-500 w-80"
              >
                {/* Top accent bar - like real ID badges */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-primary rounded-t-3xl" />

                {/* Hole punch at top for lanyard */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-border shadow-inner z-20" />

                {/* Card content */}
                <div
                  className="flex flex-col items-center gap-6 relative pt-4"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {/* Profile Photo - larger and more prominent */}
                  <div className="w-56 h-56 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl ring-2 ring-primary/10">
                    <img
                      src={profilePhoto}
                      alt="Profile Photo - Loudette Glea Naboya"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Info section */}
                  <div className="text-center space-y-2 w-full">
                    <h3 className="text-xl font-bold text-foreground pt-5">
                      Loudette Glea Naboya
                    </h3>
                    <p className="text-base text-cyan-500 font-medium">
                      Mobile & Web Designer
                    </p>

                    {/* Badge details */}
                    <div className="pt-4 mt-4 border-t border-border/50 space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {" "}
                      </p>
                      <p className="text-xs text-muted-foreground/60"> </p>
                    </div>
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="space-y-8 pt-40">
            <h1 className="text-lg text-center md:text-lg font-bold leading-tight md:text-justify">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ⦿ Designing and building user-centered digital experiences
              </span>
              <span className="text-foreground font-medium">
                {" "}
                for web and mobile.
              </span>
            </h1>

            <div className="space-y-4 text-muted-foreground text-md leading-relaxed text-justify">
              <p>
                I design and build user-centered digital products that balance
                creativity with technical precision. From responsive websites
                and interactive platforms to mobile applications and games, my
                work focuses on creating intuitive, engaging, and impactful user
                experiences.
              </p>

              <p>
                Driven by curiosity and continuous learning, I thrive in dynamic
                environments where I explore new tools, solve complex problems,
                and transform ideas into functional solutions that deliver
                real-world value.
              </p>
            </div>

            {/* View My Work Button */}
            <div className="pt-4 flex justify-center">
              <a
                href="#projects"
                className="group flex items-center gap-2 text-gray-600 font-semibold text-medium hover:text-primary/80 transition-colors"
              >
                View My Work
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
