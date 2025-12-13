import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pastChallenges = [
  {
    title: "Landing Page Challenge",
    department: "Design",
    participants: 89,
    winner: "Sarah Chen",
  },
  {
    title: "API Optimization",
    department: "Backend",
    participants: 45,
    winner: "Mike Johnson",
  },
];

export const ChallengeScreen = () => {
  const handleUpload = () => {
    toast({
      title: "Upload Initiated",
      description: "Please select your submission file...",
    });
  };

  const challengeEndTime = new Date();
  challengeEndTime.setDate(challengeEndTime.getDate() + 2);
  challengeEndTime.setHours(23, 59, 59);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Weekly Challenge</h1>
          <p className="text-muted-foreground">Compete and earn rewards</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1">
            <Zap className="h-3 w-3" />
            Active
          </Badge>
        </div>
      </div>

      {/* Featured Challenge */}
      <ChallengeCard
        title="Build a Calculator UI"
        department="Development"
        endTime={challengeEndTime}
        rewards={{
          points: 20,
          badge: "Silver",
          leaderboard: true,
        }}
        instructions={[
          "Create a functional calculator with a modern UI design",
          "Include basic operations: add, subtract, multiply, divide",
          "Implement keyboard support for desktop users",
          "Make it fully responsive across all devices",
          "Add subtle animations for button interactions",
        ]}
        onUpload={handleUpload}
        className="mb-6"
      />

      {/* Past Challenges */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Past Challenges</h2>
        </div>

        <div className="space-y-3">
          {pastChallenges.map((challenge, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <h3 className="font-medium text-foreground">{challenge.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {challenge.department}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {challenge.participants} participants
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-foreground">
                  {challenge.winner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
