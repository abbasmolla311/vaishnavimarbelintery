import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { MapEmbed } from "@/components/site/MapEmbed";
import { SocialIcons } from "@/components/site/SocialIcons";
import { business } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's Connect | WhatsApp Enquiry - Vaishnavi Marble" },
      {
        name: "description",
        content:
          "Send your marble or tile enquiry to Vaishnavi Marble, Kestopur Kolkata. The form opens WhatsApp with your details filled in.",
      },
      { property: "og:title", content: "Let's Connect | Vaishnavi Marble" },
      {
        property: "og:description",
        content: "Send us a WhatsApp enquiry in one tap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `New enquiry for ${business.name}`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Message: ${form.message}`,
    ].join("\n");
    window.open(
      `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  };

  const field =
    "mt-2 w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary";

  return (
    <Layout>
      <div className="bg-navy px-4 py-8 text-center text-navy-foreground">
        <h1 className="text-3xl font-extrabold">
          Let's <span className="text-primary">Connect!</span>
        </h1>
        <p className="mt-2 text-sm text-navy-foreground/75">
          Fill the form and it goes straight to our WhatsApp.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <form onSubmit={onSubmit} className="rounded-xl bg-card p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              First Name*
              <input required value={form.firstName} onChange={set("firstName")} placeholder="First Name" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Last Name*
              <input required value={form.lastName} onChange={set("lastName")} placeholder="Last Name" className={field} />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold">
            Email*
            <input required type="email" value={form.email} onChange={set("email")} placeholder="Enter your email" className={field} />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Phone Number*
            <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="Enter your phone number" className={field} />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            City*
            <input required value={form.city} onChange={set("city")} placeholder="Enter your city" className={field} />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Your Message*
            <textarea required rows={4} value={form.message} onChange={set("message")} placeholder="Write here..." className={field} />
          </label>
          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp py-3 font-semibold text-primary-foreground"
          >
            <MessageCircle size={20} /> Send Enquiry On WhatsApp
          </button>
        </form>

        <div className="rounded-xl bg-card p-5 shadow-sm">
          <h2 className="font-bold">Follow Us</h2>
          <div className="mt-3">
            <SocialIcons />
          </div>
        </div>

        <MapEmbed />
      </div>
    </Layout>
  );
}
