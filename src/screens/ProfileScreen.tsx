import { useState, useEffect } from "react";
import { RatingStatCard } from "@/components/cards/RatingStatCard";
import { BadgeCard } from "@/components/cards/BadgeCard";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { DeveloperOnboardingModal } from "@/components/auth/DeveloperOnboardingModal";
import { CoverImageSelectorModal } from "@/components/profile/CoverImageSelectorModal";
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
  Sparkles,
  Camera,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProjects, useUserRatings } from "@/hooks/useProjects";
import { RatingDisplay } from "@/components/ratings/RatingDisplay";

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

interface ConnectedUser {
  id: string;
  full_name: string | null;
  developer_type: string | null;
  avatar_url: string | null;
}

export const ProfileScreen = ({ onViewCompleted, onOpenMessages }: ProfileScreenProps) => {
  const { user } = useAuth();
  const { completedProjects: realCompletedProjects } = useProjects();
  const { data: ratingsData } = useUserRatings(user?.id);
  const [showProjects, setShowProjects] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState<ConnectedUser[]>([]);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

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
      fetchConnections();
      const savedCover = localStorage.getItem(`cover_url_${user.id}`);
      if (savedCover) {
        setCoverUrl(savedCover);
      }
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleSelectCover = (url: string | null) => {
    setCoverUrl(url);
    if (user) {
      if (url) {
        localStorage.setItem(`cover_url_${user.id}`, url);
      } else {
        localStorage.removeItem(`cover_url_${user.id}`);
      }
    }
  };

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

  const fetchConnections = async () => {
    if (!user) return;

    try {
      const { data: conns, error } = await supabase
        .from("connections")
        .select("sender_id, receiver_id")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq("status", "accepted");

      if (error) throw error;

      if (conns && conns.length > 0) {
        const otherIds = conns.map((c) => (c.sender_id === user.id ? c.receiver_id : c.sender_id));
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, full_name, developer_type, avatar_url")
          .in("id", otherIds);

        setConnections(profilesData || []);
      } else {
        setConnections([]);
      }
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  const handleProfileSave = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  const completedCount = realCompletedProjects?.length || 0;
  const ratingAvg = ratingsData?.averageRating || 0;

  const dynamicBadges = [
    { name: "Gold Developer", variant: "gold" as const, earned: ratingAvg >= 4.5 },
    { name: "Silver Designer", variant: "silver" as const, earned: ratingAvg >= 4.0 },
    { name: "Bronze Contributor", variant: "bronze" as const, earned: completedCount >= 1 },
    { name: "Reliability Master", variant: "special" as const, earned: completedCount >= 3, icon: <Clock className="h-8 w-8 text-primary-foreground" /> },
    { name: "Team Player", variant: "gold" as const, earned: connections.length > 0, icon: <Users className="h-8 w-8 text-amber-600 dark:text-amber-400" /> },
    { name: "Fast Learner", variant: "silver" as const, earned: profile.skills.length >= 3, icon: <Zap className="h-8 w-8 text-slate-500 dark:text-slate-400" /> },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Cover Modal */}
      <CoverImageSelectorModal
        isOpen={showCoverModal}
        onClose={() => setShowCoverModal(false)}
        currentCoverUrl={coverUrl}
        onSelectCover={handleSelectCover}
        title="Customize Developer Background Cover"
      />

      {/* Profile Editor Modal */}
      {user && (
        <>
          <ProfileEditor
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            profile={profile}
            userId={user.id}
            onSave={handleProfileSave}
          />
          <DeveloperOnboardingModal
            isOpen={showOnboarding}
            onClose={() => setShowOnboarding(false)}
            userId={user.id}
            onComplete={() => {
              fetchProfile();
              setShowOnboarding(false);
            }}
          />
        </>
      )}

      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover Header Banner */}
        <div className="relative h-36 rounded-2xl overflow-hidden border border-border/50 shadow-md group">
          {coverUrl ? (
            <img src={coverUrl} alt="Background Cover" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full gradient-hero" />
          )}
          <button
            onClick={() => setShowCoverModal(true)}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-semibold transition-all shadow-lg border border-white/20 hover:scale-105"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>{coverUrl ? 'Change Background' : 'Add Background Picture'}</span>
          </button>
        </div>

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
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowOnboarding(true)}
                className="hidden sm:flex items-center gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
              >
                <Sparkles className="h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
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
            <Badge 
              variant="secondary" 
              className="gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setShowProjects(!showProjects)}
            >
              <Code className="h-3 w-3" />
              {completedCount} Completed Project{completedCount !== 1 ? 's' : ''}
              {showProjects ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </Badge>
            <Badge 
              variant="secondary" 
              className="gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setShowTeams(!showTeams)}
            >
              <Users className="h-3 w-3" />
              {connections.length} Connection{connections.length !== 1 ? 's' : ''}
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
            <span className="text-sm text-muted-foreground">{completedCount} total</span>
          </div>
          
          {completedCount === 0 ? (
            <div className="p-6 text-center border border-border/50 rounded-xl bg-card text-muted-foreground text-sm">
              No completed projects yet.
            </div>
          ) : (
            <div className="space-y-3">
              {realCompletedProjects?.map((project, index) => {
                const avgRating = project.project_ratings?.length
                  ? project.project_ratings.reduce((sum, r) => sum + r.rating, 0) / project.project_ratings.length
                  : 0;

                return (
                  <div 
                    key={project.id}
                    className="card-base p-4 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.client?.full_name || 'Client'}</p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {avgRating > 0 ? avgRating.toFixed(1) : 'Unrated'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end mt-3 pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.completed_at ? new Date(project.completed_at).toLocaleDateString() : 'Completed'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Teams / Connections Section */}
      {showTeams && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Connected Collaborators
            </h2>
            <span className="text-sm text-muted-foreground">{connections.length} connections</span>
          </div>
          
          {connections.length === 0 ? (
            <div className="p-6 text-center border border-border/50 rounded-xl bg-card text-muted-foreground text-sm">
              No connected collaborators yet. Use the Connect screen to find and add team members!
            </div>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.id} className="card-base p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {conn.avatar_url ? (
                      <img src={conn.avatar_url} alt={conn.full_name || 'User'} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-semibold text-primary">{conn.full_name?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{conn.full_name || 'Developer'}</p>
                    <p className="text-xs text-muted-foreground">{conn.developer_type || 'Collaborator'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rating Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Ratings Overview
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <RatingStatCard
            title="User Rating"
            value={ratingsData?.averageRating ? ratingsData.averageRating.toFixed(1) : "0.0"}
            subtitle={`${ratingsData?.totalRatings || 0} reviews received`}
            icon={Star}
            variant="primary"
          />
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Badges
          </h2>
          <span className="text-sm text-muted-foreground">
            {dynamicBadges.filter(b => b.earned).length}/{dynamicBadges.length} earned
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {dynamicBadges.map((badge, index) => (
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
