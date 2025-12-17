import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProjectsScreen } from "@/screens/ProjectsScreen";
import { TeamsScreen } from "@/screens/TeamsScreen";
import { ChallengeScreen } from "@/screens/ChallengeScreen";
import { LeaderboardScreen } from "@/screens/LeaderboardScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { ClientDashboard } from "@/screens/ClientDashboard";
import { ClientProfileScreen } from "@/screens/ClientProfileScreen";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [showTeams, setShowTeams] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleViewTeams = () => {
    setShowTeams(true);
  };

  const handleBackFromTeams = () => {
    setShowTeams(false);
  };

  const renderDeveloperScreen = () => {
    if (activeTab === "teams" || showTeams) {
      return <TeamsScreen onBack={handleBackFromTeams} />;
    }

    switch (activeTab) {
      case "projects":
        return <ProjectsScreen onViewTeams={handleViewTeams} />;
      case "challenge":
        return <ChallengeScreen />;
      case "leaderboard":
        return <LeaderboardScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <ProjectsScreen onViewTeams={handleViewTeams} />;
    }
  };

  const renderClientScreen = () => {
    switch (activeTab) {
      case "profile":
        return <ClientProfileScreen />;
      case "find":
      case "messages":
      case "dashboard":
      default:
        return <ClientDashboard />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowTeams(false);
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isClient = role === 'client';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        {isClient ? renderClientScreen() : renderDeveloperScreen()}
      </main>
      <BottomNav 
        activeTab={showTeams ? "teams" : activeTab} 
        onTabChange={handleTabChange}
        isClient={isClient}
      />
    </div>
  );
};

export default Index;
