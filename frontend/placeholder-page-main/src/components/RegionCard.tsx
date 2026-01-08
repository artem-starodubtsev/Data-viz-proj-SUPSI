import { cn } from "@/lib/utils";

interface RegionCardProps {
  title: string;
  subtitle: string;
  content: string[];
  regionColor: string;
  isActive?: boolean;
}

const RegionCard = ({ title, subtitle, content, regionColor, isActive = false }: RegionCardProps) => {
  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl bg-card border border-border shadow-soft transition-all duration-500",
        isActive && "shadow-elevated scale-[1.02]"
      )}
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
        style={{ backgroundColor: regionColor }}
      />
      
      <div className="pl-4">
        <span
          className="inline-block text-xs font-body font-medium tracking-wider uppercase mb-2 px-2 py-0.5 rounded"
          style={{ backgroundColor: `${regionColor}20`, color: regionColor }}
        >
          {subtitle}
        </span>
        
        <h3 className="font-display text-2xl font-semibold text-card-foreground mb-4">
          {title}
        </h3>
        
        <div className="space-y-3">
          {content.map((paragraph, index) => (
            <p key={index} className="font-body text-sm leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
