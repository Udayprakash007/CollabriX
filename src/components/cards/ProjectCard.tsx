import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Palette, Server, ArrowRight, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  budget: number;
  complexity: "Easy" | "Medium" | "Hard";
  roles: string[];
  description: string;
  onViewTeams: () => void;
  className?: string;
  delay?: number;
}

const roleIcons: Record<string, React.ReactNode> = {
  Backend: <Server className="h-4 w-4" />,
  Frontend: <Code className="h-4 w-4" />,
  "UI/UX": <Palette className="h-4 w-4" />,
};

const complexityColors: Record<string, string> = {
  Easy: "success",
  Medium: "warning",
  Hard: "destructive",
};

export const ProjectCard = ({
  title,
  budget,
  complexity,
  roles,
  description,
  onViewTeams,
  className,
  delay = 0,
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl border border-border/50 p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-gradient transition-all">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <IndianRupee className="h-4 w-4" />
            <span className="font-semibold text-foreground">{budget.toLocaleString()}</span>
          </div>
        </div>
        <Badge variant={complexityColors[complexity] as any}>{complexity}</Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs text-muted-foreground font-medium">Required:</span>
        <div className="flex items-center gap-2">
          {roles.map((role) => (
            <div
              key={role}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary rounded-lg"
            >
              <span className="text-primary">{roleIcons[role]}</span>
              <span className="text-xs font-medium text-secondary-foreground">{role}</span>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full group/btn" onClick={onViewTeams}>
        View Matching Teams
        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </div>
  );
};
