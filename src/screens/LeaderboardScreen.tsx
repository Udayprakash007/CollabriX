import { LeaderboardRow } from "@/components/cards/LeaderboardRow";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  rating: number;
  badges: ("gold" | "silver" | "bronze")[];
}

const tabs = ["All Time", "This Month", "This Week"];

export const LeaderboardScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("All Time");
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, role')
        .neq('role', 'Client');

      if (error) throw error;

      if (profiles && profiles.length > 0) {
        // Fetch ratings for these profiles
        const { data: ratings } = await supabase
          .from('user_ratings')
          .select('rated_user_id, rating');

        // Calculate score for each profile
        const usersWithScores = profiles.map((p) => {
          const userRatings = ratings?.filter(r => r.rated_user_id === p.id) || [];
          const avgRating = userRatings.length > 0 
            ? userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length
            : 4.5; // default initial score baseline
          const score = Math.round(avgRating * 1000);

          const badgesList: ("gold" | "silver" | "bronze")[] = [];
          if (score >= 4500) badgesList.push("gold");
          if (score >= 4000) badgesList.push("silver");
          if (score >= 3500) badgesList.push("bronze");
          if (badgesList.length === 0) badgesList.push("bronze");

          return {
            id: p.id,
            name: p.full_name || "Developer",
            avatar: p.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${p.id}`,
            rating: score,
            badges: badgesList
          };
        });

        // Sort by rating descending
        usersWithScores.sort((a, b) => b.rating - a.rating);

        // Assign ranks
        const rankedUsers: LeaderboardUser[] = usersWithScores.map((item, index) => ({
          ...item,
          rank: index + 1
        }));

        setLeaderboardUsers(rankedUsers);

        if (user) {
          const currentUserData = profiles.find(p => p.id === user.id);
          if (currentUserData) {
            setUserProfile({
              name: currentUserData.full_name || "You",
              avatar: currentUserData.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`
            });
          }
        }
      } else {
        setLeaderboardUsers([]);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentUserRank = user 
    ? leaderboardUsers.find(u => u.id === user.id) 
    : null;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Leaderboard</h1>
          <p className="text-muted-foreground">Top performers ranked by ratings & contribution</p>
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
      {user && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6 border border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl border-2 border-primary overflow-hidden bg-muted flex items-center justify-center">
              {userProfile?.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-bold text-lg text-primary">{userProfile?.name?.charAt(0) || 'Y'}</span>
              )}
            </div>
            <div>
              <span className="font-semibold text-foreground">Your Rank</span>
              <span className="text-sm text-muted-foreground block">
                {currentUserRank ? `#${currentUserRank.rank} • ${currentUserRank.rating.toLocaleString()} pts` : "Unranked"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-primary text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Live
            </span>
            <span className="text-xs text-muted-foreground">Overall</span>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : leaderboardUsers.length === 0 ? (
        <div className="text-center py-12 space-y-3 bg-card border border-border/50 rounded-2xl p-6">
          <Users className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="font-semibold text-foreground">No Leaderboard Data</h3>
          <p className="text-sm text-muted-foreground">No active developer profiles found for the leaderboard yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboardUsers.map((item, index) => (
            <LeaderboardRow key={item.id} {...item} delay={index * 50} />
          ))}
        </div>
      )}
    </div>
  );
};
