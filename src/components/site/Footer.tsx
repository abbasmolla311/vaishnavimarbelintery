import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { business } from "@/lib/site";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-lg font-bold">Visit Us</h2>
        <p className="mt-2 text-sm text-navy-foreground/70">{business.name}</p>
        <p className="mt-2 flex gap-2 text-sm leading-relaxed text-navy-foreground/70">
          <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
          {business.address}
        </p>

        <h2 className="mt-8 text-lg font-bold">Keep In Touch</h2>
        <div className="mt-3">
          <SocialIcons />
        </div>
        <a
          href={`mailto:${business.email}`}
          className="mt-4 flex items-center gap-3 text-sm text-navy-foreground/80"
        >
          <Mail size={18} className="text-primary" />
          {business.email}
        </a>
        <a
          href={`tel:${business.phone}`}
          className="mt-3 flex items-center gap-3 text-sm text-navy-foreground/80"
        >
          <Phone size={18} className="text-primary" />
          {business.phoneDisplay}
        </a>

        <h2 className="mt-8 text-lg font-bold">Showroom Timings</h2>
        <p className="mt-2 text-sm text-navy-foreground/70">{business.timings}</p>

        <h2 className="mt-8 text-lg font-bold">Quick Links</h2>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-navy-foreground/70">
          <li><Link to="/categories">Shop All Products</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/store">Visit Our Store</Link></li>
          <li><Link to="/contact">Let's Connect</Link></li>
        </ul>
      </div>
      <p className="bg-primary py-3 text-center text-sm text-primary-foreground">
        Copyright © 2026 {business.name.toUpperCase()}, All rights reserved
      </p>
      <div className="h-16" />
    </footer>
  );
}
