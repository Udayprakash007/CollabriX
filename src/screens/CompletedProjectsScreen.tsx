import { useState } from 'react';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompletedProjectCard } from '@/components/projects/CompletedProjectCard';
import { RatingDialog } from '@/components/ratings/RatingDialog';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

interface CompletedProjectsScreenProps {
  onBack: () => void;
}

export const CompletedProjectsScreen = ({ onBack }: CompletedProjectsScreenProps) => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const { completedProjects, rateProject, rateUser, isRatingProject, isRatingUser } = useProjects();
  const isClient = role === 'client';

  const [ratingProjectId, setRatingProjectId] = useState<string | null>(null);
  const [ratingUserId, setRatingUserId] = useState<{ userId: string; projectId: string } | null>(null);

  const handleRateProject = async (rating: number, review: string) => {
    if (!ratingProjectId) return;
    rateProject({ projectId: ratingProjectId, rating, review });
    setRatingProjectId(null);
  };

  const handleRateUser = async (rating: number, review: string) => {
    if (!ratingUserId) return;
    rateUser({ 
      ratedUserId: ratingUserId.userId, 
      projectId: ratingUserId.projectId, 
      rating, 
      review 
    });
    setRatingUserId(null);
  };

  const hasRatedProject = (project: NonNullable<typeof completedProjects>[0]) => {
    const ratings = project.project_ratings as { rating: number; review: string | null; rater_id: string }[] | undefined;
    return ratings?.some(r => r.rater_id === user?.id);
  };
  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Completed Projects</h1>
          <p className="text-muted-foreground text-sm">
            View and rate your completed work
          </p>
        </div>
      </div>

      {(!completedProjects || completedProjects.length === 0) ? (
        <div className="text-center py-12 space-y-4">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="font-semibold">No Completed Projects</h3>
          <p className="text-sm text-muted-foreground">
            Completed projects will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {completedProjects.map((project, index) => {
            const avgRating = project.project_ratings?.length > 0
              ? project.project_ratings.reduce((sum, r) => sum + r.rating, 0) / project.project_ratings.length
              : 0;
            
            const otherUserId = isClient ? project.developer_id : project.client_id;
            const canRate = !hasRatedProject(project);

            return (
              <div 
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CompletedProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description || undefined}
                  complexity={project.complexity || undefined}
                  completedAt={project.completed_at || undefined}
                  rating={avgRating}
                  reviewCount={project.project_ratings?.length || 0}
                  clientName={project.client?.full_name || undefined}
                  developerName={project.developer?.full_name || undefined}
                  isClient={isClient}
                  canRate={canRate}
                  onRateProject={canRate ? () => setRatingProjectId(project.id) : undefined}
                  onRateUser={canRate && otherUserId ? () => setRatingUserId({ userId: otherUserId, projectId: project.id }) : undefined}
                />
              </div>
            );
          })}
        </div>
      )}

      <RatingDialog
        open={!!ratingProjectId}
        onOpenChange={(open) => !open && setRatingProjectId(null)}
        title="Rate This Project"
        subtitle="How would you rate this project overall?"
        onSubmit={handleRateProject}
        isLoading={isRatingProject}
      />

      <RatingDialog
        open={!!ratingUserId}
        onOpenChange={(open) => !open && setRatingUserId(null)}
        title={`Rate ${isClient ? 'Developer' : 'Client'}`}
        subtitle={`How would you rate working with this ${isClient ? 'developer' : 'client'}?`}
        onSubmit={handleRateUser}
        isLoading={isRatingUser}
      />
    </div>
  );
};
