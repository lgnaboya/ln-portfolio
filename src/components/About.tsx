import React from "react";

const TechnicalSkills: React.FC = () => {
  const skillCategories = [
    {
      title: "Design & Prototyping",
      frontColor: "from-pink-200/10 to-purple-900/20",
      skills: [
        "UI/UX Design",
        "Game Design",
        "Prototyping",
        "Figma",
        "Adobe Suite",
      ],
      description:
        "I craft intuitive, user-centered designs with smooth interaction flows and aesthetic precision.",
    },
    {
      title: "Development",
      frontColor: "from-indigo-200/10 to-cyan-900/20",
      skills: ["Front-End Development", "React", "PHP/MySQL", "Unity"],
      description:
        "I build responsive and dynamic interfaces with clean code, optimized structure, and immersive user experiences.",
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 px-6 bg-secondary/20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover over the cards to explore each category in depth.
          </p>
        </div>

        {/* Flip Cards */}
        <div className="grid md:grid-cols-2 gap-10 perspective">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="group relative h-60 [transform-style:preserve-3d] transition-transform duration-700 hover:[transform:rotateY(180deg)]"
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.frontColor} backdrop-blur-sm border border-[var(--glass-border)] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg transition-transform duration-700 [backface-visibility:hidden]`}
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/10 text-foreground/90 text-xs hover:bg-primary/20 hover:text-primary transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-6 text-center flex flex-col justify-center items-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-inner">
                <h4 className="text-lg font-semibold text-primary mb-3">
                  {category.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute w-56 h-56 bg-primary/10 rounded-full blur-3xl top-16 left-10 animate-float-slow"></div>
        <div className="absolute w-40 h-40 bg-accent/10 rounded-full blur-3xl bottom-8 right-8 animate-float-slower"></div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
