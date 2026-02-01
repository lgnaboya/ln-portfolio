import { ChevronRight } from "lucide-react";

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
  imageBackground: string;
}

const GameProjectCard3D = ({
  title,
  date,
  description,
  features,
  links,
  imageBackground,
}: GameProjectCard3DProps) => {
  return (
    <div className="w-full h-full flex flex-col bg-card border-2 border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
      {/* Image on top */}
      <div
        className="w-full h-48 relative overflow-hidden bg-center"
        style={{
          backgroundImage: `url(${imageBackground})`,
          backgroundSize: "contain",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-1 p-3">
            <h3 className="text-2xl font-extrabold text-gray-200 drop-shadow-xl">
              {title}
            </h3>
            <p className="text-md text-white/75 drop-shadow">{date}</p>
          </div>
        </div>
      </div>

      {/* Description below */}
      <div className="flex-1 p-4 space-y-2 bg-card">
        <p className="text-foreground leading-relaxed text-xs text-justify">
          {description}
        </p>
        <br />

        {features.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Key Features:
            </p>
            <ul className="space-y-0.5 max-h-24 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border/80 hover:scrollbar-thumb-border">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-[11px] text-muted-foreground flex items-start gap-1.5"
                >
                  <span className="text-accent mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* {links && links.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 text-foreground transition-all duration-200 hover:scale-105"
              >
                <span className="text-[10px] font-medium">{link.label}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        )} */}

        {links && links.length > 0 && (
          <div className="pt-12 flex justify-center">
            <a
              href={links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-20 py-2 rounded-md
                 bg-primary/10 hover:bg-primary/20
                 border border-gray-700 hover:border-primary/50
                 text-foreground text-[10px] font-medium
                 transition-all duration-200 hover:scale-105"
            >
              View Project
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameProjectCard3D;
