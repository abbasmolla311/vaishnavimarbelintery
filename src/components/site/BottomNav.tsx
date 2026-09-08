import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Store, Newspaper } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/categories", label: "Categories", Icon: LayoutGrid },
  { to: "/blog", label: "Blog", Icon: Newspaper },
  { to: "/store", label: "Store", Icon: Store },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy bg-navy text-navy-foreground">
      <ul className="mx-auto grid max-w-6xl grid-cols-4">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px]"
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "flex flex-col items-center gap-1 py-2.5 text-[11px] text-primary" }}
            >
              <Icon size={22} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
