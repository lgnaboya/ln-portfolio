const About = () => {
  const skills = [
    "UI/UX Design",
    "Front-End Development",
    "Game Design",
    "Prototyping",
    "PHP/MySQL",
    "React",
    "Unity",
    "Figma",
    "Adobe Suite",
  ];

  return (
    <section id="about" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">About Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm a UI/UX designer and developer passionate about creating digital experiences that 
                blend aesthetics with functionality. My work spans web applications and game development, 
                always with a focus on user needs and engaging interactions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                My philosophy centers on continuous learning and exploration. I believe the best solutions 
                come from understanding both the technical possibilities and human experiences, then 
                finding innovative ways to bridge them.
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h3 className="text-2xl font-bold text-foreground">Skills & Tools</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
