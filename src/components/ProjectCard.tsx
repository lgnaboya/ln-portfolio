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
  links?: ProjectLink[];
  delay?: number;
}

const ProjectCard = ({ title, date, description, features, links, delay = 0 }: ProjectCardProps) => {
  return (
    <div 
      className="group relative bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
      
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{date}</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{description}</p>

        {features.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Key Features:</p>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary/20 border border-border hover:border-primary/50 text-foreground transition-all duration-200 hover:scale-105"
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
