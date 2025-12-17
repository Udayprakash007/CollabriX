import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Settings,
  Edit,
  Briefcase,
  DollarSign,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Calendar,
  TrendingUp,
  Building2,
  MapPin,
  Mail,
  Globe,
} from "lucide-react";

const postedProjects = [
  { id: 1, title: "E-commerce Mobile App", developer: "John Developer", budget: "$5,000", completedDate: "Dec 2024", status: "completed", rating: 5 },
  { id: 2, title: "Landing Page Design", developer: "Sarah Designer", budget: "$800", completedDate: "Nov 2024", status: "completed", rating: 4.8 },
  { id: 3, title: "API Integration", developer: "Mike Backend", budget: "$2,000", completedDate: "Nov 2024", status: "completed", rating: 5 },
  { id: 4, title: "CRM Dashboard", developer: "Team Alpha", budget: "$8,000", completedDate: "Oct 2024", status: "completed", rating: 4.9 },
  { id: 5, title: "Mobile App MVP", developer: "In Progress", budget: "$6,000", completedDate: "-", status: "in_progress", rating: null },
];

const hiredDevelopers = [
  { id: 1, name: "John Developer", role: "Full Stack", projects: 3, totalPaid: "$12,000", rating: 4.9, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: 2, name: "Sarah Designer", role: "UI/UX Designer", projects: 2, totalPaid: "$4,500", rating: 4.8, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 3, name: "Mike Backend", role: "Backend Dev", projects: 1, totalPaid: "$2,000", rating: 5.0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 4, name: "Team Alpha", role: "Dev Team", projects: 2, totalPaid: "$15,000", rating: 4.9, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
];

const stats = [
  { label: "Projects Posted", value: "12", icon: Briefcase, color: "text-primary" },
  { label: "Total Invested", value: "$45,500", icon: DollarSign, color: "text-green-500" },
  { label: "Developers Hired", value: "8", icon: Users, color: "text-blue-500" },
  { label: "Avg. Completion", value: "12 days", icon: Clock, color: "text-orange-500" },
];

export const ClientProfileScreen = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showDevelopers, setShowDevelopers] = useState(false);

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
              <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-primary-foreground shadow-lg">
                <Edit className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-xl font-bold text-foreground">TechVentures Inc.</h1>
              <p className="text-sm text-muted-foreground">Startup Founder</p>
            </div>
            <Button variant="outline" size="icon" className="mb-2">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Company Info */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              San Francisco, CA
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              techventures.io
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Member since 2023
            </span>
          </div>

          {/* Quick stats badges */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Badge variant="default" className="gap-1 bg-emerald-500 hover:bg-emerald-600">
              <Star className="h-3 w-3" />
              4.9 Client Rating
            </Badge>
            <Badge 
              variant="secondary" 
              className="gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setShowProjects(!showProjects)}
            >
              <Briefcase className="h-3 w-3" />
              12 Projects
              {showProjects ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </Badge>
            <Badge 
              variant="secondary" 
              className="gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setShowDevelopers(!showDevelopers)}
            >
              <Users className="h-3 w-3" />
              8 Hired
              {showDevelopers ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="card-base">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Posted Projects Section */}
      {showProjects && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-500" />
              Posted Projects
            </h2>
            <span className="text-sm text-muted-foreground">{postedProjects.length} total</span>
          </div>
          
          <div className="space-y-3">
            {postedProjects.map((project, index) => (
              <div 
                key={project.id}
                className="card-base p-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.developer}</p>
                  </div>
                  {project.status === "completed" ? (
                    <Badge variant="secondary" className="gap-1 bg-green-500/20 text-green-500">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1 bg-yellow-500/20 text-yellow-500">
                      <Clock className="h-3 w-3" />
                      In Progress
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <span className="text-sm font-medium text-foreground">{project.budget}</span>
                  {project.rating && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      Rated {project.rating}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hired Developers Section */}
      {showDevelopers && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Hired Developers
            </h2>
            <span className="text-sm text-muted-foreground">{hiredDevelopers.length} total</span>
          </div>
          
          <div className="space-y-3">
            {hiredDevelopers.map((dev, index) => (
              <div 
                key={dev.id}
                className="card-base p-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={dev.avatar} 
                    alt={dev.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{dev.name}</h3>
                    <p className="text-sm text-muted-foreground">{dev.role}</p>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {dev.rating}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-sm">
                  <span className="text-muted-foreground">{dev.projects} projects</span>
                  <span className="font-medium text-green-500">{dev.totalPaid} paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment History Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          Investment Overview
        </h2>
        <Card className="card-base">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">This Month</span>
              <span className="font-semibold text-foreground">$6,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Month</span>
              <span className="font-semibold text-foreground">$8,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">This Year</span>
              <span className="font-semibold text-foreground">$45,500</span>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-semibold text-green-500">98%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
};
