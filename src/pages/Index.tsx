import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProjectsScreen } from "@/screens/ProjectsScreen";
import { TeamsScreen } from "@/screens/TeamsScreen";
import { ChallengeScreen } from "@/screens/ChallengeScreen";
import { LeaderboardScreen } from "@/screens/LeaderboardScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [showTeams, setShowTeams] = useState(false);

  const handleViewTeams = () => {
    setShowTeams(true);
  };

  const handleBackFromTeams = () => {
    setShowTeams(false);
  };

  const renderScreen = () => {
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowTeams(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">{renderScreen()}</main>
      <BottomNav activeTab={showTeams ? "teams" : activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
