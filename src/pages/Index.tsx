import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { JobsScreen } from "@/screens/JobsScreen";
import { ChallengeScreen } from "@/screens/ChallengeScreen";
import { LeaderboardScreen } from "@/screens/LeaderboardScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { ClientDashboard } from "@/screens/ClientDashboard";
import { ClientProfileScreen } from "@/screens/ClientProfileScreen";
import { ClientFindTalentScreen } from "@/screens/ClientFindTalentScreen";
import { ClientMessagesScreen } from "@/screens/ClientMessagesScreen";
import MessagesScreen from "@/screens/MessagesScreen";
import { CompletedProjectsScreen } from "@/screens/CompletedProjectsScreen";
import ConnectScreen from "@/screens/ConnectScreen";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const renderDeveloperScreen = () => {
    switch (activeTab) {
      case "jobs":
        return <JobsScreen />;
      case "connect":
        return <ConnectScreen />;
      case "leaderboard":
        return <LeaderboardScreen />;
      case "profile":
         return (
           <ProfileScreen
             onViewCompleted={() => setActiveTab("completed")}
             onOpenMessages={() => setActiveTab("messages")}
           />
         );
      case "completed":
        return <CompletedProjectsScreen onBack={() => setActiveTab("profile")} />;
      case "messages":
        return <MessagesScreen />;
      default:
        return <JobsScreen />;
    }
  };

  const renderClientScreen = () => {
    switch (activeTab) {
      case "profile":
         return (
           <ClientProfileScreen
             onViewCompleted={() => setActiveTab("completed")}
             onOpenMessages={() => setActiveTab("messages")}
           />
         );
      case "find":
        return <ClientFindTalentScreen />;
      case "messages":
        return <ClientMessagesScreen />;
      case "completed":
        return <CompletedProjectsScreen onBack={() => setActiveTab("profile")} />;
      case "dashboard":
      default:
         return (
           <ClientDashboard
             onViewCompleted={() => setActiveTab("completed")}
             onOpenMessages={() => setActiveTab("messages")}
           />
         );
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isClient={isClient}
      />
    </div>
  );
};

export default Index;
