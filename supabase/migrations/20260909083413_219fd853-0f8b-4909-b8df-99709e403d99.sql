DROP POLICY "Anyone can view active products" ON public.products;
CREATE POLICY "Public can view active products" ON public.products FOR SELECT TO anon USING (is_active);
CREATE POLICY "Signed-in users can view products" ON public.products FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;