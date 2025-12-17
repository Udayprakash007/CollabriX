import { useState } from "react";
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
  Zap,
  Clock,
  Code,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Calendar,
} from "lucide-react";

const badges = [
  { name: "Gold Developer", variant: "gold" as const, earned: true },
  { name: "Silver Designer", variant: "silver" as const, earned: true },
  { name: "Bronze Contributor", variant: "bronze" as const, earned: true },
  { name: "Reliability Master", variant: "special" as const, earned: true, icon: <Clock className="h-8 w-8 text-primary-foreground" /> },
  { name: "Team Player", variant: "gold" as const, earned: true, icon: <Users className="h-8 w-8 text-amber-600 dark:text-amber-400" /> },
  { name: "Fast Learner", variant: "silver" as const, earned: false, icon: <Zap className="h-8 w-8 text-slate-500 dark:text-slate-400" /> },
];

const completedProjects = [
  { id: 1, title: "E-commerce Platform", client: "TechMart Inc.", budget: "₹45,000", completedDate: "Dec 2024", rating: 5 },
  { id: 2, title: "Food Delivery App", client: "QuickBite", budget: "₹32,000", completedDate: "Nov 2024", rating: 4.8 },
  { id: 3, title: "Portfolio Website", client: "Sarah Design", budget: "₹8,000", completedDate: "Nov 2024", rating: 5 },
  { id: 4, title: "CRM Dashboard", client: "SalesForce Pro", budget: "₹55,000", completedDate: "Oct 2024", rating: 4.9 },
  { id: 5, title: "Fitness Tracker", client: "FitLife", budget: "₹28,000", completedDate: "Oct 2024", rating: 4.7 },
  { id: 6, title: "Booking System", client: "TravelEase", budget: "₹38,000", completedDate: "Sep 2024", rating: 5 },
  { id: 7, title: "Chat Application", client: "ConnectHub", budget: "₹22,000", completedDate: "Sep 2024", rating: 4.6 },
  { id: 8, title: "Inventory Management", client: "StockPro", budget: "₹42,000", completedDate: "Aug 2024", rating: 4.9 },
  { id: 9, title: "Blog Platform", client: "MediaVerse", budget: "₹15,000", completedDate: "Aug 2024", rating: 5 },
  { id: 10, title: "Event Management", client: "EventPro", budget: "₹35,000", completedDate: "Jul 2024", rating: 4.8 },
  { id: 11, title: "Learning Platform", client: "EduLearn", budget: "₹48,000", completedDate: "Jun 2024", rating: 4.9 },
  { id: 12, title: "Social Media Dashboard", client: "BrandBoost", budget: "₹30,000", completedDate: "May 2024", rating: 5 },
];

export const ProfileScreen = () => {
  const [showProjects, setShowProjects] = useState(false);

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
            <Badge 
              variant="secondary" 
              className="gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setShowProjects(!showProjects)}
            >
              <Code className="h-3 w-3" />
              12 Projects
              {showProjects ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              3 Teams
            </Badge>
          </div>
        </div>
      </div>

      {/* Completed Projects Section */}
      {showProjects && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Completed Projects
            </h2>
            <span className="text-sm text-muted-foreground">{completedProjects.length} total</span>
          </div>
          
          <div className="space-y-3">
            {completedProjects.map((project, index) => (
              <div 
                key={project.id}
                className="card-base p-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {project.rating}
                  </Badge>
                </div>
                <div className="flex items-center justify-end mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.completedDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
