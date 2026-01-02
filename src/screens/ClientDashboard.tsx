import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  Plus, 
  Users, 
  CheckCircle2, 
  TrendingUp,
  Search,
  Star,
  Calendar,
  Target,
  ChevronRight
} from 'lucide-react';

interface Milestone {
  name: string;
  completed: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed';
  applicants: number;
  budget: string;
  daysLeft: number;
  totalDays: number;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  developer?: string;
  milestones: Milestone[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Mobile App',
    description: 'Build a full-featured mobile shopping app with payment integration',
    status: 'in_progress',
    applicants: 12,
    budget: '$5,000 - $8,000',
    daysLeft: 14,
    totalDays: 45,
    progress: 65,
    completedTasks: 13,
    totalTasks: 20,
    developer: 'John Smith',
    milestones: [
      { name: 'UI Design', completed: true },
      { name: 'Frontend Development', completed: true },
      { name: 'Backend API', completed: false },
      { name: 'Payment Integration', completed: false },
    ]
  },
  {
    id: '2',
    title: 'Landing Page Design',
    description: 'Modern landing page for SaaS product launch',
    status: 'open',
    applicants: 8,
    budget: '$500 - $1,000',
    daysLeft: 5,
    totalDays: 5,
    progress: 0,
    completedTasks: 0,
    totalTasks: 5,
    milestones: [
      { name: 'Wireframes', completed: false },
      { name: 'Design Mockup', completed: false },
      { name: 'Development', completed: false },
    ]
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Connect third-party services with existing platform',
    status: 'completed',
    applicants: 5,
    budget: '$2,000',
    daysLeft: 0,
    totalDays: 14,
    progress: 100,
    completedTasks: 8,
    totalTasks: 8,
    developer: 'Sarah Wilson',
    milestones: [
      { name: 'API Analysis', completed: true },
      { name: 'Integration', completed: true },
      { name: 'Testing', completed: true },
    ]
  }
];

const stats = [
  { label: 'Active Projects', value: '3', icon: Briefcase, color: 'text-primary' },
  { label: 'Total Spent', value: '$12,500', icon: TrendingUp, color: 'text-green-500' },
  { label: 'Hired Developers', value: '8', icon: Users, color: 'text-blue-500' },
  { label: 'Avg. Rating Given', value: '4.8', icon: Star, color: 'text-yellow-500' },
];

export const ClientDashboard = () => {
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'open':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">Open</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-500">Completed</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Client Dashboard</h1>
        <p className="text-muted-foreground">Manage your projects and find talented developers</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2">
          <Plus className="h-4 w-4" />
          Post New Project
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Search className="h-4 w-4" />
          Browse Developers
        </Button>
      </div>

      {/* Projects Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">My Projects</h2>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {mockProjects.map((project) => (
          <Card key={project.id} className="card-base overflow-hidden">
            <CardContent className="p-4 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                </div>
                {getStatusBadge(project.status)}
              </div>

              {/* Progress Section */}
              {project.status === 'in_progress' && (
                <div className="space-y-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Work Progress</span>
                    <span className="text-lg font-bold text-primary">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2.5" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {project.completedTasks}/{project.totalTasks} tasks done
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {project.milestones.filter(m => m.completed).length}/{project.milestones.length} milestones
                    </span>
                  </div>
                </div>
              )}

              {/* Days Left & Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <Calendar className={`h-4 w-4 ${project.daysLeft <= 3 && project.status !== 'completed' ? 'text-destructive' : 'text-muted-foreground'}`} />
                  <div>
                    <p className={`text-sm font-semibold ${project.daysLeft <= 3 && project.status !== 'completed' ? 'text-destructive' : 'text-foreground'}`}>
                      {project.status === 'completed' ? 'Completed' : `${project.daysLeft} days left`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.status === 'completed' ? 'Project finished' : `of ${project.totalDays} days total`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{project.budget}</p>
                    <p className="text-xs text-muted-foreground">Budget</p>
                  </div>
                </div>
              </div>

              {/* Developer & Milestones */}
              {project.status === 'in_progress' && project.developer && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium text-foreground">{project.developer}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.milestones.map((milestone, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className={milestone.completed ? 'bg-green-500/10 text-green-600 border-green-500/30' : 'bg-muted text-muted-foreground'}
                      >
                        {milestone.completed && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {milestone.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Open Project Stats */}
              {project.status === 'open' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.applicants} developers applied</span>
                </div>
              )}

              {/* Action */}
              <div className="flex items-center justify-end pt-2 border-t border-border">
                <Button variant="ghost" size="sm" className="gap-1">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
