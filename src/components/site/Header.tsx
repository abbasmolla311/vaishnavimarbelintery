import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search, Camera, Heart, ShoppingBag, ChevronDown, Phone } from "lucide-react";
import { business, navGroups } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-navy text-navy-foreground">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-3">
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="p-1 text-navy-foreground"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-xl font-extrabold tracking-tight text-primary">VM</span>
          <span className="hidden text-sm font-semibold sm:inline">Vaishnavi Marble</span>
        </Link>

        <div className="ml-auto flex items-center gap-3 text-primary">
          <Search size={22} aria-hidden />
          <span className="hidden h-5 w-px bg-primary/40 sm:block" />
          <Camera size={22} className="hidden sm:block" aria-hidden />
          <a
            href={`tel:${business.phone}`}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"
          >
            Call Now
          </a>
          <Heart size={22} className="hidden sm:block" aria-hidden />
          <ShoppingBag size={22} className="hidden sm:block" aria-hidden />
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-card text-card-foreground">
          <Link to="/" onClick={() => setOpen(false)} className={menuItemClass}>Home</Link>
          <Link to="/categories" onClick={() => setOpen(false)} className={menuItemClass}>Shop All Products</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className={menuItemClass}>Blog</Link>
          <Link to="/store" onClick={() => setOpen(false)} className={menuItemClass}>Visit Our Store</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className={menuItemClass}>Let's Connect</Link>
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-3 border-b border-border px-4 py-4 text-base"
          >
            <Phone size={18} className="text-primary" />
            {business.phoneDisplay}
          </a>

          {navGroups.map((group) => {
            const isOpen = expanded === group.label;
            return (
              <div key={group.label} className="border-b border-border">
                <button
                  onClick={() => setExpanded(isOpen ? null : group.label)}
                  className={`flex w-full items-center justify-between px-4 py-4 text-left text-base font-semibold ${
                    isOpen ? "bg-navy text-navy-foreground" : ""
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <ul className="bg-secondary">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link
                          to="/categories"
                          onClick={() => setOpen(false)}
                          className="block border-b border-border px-6 py-3.5 text-[15px] text-muted-foreground"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          <div className="h-24" />
        </nav>
      )}
    </header>
  );
}

function MenuLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block border-b border-border px-4 py-4 text-base"
      activeProps={{ className: "block border-b border-border px-4 py-4 text-base text-primary font-semibold" }}
    >
      {children}
    </Link>
  );
}
