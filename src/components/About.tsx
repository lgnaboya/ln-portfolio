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
        "Crafting intuitive and visually engaging user experiences across web and game interfaces. I create functional prototypes and wireframes that prioritize usability, accessibility, and creative flow. Skilled in leveraging tools like Figma for rapid prototyping and the Adobe Suite for high-quality visual and branding assets.",
    },
    {
      title: "Development",
      frontColor: "from-indigo-200/10 to-cyan-900/20",
      skills: [
        "HTML/CSS",
        "JavaScript/TypeScript",
        "React",
        "PHP/MySQL",
        "Java",
        "Front-End Development",
      ],
      description:
        "My development experience spans both web and application environments. I’m proficient in building responsive, dynamic interfaces using modern frameworks. My approach focuses on writing clean, maintainable code while ensuring optimized performance and seamless user experience across devices.",
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
          <p className="text-muted-foreground text-md max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across various
            areas, continuously developed through hands-on project experience
            and creative exploration.
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
