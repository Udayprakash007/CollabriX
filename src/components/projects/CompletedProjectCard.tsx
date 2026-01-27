import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RatingDisplay } from '@/components/ratings/RatingDisplay';
import { Calendar, Star, User } from 'lucide-react';
import { format } from 'date-fns';

interface CompletedProjectCardProps {
  id: string;
  title: string;
  description?: string;
  complexity?: string;
  completedAt?: string;
  rating?: number;
  reviewCount?: number;
  clientName?: string;
  developerName?: string;
  isClient?: boolean;
  canRate?: boolean;
  onRateProject?: () => void;
  onRateUser?: () => void;
}

export const CompletedProjectCard = ({
  title,
  description,
  complexity,
  completedAt,
  rating,
  reviewCount,
  clientName,
  developerName,
  isClient,
  canRate,
  onRateProject,
  onRateUser,
}: CompletedProjectCardProps) => {
  const complexityColors = {
    Easy: 'bg-success/10 text-success border-success/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    Hard: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Card className="card-base">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {description}
              </p>
            )}
          </div>
          {complexity && (
            <Badge
              variant="outline"
              className={complexityColors[complexity as keyof typeof complexityColors]}
            >
              {complexity}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {completedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(completedAt), 'MMM d, yyyy')}</span>
            </div>
          )}
          {(rating !== undefined && rating > 0) && (
            <RatingDisplay rating={rating} reviewCount={reviewCount} size="sm" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {isClient ? 'Developer:' : 'Client:'}
          </span>
          <span className="font-medium text-foreground">
            {isClient ? developerName || 'Unknown' : clientName || 'Unknown'}
          </span>
        </div>

        {canRate && (
          <div className="flex gap-2 pt-2">
            {onRateProject && (
              <Button size="sm" variant="outline" onClick={onRateProject} className="flex-1">
                <Star className="h-4 w-4 mr-1" />
                Rate Project
              </Button>
            )}
            {onRateUser && (
              <Button size="sm" variant="outline" onClick={onRateUser} className="flex-1">
                <User className="h-4 w-4 mr-1" />
                Rate {isClient ? 'Developer' : 'Client'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
