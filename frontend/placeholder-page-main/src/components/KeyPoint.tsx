import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyPointProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  isVisible?: boolean;
}

const KeyPoint = ({ icon: Icon, title, description, delay = 0, isVisible = true }: KeyPointProps) => {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-card border border-border shadow-soft opacity-0",
        isVisible && "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h4 className="font-display text-lg font-semibold text-card-foreground mb-2">
        {title}
      </h4>
      <p className="font-body text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default KeyPoint;
