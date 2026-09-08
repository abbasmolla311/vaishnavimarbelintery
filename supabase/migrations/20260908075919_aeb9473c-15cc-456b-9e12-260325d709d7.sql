CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  product_name TEXT,
  product_size TEXT,
  product_price TEXT,
  quantity TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Signed-in staff can read enquiries"
  ON public.enquiries FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Signed-in staff can update enquiries"
  ON public.enquiries FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);