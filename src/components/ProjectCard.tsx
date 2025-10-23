import { ExternalLink } from "lucide-react";

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  features: string[];
  techStack?: string[];
  links?: ProjectLink[];
  delay?: number;
  isActive?: boolean;
}

const ProjectCard = ({
  title,
  date,
  description,
  techStack,
  features,
  links,
  delay = 0,
  isActive = false,
}: ProjectCardProps) => {
  const isNofaceGame = title === "NoFace";

  return (
    <div
      className={`group relative bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]
      rounded-2xl p-8 transition-all duration-500 animate-fade-in-up
      ${
        isActive
          ? "scale-[1.05] border-primary/70 shadow-[0_0_25px_rgba(99,102,241,0.4)]"
          : "hover:border-primary/50 hover:scale-[1.02]"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-primary rounded-2xl transition-opacity duration-500
        ${isActive ? "opacity-10" : "opacity-0 group-hover:opacity-5"}`}
      ></div>

      <div className="relative space-y-4">
        {/* Header with title + optional top-right link */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className={`text-2xl font-bold text-foreground transition-colors
              ${isActive ? "text-primary" : "group-hover:text-primary"}`}
            >
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{date}</p>
          </div>

          {/* Move NoFace link to the top right */}
          {isNofaceGame && links && links.length > 0 && (
            <a
              href={links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-md bg-primary/10 hover:bg-primary/20
              border border-primary/30 hover:border-primary/50 text-foreground transition-all duration-200 hover:scale-105 text-xs md:text-sm font-medium"
            >
              {links[0].label}
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Key Features:</p>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-accent mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-sm font-medium text-foreground">Tech Stack:</p>
            <ul className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <li
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Default links (for other projects) */}
        {!isNofaceGame && links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary/20
                border border-border hover:border-primary/50 text-foreground transition-all duration-200 hover:scale-105"
              >
                <span className="text-sm font-medium">{link.label}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
