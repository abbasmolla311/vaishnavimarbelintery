import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { products, whatsappLink } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  city: z.string().trim().max(100),
  product: z.string().trim().max(120),
  quantity: z.string().trim().max(50),
  message: z.string().trim().max(1000),
});

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

export function OrderForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    product: defaultProduct,
    quantity: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const picked = products.find((p) => p.name === parsed.data.product);
    setSending(true);
    const { error: dbError } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      city: parsed.data.city || null,
      product_name: parsed.data.product || null,
      product_size: picked?.size ?? null,
      product_price: picked?.price ?? null,
      quantity: parsed.data.quantity || null,
      message: parsed.data.message || null,
    });
    setSending(false);
    if (dbError) {
      setError("We could not save your request. Please call or WhatsApp us instead.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl bg-card p-6 text-center shadow-sm">
        <h3 className="text-lg font-bold">Thank you, we have your request</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team will call you back with rates and availability.
        </p>
        <a
          href={whatsappLink(
            `Order request from ${form.name}. Product: ${form.product || "General"}. Quantity: ${form.quantity || "-"}`,
          )}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Also send on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl bg-card p-5 shadow-sm">
      <div>
        <label className="text-sm font-medium" htmlFor="of-product">Product</label>
        <select id="of-product" value={form.product} onChange={set("product")} className={inputClass}>
          <option value="">Not sure yet / other</option>
          {products.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} — {p.price} ({p.size})
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="of-name">Your name *</label>
          <input id="of-name" value={form.name} onChange={set("name")} className={inputClass} maxLength={100} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="of-phone">Phone / WhatsApp *</label>
          <input id="of-phone" value={form.phone} onChange={set("phone")} className={inputClass} maxLength={20} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="of-email">Email</label>
          <input id="of-email" value={form.email} onChange={set("email")} className={inputClass} maxLength={255} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="of-city">City / area</label>
          <input id="of-city" value={form.city} onChange={set("city")} className={inputClass} maxLength={100} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="of-qty">Quantity needed (sq ft or boxes)</label>
        <input id="of-qty" value={form.quantity} onChange={set("quantity")} className={inputClass} maxLength={50} />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="of-msg">Anything else?</label>
        <textarea id="of-msg" rows={3} value={form.message} onChange={set("message")} className={inputClass} maxLength={1000} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-md bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send Order Request"}
      </button>
    </form>
  );
}
