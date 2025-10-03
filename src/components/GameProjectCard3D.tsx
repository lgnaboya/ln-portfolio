import { ExternalLink } from "lucide-react";

interface ProjectLink {
  label: string;
  url: string;
}

interface GameProjectCard3DProps {
  title: string;
  date: string;
  description: string;
  features: string[];
  links?: ProjectLink[];
  imageGradient: string;
}

const GameProjectCard3D = ({ 
  title, 
  date, 
  description, 
  features, 
  links,
  imageGradient 
}: GameProjectCard3DProps) => {
  return (
    <div className="w-full h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
      {/* Image on top */}
      <div 
        className="w-full h-64 relative overflow-hidden"
        style={{ 
          background: imageGradient,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2 p-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {title}
            </h3>
            <p className="text-sm text-white/80 drop-shadow">{date}</p>
          </div>
        </div>
      </div>

      {/* Description below */}
      <div className="flex-1 p-6 space-y-4 bg-card">
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>

        {features.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground uppercase tracking-wide">Key Features:</p>
            <ul className="space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 text-foreground transition-all duration-200 hover:scale-105"
              >
                <span className="text-xs font-medium">{link.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameProjectCard3D;
