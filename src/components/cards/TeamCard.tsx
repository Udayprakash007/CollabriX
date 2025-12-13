import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

interface TeamCardProps {
  name: string;
  rating: number;
  completedProjects: number;
  members: TeamMember[];
  isBestMatch?: boolean;
  onViewTeam: () => void;
  onChooseTeam: () => void;
  className?: string;
  delay?: number;
}

export const TeamCard = ({
  name,
  rating,
  completedProjects,
  members,
  isBestMatch = false,
  onViewTeam,
  onChooseTeam,
  className,
  delay = 0,
}: TeamCardProps) => {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl border border-border/50 p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in",
        isBestMatch && "border-primary/50 shadow-glow",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isBestMatch && (
        <div className="absolute -top-3 left-4">
          <Badge className="gradient-primary text-primary-foreground border-0 shadow-md">
            <Crown className="h-3 w-3 mr-1" />
            Best Match
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-4 mt-1">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-1">{name}</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">{completedProjects} projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-5">
        <span className="text-xs text-muted-foreground font-medium mb-3 block">
          Team Members
        </span>
        <div className="flex flex-wrap gap-3">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="flex items-center gap-2 bg-secondary/50 rounded-xl p-2 pr-3 animate-slide-in-right"
              style={{ animationDelay: `${delay + index * 100}ms` }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="h-9 w-9 rounded-lg object-cover border-2 border-background"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground leading-tight">
                  {member.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                  <span className="text-muted-foreground">•</span>
                  <Star className="h-3 w-3 text-warning fill-warning" />
                  <span className="text-xs text-muted-foreground">{member.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onViewTeam}>
          View Team
        </Button>
        <Button className="flex-1" onClick={onChooseTeam}>
          Choose Team
        </Button>
      </div>
    </div>
  );
};
