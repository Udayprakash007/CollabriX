import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  budget: number | null;
  complexity: string | null;
  roles: string[] | null;
  status: string;
  client_id: string;
  developer_id: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  client?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    region: string | null;
  };
  developer?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    region: string | null;
  };
  project_ratings?: {
    rating: number;
    review: string | null;
  }[];
}

export const useProjects = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles!projects_client_id_fkey(id, full_name, avatar_url, region),
          developer:profiles!projects_developer_id_fkey(id, full_name, avatar_url, region),
          project_ratings(rating, review)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });

  const { data: myProjects } = useQuery({
    queryKey: ['my-projects', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles!projects_client_id_fkey(id, full_name, avatar_url, region),
          developer:profiles!projects_developer_id_fkey(id, full_name, avatar_url, region),
          project_ratings(rating, review)
        `)
        .or(`client_id.eq.${user.id},developer_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!user,
  });

  const { data: completedProjects } = useQuery({
    queryKey: ['completed-projects', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles!projects_client_id_fkey(id, full_name, avatar_url, region),
          developer:profiles!projects_developer_id_fkey(id, full_name, avatar_url, region),
          project_ratings(rating, review, rater_id)
        `)
        .eq('status', 'completed')
        .or(`client_id.eq.${user.id},developer_id.eq.${user.id}`)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data as (Project & { project_ratings: { rating: number; review: string | null; rater_id: string }[] })[];
    },
    enabled: !!user,
  });

  const rateProjectMutation = useMutation({
    mutationFn: async ({ projectId, rating, review }: { projectId: string; rating: number; review: string }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase.from('project_ratings').insert({
        project_id: projectId,
        rater_id: user.id,
        rating,
        review: review || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completed-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project rated successfully!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to rate project', description: error.message, variant: 'destructive' });
    },
  });

  const rateUserMutation = useMutation({
    mutationFn: async ({ 
      ratedUserId, 
      projectId, 
      rating, 
      review 
    }: { 
      ratedUserId: string; 
      projectId: string; 
      rating: number; 
      review: string 
    }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase.from('user_ratings').insert({
        rated_user_id: ratedUserId,
        rater_id: user.id,
        project_id: projectId,
        rating,
        review: review || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-ratings'] });
      toast({ title: 'User rated successfully!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to rate user', description: error.message, variant: 'destructive' });
    },
  });

  return {
    projects,
    myProjects,
    completedProjects,
    isLoading,
    rateProject: rateProjectMutation.mutate,
    rateUser: rateUserMutation.mutate,
    isRatingProject: rateProjectMutation.isPending,
    isRatingUser: rateUserMutation.isPending,
  };
};

export const useUserRatings = (userId?: string) => {
  return useQuery({
    queryKey: ['user-ratings', userId],
    queryFn: async () => {
      if (!userId) return { averageRating: 0, totalRatings: 0, ratings: [] };
      
      const { data, error } = await supabase
        .from('user_ratings')
        .select(`
          *,
          rater:profiles!user_ratings_rater_id_fkey(id, full_name, avatar_url),
          project:projects(id, title)
        `)
        .eq('rated_user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const ratings = data || [];
      const totalRatings = ratings.length;
      const averageRating = totalRatings > 0 
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
        : 0;

      return { averageRating, totalRatings, ratings };
    },
    enabled: !!userId,
  });
};
