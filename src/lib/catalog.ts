import { supabase } from "@/integrations/supabase/client";

export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  size: string;
  price: string;
  image_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
};

export async function fetchProducts(includeHidden = false): Promise<CatalogProduct[]> {
  let query = supabase
    .from("products")
    .select("id,name,category,size,price,image_url,description,display_order,is_active")
    .order("display_order", { ascending: true });
  if (!includeHidden) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as CatalogProduct[];
}
