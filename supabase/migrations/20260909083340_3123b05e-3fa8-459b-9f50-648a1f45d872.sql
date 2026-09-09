CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  size text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  image_url text,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.products (name, category, size, price, image_url, display_order) VALUES
('Statuario Italian Marble','Italian Marble','1200 x 2400 mm slab','₹350 / sq ft','/__l5e/assets-v1/053b29cf-9021-4135-ba8a-10cffe9d5d79/p-statuario.jpg',1),
('Makrana White Marble','Indian Marble','600 x 1200 mm','₹185 / sq ft','/__l5e/assets-v1/f1b344b2-38c4-4129-bd47-9f389f61b267/p-makrana.jpg',2),
('Honey Onyx Marble','Onyx Marble','800 x 1600 mm slab','₹620 / sq ft','/__l5e/assets-v1/29c6ec6f-67a8-4bd3-be69-51e66b027fb0/p-onyx.jpg',3),
('Black Galaxy Granite','Granite','600 x 1800 mm slab','₹240 / sq ft','/__l5e/assets-v1/64d476f5-7f6f-4a38-81f4-aa3732edab14/p-granite.jpg',4),
('Beige Glazed Vitrified Tile','Floor Tiles','800 x 800 mm','₹78 / sq ft','/__l5e/assets-v1/72bdbbd6-fe20-474a-8861-4fc1d4107891/p-vitrified.jpg',5),
('Grey Anti-Skid Parking Tile','Outdoor & Parking','300 x 300 mm','₹52 / sq ft','/__l5e/assets-v1/c7ccb619-0d27-4497-ad7f-43396854ddb9/p-antiskid.jpg',6);