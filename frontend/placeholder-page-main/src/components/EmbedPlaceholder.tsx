import { cn } from "@/lib/utils";

interface EmbedPlaceholderProps {
  className?: string;
  label?: string;
}

const EmbedPlaceholder = ({ className, label = "Embed content here" }: EmbedPlaceholderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-muted-foreground/30",
        className
      )}
    >
      <span className="font-body text-sm">{label}</span>
    </div>
  );
};

export default EmbedPlaceholder;
