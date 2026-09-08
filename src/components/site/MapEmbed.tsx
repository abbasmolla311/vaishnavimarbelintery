import { business } from "@/lib/site";

export function MapEmbed() {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    business.mapQuery,
  )}&output=embed`;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        title={`Map to ${business.name}`}
        src={src}
        loading="lazy"
        className="h-72 w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`}
        target="_blank"
        rel="noreferrer"
        className="block bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
      >
        Get Directions
      </a>
    </div>
  );
}
