
-- Tighten connections UPDATE: only receiver can change status; both parties may keep update access otherwise via restrictive policy
DROP POLICY IF EXISTS "Users can update connections they're part of" ON public.connections;

CREATE POLICY "Receivers can update connection status"
ON public.connections
FOR UPDATE
USING (auth.uid() = receiver_id)
WITH CHECK (auth.uid() = receiver_id);

-- Tighten user_roles INSERT: restrict to non-privileged roles and one role per user
DROP POLICY IF EXISTS "Users can insert their own role" ON public.user_roles;

CREATE POLICY "Users can insert their own non-privileged role"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND role IN ('developer'::user_role, 'client'::user_role)
  AND NOT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid())
);
