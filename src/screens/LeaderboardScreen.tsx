import { LeaderboardRow } from "@/components/cards/LeaderboardRow";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const leaderboardData: Array<{
  rank: number;
  name: string;
  avatar: string;
  rating: number;
  badges: ("gold" | "silver" | "bronze")[];
}> = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4850,
    badges: ["gold", "gold", "silver"],
  },
  {
    rank: 2,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4720,
    badges: ["gold", "silver"],
  },
  {
    rank: 3,
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4680,
    badges: ["gold", "bronze"],
  },
  {
    rank: 4,
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 4520,
    badges: ["silver", "silver"],
  },
  {
    rank: 5,
    name: "Jessica Liu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 4480,
    badges: ["silver", "bronze"],
  },
  {
    rank: 6,
    name: "David Park",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4350,
    badges: ["silver"],
  },
  {
    rank: 7,
    name: "Aisha Patel",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
    rating: 4280,
    badges: ["bronze", "bronze"],
  },
  {
    rank: 8,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rating: 4150,
    badges: ["bronze"],
  },
];

const tabs = ["All Time", "This Month", "This Week"];

export const LeaderboardScreen = () => {
  const [activeTab, setActiveTab] = useState("All Time");

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Leaderboard</h1>
          <p className="text-muted-foreground">Top performers this month</p>
        </div>
        <Badge variant="default" className="gap-1">
          <TrendingUp className="h-3 w-3" />
          Live
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 bg-secondary/50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab
                ? "gradient-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Your Rank */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6 border border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="You"
            className="h-12 w-12 rounded-xl object-cover border-2 border-primary"
          />
          <div>
            <span className="font-semibold text-foreground">Your Rank</span>
            <span className="text-sm text-muted-foreground block">#15 • 3,850 pts</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-success text-sm font-medium flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            +5 ranks
          </span>
          <span className="text-xs text-muted-foreground">This week</span>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <LeaderboardRow key={user.rank} {...user} delay={index * 50} />
        ))}
      </div>
    </div>
  );
};
