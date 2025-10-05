import { useEffect, useRef, useState } from "react";
import CircularGallery3D from "./CircularGallery3D";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const progress =
        (scrollY - sectionTop + windowHeight) / (sectionHeight + windowHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const webProjects = [
    {
      title: "NoFace",
      date: "Anonymous Social | Recent",
      description:
        "Web-based anonymous chat platform enabling meaningful conversations through voice and text.",
      features: [
        "Built responsive UI in React",
        "Real-time messaging interface",
        "Conversation starter interactions",
        "Accessibility & privacy-first design",
        "Tech Stack: React, CSS/HTML, Express.js, ASP.NET",
      ],
      links: [{ label: "Figma Design", url: "#" }],
    },
    {
      title: "App-Based Rental Locker System",
      date: "May 2024",
      description:
        "Mobile application for seamless locker rental service with integrated payment processing.",
      features: [
        "Designed UI for mobile locker rental app",
        "Contributed to backend (booking + payment features)",
        "User-friendly booking system",
      ],
    },
    {
      title: "EXIS-INC Inventory Management System",
      date: "July 2023",
      description:
        "Comprehensive inventory management solution with intuitive UI and robust backend functionality.",
      features: [
        "Developed UI and contributed to backend (CRUD ops)",
        "PHP + MySQL database integration",
        "Real-time inventory tracking",
      ],
    },
    {
      title: "E-Commerce Bookstore Website",
      date: "September 2024 (TESDA Web Design)",
      description:
        "Responsive e-commerce platform for book sales with categorized listings and custom ordering.",
      features: [
        "Built responsive website with categorized book listings",
        "Custom order forms",
        "Modern, accessible design",
      ],
    },
  ];

  const gameProjects = [
    {
      title: "AI Rep Tracker",
      date: "Fitness App",
      description:
        "A fitness application that auto-tracks exercise reps and enables competitive workouts with real-time video.",
      features: [
        "Automatic rep counting",
        "Multiplayer competition",
        "Video communication",
        "Live rep sync",
      ],
      links: [
        { label: "Play Store", url: "#" },
        {
          label: "Figma Design",
          url: "https://www.figma.com/design/cLuZ3DXpnSIE9iJcQCilrZ/AI-Rep-Tracker?m=auto&t=m62u9MzVBmPsBWaA-1",
        },
      ],
      imageGradient:
        "linear-gradient(135deg, hsl(263 70% 50%), hsl(220 70% 50%))",
    },
    {
      title: "Echoes of Unity",
      date: "Obstacle Course Game",
      description:
        "Two-player online 3D platformer with motion-based controls built with Unity + Mediapipe ML.",
      features: [
        "Fitness-based progression",
        "Co-op mechanics",
        "Motion-based controls (run, squat, jump, climb)",
        "Stylized 3D visuals",
      ],
      links: [{ label: "Figma Design", url: "#" }],
      imageGradient:
        "linear-gradient(135deg, hsl(180 100% 50%), hsl(150 70% 50%))",
    },
    {
      title: "Fight Fit",
      date: "Mobile AI-Tracked Boxing Game",
      description:
        "Mobile boxing game with AI motion tracking, blending fitness with engaging gameplay.",
      features: [
        "AI-powered motion tracking",
        "VR boxing-inspired mechanics",
        "Mobile-first design",
        "Gamified workouts",
      ],
      links: [{ label: "Figma Design", url: "#" }],
      imageGradient: "linear-gradient(135deg, hsl(0 70% 50%), hsl(30 80% 50%))",
    },
    {
      title: "Dance Fitness",
      date: "Interactive Dance Game",
      description:
        "A Unity-based rhythm game designed to deliver an engaging and intuitive dance experience. Players move in sync with the music, matching falling tiles through responsive and visually guided cues.",
      features: [
        "Intuitive and responsive user interface",
        "Real-time body movement tracking for natural interaction",
        "Rhythm-based gameplay with visual and auditory feedback",
        "Dynamic tile-matching system with engaging animations",
        "Immersive and accessible design for all player levels",
      ],
      links: [{ label: "Figma Design", url: "#" }],
      imageGradient:
        "linear-gradient(135deg, hsl(290 70% 50%), hsl(330 80% 50%))",
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-4 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A showcase of innovative projects that blend creativity with
            technology, highlighting my skills in web and game development.
          </p>
        </div>

        {/* Game Development Projects - 3D Circular Gallery */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 text-left justify-left py-4">
            <span className="w-2 h-8 bg-gradient-primary rounded-full"></span>
            Game Development – UI/UX Design
          </h3>
          <CircularGallery3D projects={gameProjects} />
        </div>

        {/* Web Development Projects - Scroll Stack */}
        <div className="space-y-8">
          <h3
            className="text-2xl font-bold text-foreground flex items-center gap-3 sticky z-10 bg-background/10 backdrop-blur-sm py-4"
            style={{ top: "80px" }}
          >
            <span className="w-2 h-8 bg-gradient-primary rounded-full"></span>
            Front-End Development
          </h3>

          <div
            className="relative"
            style={{ minHeight: `${webProjects.length * 400}px` }}
          >
            {webProjects.map((project, index) => {
              const baseProgress = gameProjects.length;
              const progress =
                scrollProgress * (gameProjects.length + webProjects.length) -
                baseProgress -
                index;

              const isActive = progress >= 0 && progress <= 1; // ✅ detects active
              const isPast = progress > 1;

              return (
                <div
                  key={index}
                  className="sticky w-full transition-all duration-300"
                  style={{
                    top: `${150 + index * 40}px`,
                    zIndex: webProjects.length - index + (isPast ? 100 : 0),
                    opacity: isPast ? 0 : 1,
                    transform: isPast
                      ? "translateY(-100px) scale(0.95)"
                      : isActive
                      ? `translateY(${-progress * 50}px) scale(${
                          1 - progress * 0.05
                        })`
                      : "translateY(0) scale(1)",
                  }}
                >
                  {/* ✅ Pass the scroll-based highlight state */}
                  <ProjectCard {...project} delay={0} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
