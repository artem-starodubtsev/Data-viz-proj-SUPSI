import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ReportSectionProps {
  children: ReactNode;
  className?: string;
}

const ReportSection = ({ children, className }: ReportSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated",
        className
      )}
    >
      {children}
    </section>
  );
};

export default ReportSection;
