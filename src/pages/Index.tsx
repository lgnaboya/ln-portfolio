import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/AnimatedBackground";

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
            <p>© 2024 Loudett Gleac Naboya. Crafted with passion for design and code.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
