-- Add region column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS region text;

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  budget DECIMAL(10,2),
  complexity TEXT CHECK (complexity IN ('Easy', 'Medium', 'Hard')),
  roles TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  developer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Clients can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update their projects" ON public.projects FOR UPDATE USING (auth.uid() = client_id);
CREATE POLICY "Clients can delete their projects" ON public.projects FOR DELETE USING (auth.uid() = client_id);

-- Create project ratings table
CREATE TABLE public.project_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  rater_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, rater_id)
);

-- Enable RLS on project_ratings
ALTER TABLE public.project_ratings ENABLE ROW LEVEL SECURITY;

-- Project ratings policies
CREATE POLICY "Anyone can view project ratings" ON public.project_ratings FOR SELECT USING (true);
CREATE POLICY "Users can rate projects they're involved in" ON public.project_ratings FOR INSERT 
  WITH CHECK (
    auth.uid() = rater_id AND 
    EXISTS (
      SELECT 1 FROM public.projects p 
      WHERE p.id = project_id 
      AND (p.client_id = auth.uid() OR p.developer_id = auth.uid())
      AND p.status = 'completed'
    )
  );

-- Create user ratings table
CREATE TABLE public.user_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rated_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rater_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(rated_user_id, rater_id, project_id)
);

-- Enable RLS on user_ratings
ALTER TABLE public.user_ratings ENABLE ROW LEVEL SECURITY;

-- User ratings policies
CREATE POLICY "Anyone can view user ratings" ON public.user_ratings FOR SELECT USING (true);
CREATE POLICY "Users can rate others from completed projects" ON public.user_ratings FOR INSERT 
  WITH CHECK (
    auth.uid() = rater_id AND 
    auth.uid() != rated_user_id AND
    EXISTS (
      SELECT 1 FROM public.projects p 
      WHERE p.id = project_id 
      AND (p.client_id = auth.uid() OR p.developer_id = auth.uid())
      AND p.status = 'completed'
    )
  );

-- Add trigger for projects updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();