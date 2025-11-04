-- Grant admins read access to all profiles (fixes RLS blocking admin dashboard)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
