import { cn } from "@/lib/utils";

export const AlltronAcademyLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center", className)}>
            <div className="bg-accent px-4 py-2">
                <span className="text-2xl font-bold text-accent-foreground tracking-wider">.ALLTRON</span>
            </div>
            <div className="bg-card px-4 py-2">
                <span className="text-2xl font-semibold text-card-foreground tracking-widest">ACADEMY</span>
            </div>
      </div>
    );
  };
