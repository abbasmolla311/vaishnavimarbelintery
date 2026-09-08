import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reviews } from "@/components/site/Reviews";
import { MapEmbed } from "@/components/site/MapEmbed";
import { SocialIcons } from "@/components/site/SocialIcons";
import { business } from "@/lib/site";
import hero from "@/assets/hero-showroom.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Visit Our Store | Vaishnavi Marble, Kestopur Kolkata" },
      {
        name: "description",
        content:
          "Vaishnavi Marble showroom at Thakdari Road, Kestopur, Kolkata. Open 10 AM to 8 PM. Directions, timings and Google reviews.",
      },
      { property: "og:title", content: "Visit Our Store | Vaishnavi Marble" },
      {
        property: "og:description",
        content: "Showroom address, timings, directions and reviews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  return (
    <Layout>
      <img
        src={hero}
        alt="Inside the Vaishnavi Marble showroom"
        width={1600}
        height={1008}
        className="h-52 w-full object-cover"
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <div>
          <h1 className="text-2xl font-extrabold">Visit Our Store</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            See full slabs and complete tile panels in person before you buy.
          </p>
        </div>

        <div className="space-y-4 rounded-xl bg-card p-5 shadow-sm">
          <p className="flex gap-3 text-sm">
            <MapPin size={20} className="shrink-0 text-primary" />
            {business.address}
          </p>
          <p className="flex gap-3 text-sm">
            <Clock size={20} className="shrink-0 text-primary" />
            {business.timings}
          </p>
          <a href={`tel:${business.phone}`} className="flex gap-3 text-sm">
            <Phone size={20} className="shrink-0 text-primary" />
            {business.phoneDisplay}
          </a>
          <SocialIcons variant="plain" />
        </div>

        <MapEmbed />
        <Reviews />
      </div>
    </Layout>
  );
}
