import { TeamCard } from "@/components/cards/TeamCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const teams = [
  {
    id: 1,
    name: "Team Alpha",
    rating: 4.9,
    completedProjects: 42,
    isBestMatch: true,
    members: [
      {
        name: "Sarah Chen",
        role: "Frontend",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 4.9,
      },
      {
        name: "Mike Johnson",
        role: "Backend",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 4.8,
      },
      {
        name: "Emma Wilson",
        role: "UI/UX",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 4.9,
      },
    ],
  },
  {
    id: 2,
    name: "Team Beta",
    rating: 4.7,
    completedProjects: 31,
    members: [
      {
        name: "Alex Rivera",
        role: "Frontend",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        rating: 4.7,
      },
      {
        name: "Jessica Liu",
        role: "Backend",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        rating: 4.8,
      },
    ],
  },
  {
    id: 3,
    name: "Team Gamma",
    rating: 4.5,
    completedProjects: 18,
    members: [
      {
        name: "David Park",
        role: "Full Stack",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 4.6,
      },
      {
        name: "Aisha Patel",
        role: "UI/UX",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
        rating: 4.5,
      },
    ],
  },
];

interface TeamsScreenProps {
  onBack: () => void;
}

export const TeamsScreen = ({ onBack }: TeamsScreenProps) => {
  const handleChooseTeam = (teamName: string) => {
    toast({
      title: "Team Selected!",
      description: `You've selected ${teamName} for your project.`,
    });
  };

  const handleViewTeam = (teamName: string) => {
    toast({
      title: "Team Details",
      description: `Viewing ${teamName} profile...`,
    });
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Matching Teams</h1>
          <p className="text-muted-foreground text-sm">
            For: E-commerce App • ₹12,000
          </p>
        </div>
      </div>

      {/* Match Quality */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6 border border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Match Quality</span>
          <span className="text-sm font-bold text-primary">3 Teams Found</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: "92%" }}
          />
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">
          92% match with your requirements
        </span>
      </div>

      {/* Team Cards */}
      <div className="space-y-4">
        {teams.map((team, index) => (
          <TeamCard
            key={team.id}
            {...team}
            onViewTeam={() => handleViewTeam(team.name)}
            onChooseTeam={() => handleChooseTeam(team.name)}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};
