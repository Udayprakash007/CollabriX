-- Add current_projects column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN current_projects integer NOT NULL DEFAULT 0;