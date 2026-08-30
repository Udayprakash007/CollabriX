import { useState, useEffect } from "react";
import { RatingStatCard } from "@/components/cards/RatingStatCard";
import { BadgeCard } from "@/components/cards/BadgeCard";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
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
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserRatings } from "@/hooks/useProjects";
import { RatingDisplay } from "@/components/ratings/RatingDisplay";

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

const userTeams = [
  { 
    id: 1, 
    name: "Team Alpha", 
    role: "Lead Developer", 
    rating: 4.9, 
    projects: 8,
    teammates: [
      { name: "Sarah Chen", role: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 4.8 },
      { name: "Mike Johnson", role: "Backend Dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4.7 },
      { name: "Emily Davis", role: "QA Engineer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 4.9 },
      { name: "Alex Kim", role: "DevOps", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", rating: 4.6 },
    ]
  },
  { 
    id: 2, 
    name: "Design Wizards", 
    role: "Frontend Dev", 
    rating: 4.7, 
    projects: 5,
    teammates: [
      { name: "Lisa Wang", role: "Lead Designer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", rating: 4.9 },
      { name: "Tom Brown", role: "Motion Designer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 4.5 },
      { name: "Anna Lee", role: "UI Designer", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", rating: 4.8 },
    ]
  },
  { 
    id: 3, 
    name: "Code Ninjas", 
    role: "Full Stack", 
    rating: 4.8, 
    projects: 12,
    teammates: [
      { name: "James Wilson", role: "Tech Lead", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", rating: 4.9 },
      { name: "Sophie Miller", role: "Backend Dev", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop", rating: 4.7 },
      { name: "David Park", role: "Frontend Dev", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop", rating: 4.8 },
      { name: "Rachel Green", role: "Mobile Dev", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop", rating: 4.6 },
      { name: "Chris Taylor", role: "DevOps", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop", rating: 4.7 },
    ]
  },
];

interface ProfileData {
  full_name: string;
  bio: string;
  developer_type: string;
  skills: string[];
  avatar_url: string;
  region: string;
}

interface ProfileScreenProps {
  onViewCompleted?: () => void;
  onOpenMessages?: () => void;
}

export const ProfileScreen = ({ onViewCompleted, onOpenMessages }: ProfileScreenProps) => {
  const { user } = useAuth();
  const { data: ratingsData } = useUserRatings(user?.id);
  const [showProjects, setShowProjects] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "",
    bio: "",
    developer_type: "Full Stack Developer",
    skills: [],
    avatar_url: "",
    region: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, bio, developer_type, skills, avatar_url, region")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          bio: data.bio || "",
          developer_type: data.developer_type || "Full Stack Developer",
          skills: data.skills || [],
          avatar_url: data.avatar_url || "",
          region: data.region || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSave = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Profile Editor Modal */}
      {user && (
        <ProfileEditor
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          profile={profile}
          userId={user.id}
          onSave={handleProfileSave}
        />
      )}

      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover gradient */}
        <div className="h-32 gradient-hero rounded-2xl" />

        {/* Profile info */}
        <div className="px-4 -mt-16">
          <div className="flex items-end gap-4">
            <div className="relative">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="h-24 w-24 rounded-2xl border-4 border-background object-cover shadow-xl"
                />
              ) : (
                <div className="h-24 w-24 rounded-2xl border-4 border-background bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-primary">
                    {profile.full_name?.charAt(0) || "?"}
                  </span>
                </div>
              )}
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-xl font-bold text-foreground">
                {profile.full_name || "Add Your Name"}
              </h1>
              <p className="text-sm text-muted-foreground">{profile.developer_type}</p>
            </div>
            <Button variant="outline" size="icon" className="mb-2">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {profile.bio}
            </p>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {profile.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {profile.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{profile.skills.length - 5} more
                </Badge>
              )}
            </div>
          )}

          {/* Quick stats */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Badge variant="default" className="gap-1">
              <Star className="h-3 w-3" />
              {ratingsData?.averageRating.toFixed(1) || "0.0"}
            </Badge>
            <Badge variant="outline" className="gap-1 border-primary/50 text-primary">
              <Zap className="h-3 w-3" />
              2 Active
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
            <Badge 
              variant="secondary" 
              className="gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setShowTeams(!showTeams)}
            >
              <Users className="h-3 w-3" />
              3 Teams
              {showTeams ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </Badge>
          </div>
        </div>
      </div>

      {/* View & Rate Completed Projects Button */}
      {onViewCompleted && (
        <div className="mb-6">
          <Button 
            onClick={onViewCompleted}
            className="w-full gap-2"
            variant="outline"
          >
            <CheckCircle className="h-4 w-4" />
            View & Rate Completed Projects
          </Button>
        </div>
      )}

      {onOpenMessages && (
        <div className="mb-6">
          <Button onClick={onOpenMessages} className="w-full gap-2" variant="outline">
            <Users className="h-4 w-4" />
            Open Messages
          </Button>
        </div>
      )}

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

      {/* Teams Section */}
      {showTeams && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              My Teams
            </h2>
            <span className="text-sm text-muted-foreground">{userTeams.length} teams</span>
          </div>
          
          <div className="space-y-3">
            {userTeams.map((team, index) => (
              <div 
                key={team.id}
                className="card-base p-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">Your role: {team.role}</p>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {team.rating}
                  </Badge>
                </div>
                
                {/* Teammates */}
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">{team.teammates.length} teammates</p>
                  <div className="space-y-2">
                    {team.teammates.map((teammate, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img 
                          src={teammate.avatar} 
                          alt={teammate.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{teammate.name}</p>
                          <p className="text-xs text-muted-foreground">{teammate.role}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {teammate.rating}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    {team.projects} projects completed
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
            value={ratingsData?.averageRating.toFixed(1) || "0.0"}
            subtitle={`${ratingsData?.totalRatings || 0} reviews received`}
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
