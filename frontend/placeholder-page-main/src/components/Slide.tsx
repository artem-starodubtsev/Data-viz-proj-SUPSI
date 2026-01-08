import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Slide = ({ children, className, id }: SlideProps) => {
  return (
    <section
      id={id}
      className={cn(
        "snap-slide h-[100dvh] w-full flex items-center justify-center relative overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Slide;
