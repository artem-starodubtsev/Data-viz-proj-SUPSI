import { cn } from "@/lib/utils";

interface PageSelectorProps {
  pages: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const PageSelector = ({ pages, activePage, onPageChange }: PageSelectorProps) => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "h-3 w-3 rounded-full border-2 transition-all duration-300 ease-out",
            activePage === i
              ? "scale-110 border-accent bg-accent shadow-soft"
              : "border-muted-foreground/40 bg-transparent hover:border-muted-foreground hover:scale-105"
          )}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default PageSelector;
