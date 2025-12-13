import { RatingStatCard } from "@/components/cards/RatingStatCard";
import { BadgeCard } from "@/components/cards/BadgeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  Award,
  Settings,
  Edit,
  Trophy,
  Medal,
  Zap,
  Heart,
  Clock,
  Code,
} from "lucide-react";

const badges = [
  { name: "Gold Developer", variant: "gold" as const, earned: true },
  { name: "Silver Designer", variant: "silver" as const, earned: true },
  { name: "Bronze Contributor", variant: "bronze" as const, earned: true },
  { name: "Reliability Master", variant: "special" as const, earned: true, icon: <Clock className="h-8 w-8 text-primary-foreground" /> },
  { name: "Team Player", variant: "gold" as const, earned: true, icon: <Users className="h-8 w-8 text-amber-600 dark:text-amber-400" /> },
  { name: "Fast Learner", variant: "silver" as const, earned: false, icon: <Zap className="h-8 w-8 text-slate-500 dark:text-slate-400" /> },
];

export const ProfileScreen = () => {
  return (
    <div className="pb-24">
      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover gradient */}
        <div className="h-32 gradient-hero rounded-2xl" />

        {/* Profile info */}
        <div className="px-4 -mt-16">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
                alt="Profile"
                className="h-24 w-24 rounded-2xl border-4 border-background object-cover shadow-xl"
              />
              <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-primary-foreground shadow-lg">
                <Edit className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-xl font-bold text-foreground">John Developer</h1>
              <p className="text-sm text-muted-foreground">Full Stack Developer</p>
            </div>
            <Button variant="outline" size="icon" className="mb-2">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-3 mt-4">
            <Badge variant="default" className="gap-1">
              <Star className="h-3 w-3" />
              4.8
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Code className="h-3 w-3" />
              12 Projects
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              3 Teams
            </Badge>
          </div>
        </div>
      </div>

      {/* Rating Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Ratings
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <RatingStatCard
            title="Solo Rating"
            value="4,250"
            subtitle="Top 5% globally"
            icon={Star}
            trend="up"
            trendValue="+120 this month"
            variant="primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <RatingStatCard
              title="Batch Rating"
              value="4.8"
              subtitle="8 batches"
              icon={Users}
              trend="up"
              trendValue="+0.2"
              delay={100}
            />
            <RatingStatCard
              title="Dept. Rank"
              value="#3"
              subtitle="Development"
              icon={Award}
              trend="up"
              trendValue="+2"
              delay={200}
            />
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Badges
          </h2>
          <span className="text-sm text-muted-foreground">5/6 earned</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => (
            <BadgeCard
              key={badge.name}
              {...badge}
              delay={index * 50}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
