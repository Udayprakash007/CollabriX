import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  Plus, 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Search,
  MessageSquare,
  Star
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'completed';
  applicants: number;
  budget: string;
  deadline: string;
  progress: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Mobile App',
    status: 'in_progress',
    applicants: 12,
    budget: '$5,000 - $8,000',
    deadline: '2 weeks left',
    progress: 65
  },
  {
    id: '2',
    title: 'Landing Page Design',
    status: 'open',
    applicants: 8,
    budget: '$500 - $1,000',
    deadline: '5 days left',
    progress: 0
  },
  {
    id: '3',
    title: 'API Integration',
    status: 'completed',
    applicants: 5,
    budget: '$2,000',
    deadline: 'Completed',
    progress: 100
  }
];

const stats = [
  { label: 'Active Projects', value: '3', icon: Briefcase, color: 'text-primary' },
  { label: 'Total Spent', value: '$12,500', icon: TrendingUp, color: 'text-green-500' },
  { label: 'Hired Developers', value: '8', icon: Users, color: 'text-blue-500' },
  { label: 'Avg. Rating Given', value: '4.8', icon: Star, color: 'text-yellow-500' },
];

export const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'find' | 'messages'>('projects');

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

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'projects'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveTab('find')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'find'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Find Talent
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'messages'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Messages
        </button>
      </div>

      {/* Projects List */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <Card key={project.id} className="card-base overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.budget}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                {project.status === 'in_progress' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {project.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {project.deadline}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'find' && (
        <div className="text-center py-12 space-y-4">
          <Search className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="font-semibold">Find Talented Developers</h3>
          <p className="text-sm text-muted-foreground">Browse our pool of skilled developers to find the perfect match for your project</p>
          <Button>Start Searching</Button>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="text-center py-12 space-y-4">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="font-semibold">No Messages Yet</h3>
          <p className="text-sm text-muted-foreground">Start a conversation with developers interested in your projects</p>
        </div>
      )}
    </div>
  );
};
