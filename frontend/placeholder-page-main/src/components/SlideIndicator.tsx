import { cn } from "@/lib/utils";

interface SlideIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
  labels?: string[];
}

const SlideIndicator = ({ totalSlides, currentSlide, onSlideChange, labels }: SlideIndicatorProps) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className="group relative flex items-center justify-end"
          aria-label={labels?.[index] ?? `Go to slide ${index + 1}`}
        >
          {/* Label tooltip */}
          {labels?.[index] && (
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-card text-card-foreground text-xs font-body px-3 py-1.5 rounded-md shadow-soft whitespace-nowrap border border-border">
              {labels[index]}
            </span>
          )}
          
          {/* Dot indicator */}
          <span
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300 border-2",
              currentSlide === index
                ? "bg-primary border-primary scale-125"
                : "bg-transparent border-muted-foreground/40 hover:border-primary/60 hover:scale-110"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default SlideIndicator;
