-- Migration: 20260830224000_update_role_trigger.sql
-- Ensures profiles.role and user_roles are cleanly set based on client vs developer

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_role_val public.user_role;
  raw_role text;
  profile_role_title text;
  developer_type_val text;
BEGIN
  -- Determine role from metadata
  raw_role := NEW.raw_user_meta_data ->> 'role';
  
  IF raw_role = 'client' THEN
    user_role_val := 'client'::public.user_role;
    profile_role_title := 'Client';
    developer_type_val := NULL;
  ELSE
    user_role_val := 'developer'::public.user_role;
    profile_role_title := 'Full Stack Developer';
    developer_type_val := 'Full Stack Developer';
  END IF;

  -- 1. Insert or update profile with appropriate title
  INSERT INTO public.profiles (id, full_name, avatar_url, role, developer_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', 'New User'),
    NEW.raw_user_meta_data ->> 'avatar_url',
    profile_role_title,
    developer_type_val
  )
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      role = EXCLUDED.role,
      developer_type = EXCLUDED.developer_type,
      updated_at = now();

  -- 2. Insert into user_roles
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role_val)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Re-attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
