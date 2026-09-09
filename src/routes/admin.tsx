import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Mail, LogOut, Plus, Pencil, Trash2, X, Package, Save, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { fetchProducts, type CatalogProduct } from "@/lib/catalog";
import { brandLogo } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Panel | Vaishnavi Marble" },
      { name: "description", content: "Private admin area to manage Vaishnavi Marble products, prices, sizes and photos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel | Vaishnavi Marble" },
      { property: "og:description", content: "Private product management area." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function AdminPage() {
  const { session, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading...</div>;
  }
  if (!session) return <AdminLogin />;
  if (!isAdmin) return <NoAccess />;
  return <AdminDashboard />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm animate-fade-up rounded-2xl bg-card p-7 shadow-xl">{children}</div>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setSubmitting(false);
  }

  return (
    <Shell>
      <div className="text-center">
        <img src={brandLogo} alt="Vaishnavi Marble logo" width={56} height={56} className="mx-auto h-14 w-14 rounded-md object-cover" />
        <h1 className="mt-4 text-xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your products</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="ad-email">Email</label>
          <div className="relative mt-1">
            <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              id="ad-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${inputClass} pl-9`}
              placeholder="marblevaishnavi@gmail.com"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="ad-pass">Password</label>
          <div className="relative mt-1">
            <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              id="ad-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${inputClass} pl-9`}
              placeholder="Enter password"
            />
          </div>
        </div>
        {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <Link to="/" className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft size={14} /> Back to store
      </Link>
    </Shell>
  );
}

function NoAccess() {
  return (
    <Shell>
      <h1 className="text-center text-lg font-bold">No access</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        This account is not an admin, so the product panel is hidden.
      </p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-5 w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground"
      >
        Sign out
      </button>
    </Shell>
  );
}

const emptyProduct = {
  name: "",
  category: "",
  size: "",
  price: "",
  image_url: "",
  description: "",
  display_order: "0",
  is_active: true,
};

function AdminDashboard() {
  const [items, setItems] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CatalogProduct | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await fetchProducts(true));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    void load();
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="flex flex-wrap items-center gap-3 bg-navy px-4 py-4 text-navy-foreground">
        <img src={brandLogo} alt="Vaishnavi Marble logo" width={40} height={40} className="h-9 w-9 rounded-md object-cover" />
        <div>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-xs text-navy-foreground/70">Manage products, prices, sizes and photos</p>
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <Link to="/categories" className="text-navy-foreground/80">View store</Link>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Package size={18} className="text-primary" /> {items.length} products
          </p>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <Plus size={16} /> Add product
          </button>
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {items.map((p) => (
              <div key={p.id} className="flex animate-fade-up items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
                {p.image_url && (
                  <img src={p.image_url} alt={p.name} width={64} height={64} className="h-16 w-16 rounded-lg object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.category} • {p.size}
                  </p>
                  <p className="text-sm font-bold text-primary">{p.price}</p>
                  {!p.is_active && <p className="text-xs text-destructive">Hidden from store</p>}
                </div>
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  aria-label="Edit product"
                  className="rounded-lg p-2 hover:bg-secondary"
                >
                  <Pencil size={18} />
                </button>
                <button onClick={() => remove(p.id)} aria-label="Delete product" className="rounded-lg p-2 text-destructive hover:bg-destructive/10">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            void load();
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  onClose,
  onSaved,
}: {
  product: CatalogProduct | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    ...emptyProduct,
    ...(product
      ? {
          name: product.name,
          category: product.category,
          size: product.size,
          price: product.price,
          image_url: product.image_url ?? "",
          description: product.description ?? "",
          display_order: String(product.display_order),
          is_active: product.is_active,
        }
      : {}),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      size: form.size.trim(),
      price: form.price.trim(),
      image_url: form.image_url.trim() || null,
      description: form.description.trim() || null,
      display_order: parseInt(form.display_order, 10) || 0,
      is_active: form.is_active,
    };
    const { error: dbError } = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-2xl bg-card shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <h2 className="text-lg font-bold">{product ? "Edit product" : "Add product"}</h2>
          <button onClick={onClose} aria-label="Close"><X size={22} /></button>
        </div>
        <form onSubmit={submit} className="space-y-4 p-5">
          <div>
            <label className="text-sm font-medium" htmlFor="pf-name">Product name *</label>
            <input id="pf-name" value={form.name} onChange={set("name")} required className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="pf-cat">Category</label>
              <input id="pf-cat" value={form.category} onChange={set("category")} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="pf-size">Size</label>
              <input id="pf-size" value={form.size} onChange={set("size")} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="pf-price">Price</label>
              <input id="pf-price" value={form.price} onChange={set("price")} placeholder="₹350 / sq ft" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="pf-order">Display order</label>
              <input id="pf-order" type="number" value={form.display_order} onChange={set("display_order")} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="pf-img">Photo link</label>
            <input id="pf-img" value={form.image_url} onChange={set("image_url")} placeholder="https://..." className={inputClass} />
            {form.image_url && (
              <img src={form.image_url} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
            )}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="pf-desc">Description</label>
            <textarea id="pf-desc" rows={3} value={form.description} onChange={set("description")} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.is_active} onChange={set("is_active")} />
            Show on store
          </label>
          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border py-2.5 font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground disabled:opacity-60"
            >
              <Save size={16} /> {saving ? "Saving..." : product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
