import { useEffect, useRef, useState } from "react";
import CircularGallery3D from "./CircularGallery3D";
import ProjectCard from "./ProjectCard";

import aiRepTracker from "@/assets/ai-rep-tracker.png";
import danceFitness from "@/assets/dance-fitness.png";
import echoesUnity from "@/assets/echoes-unity.png";
import fightFit from "@/assets/fight-fit.png";

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
        "Anonymous voice and text chat",
        "Real-time messaging interface",
        "Conversation starter interactions",
        "Accessibility and privacy-first design",
      ],
      techStack: ["React", "CSS/HTML", "Express.js", "ASP.NET"],
      links: [
        {
          label: "Figma Design",
          url: "https://www.figma.com/site/Y8BTZ51of4SKeJaAdies0s/NoFace?node-id=0-1&t=nBWA3bPW1E4LASa2-1",
        },
      ],
    },
    {
      title: "App-Based Rental Locker System",
      date: "May 2024",
      description:
        "Mobile application for seamless locker rental service with integrated payment processing.",
      features: [
        "Designed UI for mobile locker rental app",
        "Contributed to backend (booking and payment features)",
        "User-friendly booking system",
      ],
      techStack: ["Java", "Firebase", "Android Studio"],
    },
    {
      title: "EXIS-INC Inventory Management System",
      date: "July 2023",
      description:
        "Comprehensive inventory management solution with intuitive UI and robust backend functionality.",
      features: [
        "Developed UI and contributed to backend (CRUD operations)",
        "Real-time inventory tracking",
        "Data management and reporting",
      ],
      techStack: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    },
    {
      title: "E-Commerce Bookstore Website",
      date: "September 2024 (TESDA Web Design)",
      description:
        "Responsive e-commerce platform for book sales with categorized listings and custom ordering system.",
      features: [
        "Built responsive website with categorized book listings",
        "Implemented custom order forms",
        "Designed modern and accessible user interface",
      ],
      techStack: ["HTML", "CSS", "Adobe Photoshop"],
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
        {
          label: "Play Store",
          url: "https://play.google.com/store/apps/details?id=com.quixyfit.hiit&pcampaignid=web_share",
        },
        {
          label: "Figma Design",
          url: "https://www.figma.com/design/cLuZ3DXpnSIE9iJcQCilrZ/AI-Rep-Tracker?node-id=0-1&t=8IkkVX4JCu90zF49-1",
        },
      ],
      imageBackground: aiRepTracker,
    },
    {
      title: "Echoes of Unity",
      date: "Obstacle Course Game",
      description:
        "An interactive motion-based obstacle course game where real-life movements control the character to overcome in-game challenges. Designed to promote fitness and teamwork, blends physical activity with cooperative gameplay.",
      features: [
        "Motion-based controls (run, squat, jump, etc)",
        "Fitness-based progression",
        "Co-op mechanics",
      ],
      links: [
        {
          label: "Figma Design",
          url: "https://www.figma.com/design/QaruR0WTCANbhGQlB6HhKd/Game-Development?node-id=0-1&t=7qn110FlflCirXFz-1",
        },
      ],
      imageBackground: echoesUnity,
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
      links: [
        {
          label: "Figma Design",
          url: "https://www.figma.com/design/QaruR0WTCANbhGQlB6HhKd/Game-Development?node-id=1005-57&t=7qn110FlflCirXFz-1",
        },
      ],
      imageBackground: fightFit,
    },
    {
      title: "Dance Fitness",
      date: "Interactive Dance Game",
      description:
        "A Unity-based rhythm game designed to deliver an engaging and intuitive dance experience. Players move in sync with the music, matching falling tiles through responsive and visually guided cues.",
      features: [
        "Responsive motion-tracking interface",
        "Rhythm-based gameplay with feedback",
        "Dynamic tile-matching mechanics",
      ],
      links: [
        {
          label: "Figma Design",
          url: "https://www.figma.com/design/QaruR0WTCANbhGQlB6HhKd/Game-Development?node-id=1005-58&t=7qn110FlflCirXFz-1",
        },
      ],
      imageBackground: danceFitness,
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
        <div className="space-y-12">
          <h3
            className="text-2xl font-bold text-foreground flex items-center gap-3 sticky z-10 bg-background/10 backdrop-blur-sm py-4"
            style={{ top: "80px" }}
          >
            <span className="w-2 h-8 bg-gradient-primary rounded-full"></span>
            Front-End Development
          </h3>

          <div
            className="relative"
            style={{ minHeight: `${webProjects.length * 550}px` }}
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
                      ? "translateY(-100px) scale(0.85)"
                      : isActive
                      ? `translateY(${-progress * 50}px) scale(${
                          1 - progress * 0.05
                        })`
                      : "translateY(0) scale(1)",
                  }}
                >
                  {/*Pass the scroll-based highlight state */}
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
