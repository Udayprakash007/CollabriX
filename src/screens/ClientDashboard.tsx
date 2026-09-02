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
import { useAuth } from '@/hooks/useAuth';
import { useProjects, useUserRatings } from '@/hooks/useProjects';
import { RatingDisplay } from '@/components/ratings/RatingDisplay';

interface ClientDashboardProps {
  onViewCompleted?: () => void;
  onOpenMessages?: () => void;
}

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

export const ClientDashboard = ({ onViewCompleted, onOpenMessages }: ClientDashboardProps) => {
  const { user } = useAuth();
  const { myProjects } = useProjects();
  const { data: ratingsData } = useUserRatings(user?.id);
  const completedProjects = myProjects?.filter((project) => project.status === 'completed') || [];
  const activeProjects = myProjects?.filter((project) => project.status === 'in_progress') || [];
  
  const totalBudget = myProjects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0;
  const hiredDevsCount = new Set(myProjects?.filter(p => p.developer_id).map(p => p.developer_id)).size;

  const stats = [
    { label: 'Active Projects', value: activeProjects.length.toString(), icon: Briefcase, color: 'text-primary' },
    { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Hired Developers', value: hiredDevsCount.toString(), icon: Users, color: 'text-blue-500' },
    { label: 'Avg. Rating Given', value: ratingsData?.averageRating ? ratingsData.averageRating.toFixed(1) : '0.0', icon: Star, color: 'text-yellow-500' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">Open</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
        {onOpenMessages && (
          <Button variant="outline" className="flex-1 gap-2" onClick={onOpenMessages}>
            <Users className="h-4 w-4" />
            Messages
          </Button>
        )}
      </div>

      <Card className="card-base">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Your client rating</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {ratingsData?.averageRating.toFixed(1) || '0.0'}
            </p>
            <p className="text-xs text-muted-foreground">
              {ratingsData?.totalRatings || 0} rating{ratingsData?.totalRatings === 1 ? '' : 's'} from developers
            </p>
          </div>
          <RatingDisplay
            rating={ratingsData?.averageRating || 0}
            reviewCount={ratingsData?.totalRatings || 0}
            size="md"
          />
        </CardContent>
      </Card>

      {completedProjects.length > 0 && onViewCompleted && (
        <Button variant="outline" className="w-full gap-2" onClick={onViewCompleted}>
          <CheckCircle2 className="h-4 w-4" />
          View & Rate Completed Projects ({completedProjects.length})
        </Button>
      )}

      {/* Projects Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">My Projects</h2>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {(!myProjects || myProjects.length === 0) ? (
          <Card className="card-base p-8 text-center space-y-3">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="font-semibold text-foreground">No Projects Yet</h3>
            <p className="text-sm text-muted-foreground">You haven't posted any projects yet. Create your first project to get started!</p>
          </Card>
        ) : (
          myProjects.map((project) => (
            <Card key={project.id} className="card-base overflow-hidden">
              <CardContent className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description || 'No description provided.'}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                {/* Days Left & Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Created Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {project.budget ? `$${project.budget.toLocaleString()}` : 'Flexible'}
                      </p>
                      <p className="text-xs text-muted-foreground">Budget</p>
                    </div>
                  </div>
                </div>

                {/* Developer */}
                {project.developer && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium text-foreground">{project.developer.full_name || 'Developer'}</span>
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
          ))
        )}
      </div>
    </div>
  );
};
