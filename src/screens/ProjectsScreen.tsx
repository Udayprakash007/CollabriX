import { ProjectCard } from "@/components/cards/ProjectCard";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "E-commerce App",
    budget: 12000,
    complexity: "Medium" as const,
    roles: ["Backend", "Frontend", "UI/UX"],
    description:
      "Build a modern e-commerce platform with user authentication, product catalog, cart management, and payment integration.",
  },
  {
    id: 2,
    title: "Healthcare Dashboard",
    budget: 25000,
    complexity: "Hard" as const,
    roles: ["Frontend", "UI/UX"],
    description:
      "Design and develop a comprehensive dashboard for healthcare analytics with real-time data visualization.",
  },
  {
    id: 3,
    title: "Portfolio Website",
    budget: 5000,
    complexity: "Easy" as const,
    roles: ["Frontend", "UI/UX"],
    description:
      "Create a stunning portfolio website with smooth animations and responsive design for a photographer.",
  },
  {
    id: 4,
    title: "Task Management API",
    budget: 8000,
    complexity: "Medium" as const,
    roles: ["Backend"],
    description:
      "Develop a RESTful API for task management with team collaboration features and real-time updates.",
  },
];

interface ProjectsScreenProps {
  onViewTeams: () => void;
}

export const ProjectsScreen = ({ onViewTeams }: ProjectsScreenProps) => {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Projects</h1>
        <p className="text-muted-foreground">Find projects that match your skills</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl p-4 border border-border/50 shadow-card text-center">
          <span className="text-2xl font-bold text-foreground">24</span>
          <span className="text-xs text-muted-foreground block">Active</span>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border/50 shadow-card text-center">
          <span className="text-2xl font-bold text-primary">8</span>
          <span className="text-xs text-muted-foreground block">Matching</span>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border/50 shadow-card text-center">
          <span className="text-2xl font-bold text-success">₹2.4L</span>
          <span className="text-xs text-muted-foreground block">Total</span>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            onViewTeams={onViewTeams}
            delay={index * 100}
          />
        ))}
      </div>

      {/* FAB */}
      <Button
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-xl z-40"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};
