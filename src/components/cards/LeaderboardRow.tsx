import { Badge } from "@/components/ui/badge";
import { Star, Award, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  avatar: string;
  rating: number;
  badges: ("gold" | "silver" | "bronze")[];
  className?: string;
  delay?: number;
}

const rankStyles: Record<number, string> = {
  1: "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200 dark:border-amber-800",
  2: "bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 border-slate-200 dark:border-slate-700",
  3: "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800",
};

const rankIcons: Record<number, React.ReactNode> = {
  1: <Trophy className="h-6 w-6 text-amber-500" />,
  2: <Medal className="h-5 w-5 text-slate-400" />,
  3: <Award className="h-5 w-5 text-orange-500" />,
};

export const LeaderboardRow = ({
  rank,
  name,
  avatar,
  rating,
  badges,
  className,
  delay = 0,
}: LeaderboardRowProps) => {
  const isTopThree = rank <= 3;

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 animate-fade-in",
        isTopThree && rankStyles[rank],
        isTopThree && "p-5",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Rank */}
      <div
        className={cn(
          "flex items-center justify-center shrink-0",
          isTopThree ? "w-12 h-12" : "w-10 h-10"
        )}
      >
        {isTopThree ? (
          <div className="animate-bounce-subtle">{rankIcons[rank]}</div>
        ) : (
          <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
        )}
      </div>

      {/* Avatar & Name */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img
          src={avatar}
          alt={name}
          className={cn(
            "rounded-xl object-cover border-2 border-background",
            isTopThree ? "h-14 w-14" : "h-11 w-11"
          )}
        />
        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              "font-semibold text-foreground truncate",
              isTopThree && "text-lg"
            )}
          >
            {name}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="text-sm font-medium text-muted-foreground">
              {rating.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 shrink-0">
        {badges.map((badge, index) => (
          <Badge key={index} variant={badge} className="px-2 py-1">
            {badge === "gold" && <Trophy className="h-3 w-3" />}
            {badge === "silver" && <Medal className="h-3 w-3" />}
            {badge === "bronze" && <Award className="h-3 w-3" />}
          </Badge>
        ))}
      </div>
    </div>
  );
};
