import { Star, StarHalf } from "lucide-react";
import { business } from "@/lib/site";

export function Reviews() {
  const full = Math.floor(business.rating);
  const half = business.rating - full >= 0.25;

  return (
    <section className="rounded-xl bg-card p-6 shadow-sm">
      <h2 className="text-center text-2xl font-bold">Reviews</h2>
      <div className="mx-auto mt-5 max-w-md rounded-xl border border-border p-5">
        <p className="text-center text-sm text-muted-foreground">Average ratings on Google</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="text-4xl font-bold">{business.rating}</span>
          <span className="flex text-primary">
            {Array.from({ length: full }).map((_, i) => (
              <Star key={i} size={26} fill="currentColor" />
            ))}
            {half && <StarHalf size={26} fill="currentColor" />}
          </span>
        </div>
        <p className="mt-4 border-t border-border pt-4 text-center text-lg font-semibold">
          {business.reviewCount} reviews
        </p>
      </div>
    </section>
  );
}
