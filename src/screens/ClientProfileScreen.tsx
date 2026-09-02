import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Settings,
  Edit,
  Briefcase,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  Building2,
  MapPin,
  Mail,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useProjects, useUserRatings } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { RatingDisplay } from "@/components/ratings/RatingDisplay";
import { ClientOnboardingModal } from "@/components/auth/ClientOnboardingModal";

interface ClientProfileScreenProps {
  onViewCompleted?: () => void;
  onOpenMessages?: () => void;
}

interface ClientProfileData {
  company_name: string;
  industry_scale: string;
  bio: string;
  region: string;
}

export const ClientProfileScreen = ({ onViewCompleted, onOpenMessages }: ClientProfileScreenProps) => {
  const { user } = useAuth();
  const { myProjects } = useProjects();
  const { data: ratingsData } = useUserRatings(user?.id);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clientProfile, setClientProfile] = useState<ClientProfileData>({
    company_name: "",
    industry_scale: "",
    bio: "",
    region: "",
  });

  useEffect(() => {
    if (user) {
      fetchClientProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchClientProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, bio, developer_type, region")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setClientProfile({
          company_name: data.full_name || "",
          industry_scale: data.developer_type || "",
          bio: data.bio || "",
          region: data.region || "",
        });
      }
    } catch (err) {
      console.error("Error fetching client profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const completedProjects = myProjects?.filter(p => p.status === 'completed') || [];
  const activeProjects = myProjects?.filter(p => p.status !== 'completed') || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover gradient */}
        <div className="h-32 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl" />

        {/* Profile info */}
        <div className="px-4 -mt-16">
          <div className="flex items-end gap-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl border-4 border-background bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <button 
                onClick={() => setShowOnboarding(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-xl font-bold text-foreground">
                {clientProfile.company_name || <span className="text-muted-foreground/60 font-normal italic">Add Company Name</span>}
              </h1>
              <p className="text-sm text-muted-foreground">
                {clientProfile.industry_scale || <span className="text-muted-foreground/50 italic">Client Company</span>}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowOnboarding(true)}
                className="hidden sm:flex items-center gap-1.5 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
              >
                <Sparkles className="h-4 w-4" /> Edit Company Profile
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
              {clientProfile.region || <span className="text-muted-foreground/50 italic">Location not set</span>}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-emerald-500" />
              Verified Client
            </span>
          </div>

          {/* Bio / Description */}
          {clientProfile.bio ? (
            <p className="mt-3 text-sm text-foreground/90 bg-muted/30 p-3 rounded-lg border border-border/50">
              "{clientProfile.bio}"
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground/60 bg-muted/20 p-3 rounded-lg border border-dashed border-border/60 italic">
              No company description provided yet. Click 'Edit Company Profile' to configure your company workspace.
            </p>
          )}

          {/* Quick stats badges */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {ratingsData && ratingsData.totalRatings > 0 && (
              <Badge variant="default" className="gap-1 bg-emerald-500 hover:bg-emerald-600">
                <Star className="h-3 w-3" />
                <RatingDisplay 
                  rating={ratingsData.averageRating} 
                  reviewCount={ratingsData.totalRatings} 
                  size="sm" 
                  showCount={false}
                />
                Client Rating
              </Badge>
            )}
            <Badge variant="secondary" className="gap-1">
              <Briefcase className="h-3 w-3" />
              {myProjects?.length || 0} Projects
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              {completedProjects.length} Completed
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="card-base">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myProjects?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Projects Posted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-base">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-success">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedProjects.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-base">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-warning">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeProjects.length}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-base">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-primary">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{ratingsData?.averageRating.toFixed(1) || '0.0'}</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Completed Projects */}
      {completedProjects.length > 0 && onViewCompleted && (
        <div className="mb-8">
          <Button 
            onClick={onViewCompleted}
            className="w-full gap-2"
            variant="outline"
          >
            <CheckCircle className="h-4 w-4" />
            View & Rate Completed Projects ({completedProjects.length})
          </Button>
        </div>
      )}

      {onOpenMessages && (
        <div className="mb-8">
          <Button onClick={onOpenMessages} className="w-full gap-2" variant="outline">
            <Mail className="h-4 w-4" />
            Message Developers
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button className="w-full gap-2" variant="outline">
          <Mail className="h-4 w-4" />
          Contact Support
        </Button>
        <Button className="w-full gap-2" variant="outline">
          <Settings className="h-4 w-4" />
          Account Settings
        </Button>
      </div>

      {user && (
        <ClientOnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          userId={user.id}
          onComplete={() => {
            fetchClientProfile();
            setShowOnboarding(false);
          }}
        />
      )}
    </div>
  );
};
