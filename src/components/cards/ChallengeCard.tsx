import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Clock,
  Star,
  Award,
  Medal,
  CheckCircle,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ChallengeCardProps {
  title: string;
  department: string;
  endTime: Date;
  rewards: {
    points: number;
    badge: string;
    leaderboard: boolean;
  };
  instructions: string[];
  onUpload: () => void;
  className?: string;
}

export const ChallengeCard = ({
  title,
  department,
  endTime,
  rewards,
  instructions,
  onUpload,
  className,
}: ChallengeCardProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div
      className={cn(
        "relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card animate-fade-in",
        className
      )}
    >
      {/* Hero Section */}
      <div className="gradient-hero p-6 pb-10">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-6 w-6 text-primary-foreground" />
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
            Weekly Challenge
          </Badge>
        </div>
        <h2 className="text-2xl font-bold text-primary-foreground mb-2">{title}</h2>
        <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
          {department}
        </Badge>
      </div>

      {/* Timer Card */}
      <div className="mx-4 -mt-6 relative z-10">
        <div className="bg-card rounded-xl border border-border/50 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Time Remaining</span>
            </div>
            <span className="font-mono font-bold text-lg text-foreground animate-pulse-slow">
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-4">
        {/* Rewards */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Rewards</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-2 p-3 bg-secondary/50 rounded-xl">
              <div className="p-2 rounded-full bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground text-center">
                +{rewards.points} Points
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-secondary/50 rounded-xl">
              <div className="p-2 rounded-full bg-accent/10">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground text-center">
                {rewards.badge} Badge
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-secondary/50 rounded-xl">
              <div className="p-2 rounded-full bg-warning/10">
                <Medal className="h-5 w-5 text-warning" />
              </div>
              <span className="text-xs text-muted-foreground text-center">
                Leaderboard
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Instructions</h3>
          <ul className="space-y-2">
            {instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full" size="lg" onClick={onUpload}>
          <Upload className="h-5 w-5" />
          Upload Submission
        </Button>
      </div>
    </div>
  );
};
