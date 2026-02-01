import About from "@/components/About";
import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/ProjectsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <ProjectsSection />
        <About />
        <Contact />

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
            <p>© 2023 LGN.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
