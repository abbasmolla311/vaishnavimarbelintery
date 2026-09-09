import catMarble from "@/assets/cat-marble.jpg";
import catVitrified from "@/assets/cat-vitrified.jpg";
import catBathroom from "@/assets/cat-bathroom.jpg";
import catWood from "@/assets/cat-wood.jpg";
import blogKitchen from "@/assets/blog-kitchen.jpg";
import blogLiving from "@/assets/blog-living.jpg";
import blogOutdoor from "@/assets/blog-outdoor.jpg";
import pStatuario from "@/assets/p-statuario.jpg";
import pMakrana from "@/assets/p-makrana.jpg";
import pOnyx from "@/assets/p-onyx.jpg";
import pGranite from "@/assets/p-granite.jpg";
import pVitrified from "@/assets/p-vitrified.jpg";
import pAntiskid from "@/assets/p-antiskid.jpg";
import logoAsset from "@/assets/logo.jpeg.asset.json";
import ownerAsset from "@/assets/owner.png.asset.json";

export const brandLogo = logoAsset.url;
export const ownerPhoto = ownerAsset.url;

export const business = {
  name: "Vaishnavi Marble",
  tagline: "Beauty In Every Stone",
  phone: "+919330300408",
  phoneDisplay: "+91 93303 00408",
  phoneAlt: "+919836344786",
  phoneAltDisplay: "+91 98363 44786",
  whatsapp: "917003948297",
  whatsappDisplay: "+91 70039 48297",
  email: "marblevaishnavi@gmail.com",
  address:
    "Krishnapur Taruliya Main Road (near Chanchal Kumari Girls High School), Sonartari Apartment, P.S. New Town, Kolkata - 700102",
  timings: "10:00 AM - 8:00 PM (Open all days)",
  rating: 4.4,
  reviewCount: 164,
  mapQuery:
    "Vaishnavi Marble, Krishnapur Taruliya Main Road, Sonartari Apartment, New Town, Kolkata 700102",
  social: {
    facebook: "https://www.facebook.com/share/r/1C3UknFSt3/",
    instagram: "https://www.facebook.com/share/r/1C3UknFSt3/",
    youtube: "https://www.facebook.com/share/r/1C3UknFSt3/",
    linkedin: "https://www.facebook.com/share/r/1C3UknFSt3/",
    pinterest: "https://www.facebook.com/share/r/1C3UknFSt3/",
  },
};

export const whatsappLink = (msg = "Hi, I would like to enquire about tiles & marble.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(msg)}`;

export type NavGroup = {
  label: string;
  items: string[];
};

export const navGroups: NavGroup[] = [
  {
    label: "All Marble",
    items: [
      "View All Marble",
      "Italian Marble",
      "Makrana Marble",
      "Statuario Marble",
      "Onyx Marble",
      "Imported Marble Collection",
    ],
  },
  {
    label: "Floor Tiles",
    items: ["Vitrified Tiles", "Double Charge Tiles", "Glazed Vitrified", "Wood Finish Tiles"],
  },
  {
    label: "Wall Tiles",
    items: ["Ceramic Wall Tiles", "Highlighter Tiles", "3D Wall Tiles", "Elevation Tiles"],
  },
  {
    label: "Bathroom Tiles",
    items: ["Anti Skid Tiles", "Bathroom Wall Tiles", "Sanitary & Fittings"],
  },
  {
    label: "Kitchen Tiles",
    items: ["Dado Tiles", "Backsplash Tiles", "Kitchen Countertops"],
  },
  {
    label: "Granite",
    items: ["Black Granite", "Steel Grey Granite", "Kitchen Platform Granite"],
  },
  {
    label: "Outdoor & Parking",
    items: ["Parking Tiles", "Terrace Tiles", "Paver Blocks"],
  },
];

export const categories = [
  { name: "Italian Marble", image: catMarble },
  { name: "Vitrified Tiles", image: catVitrified },
  { name: "Bathroom Tiles", image: catBathroom },
  { name: "Wood Finish Tiles", image: catWood },
];

export type Product = {
  name: string;
  category: string;
  size: string;
  price: string;
  image: string;
};

export const products: Product[] = [
  {
    name: "Statuario Italian Marble",
    category: "Italian Marble",
    size: "1200 x 2400 mm slab",
    price: "₹350 / sq ft",
    image: pStatuario,
  },
  {
    name: "Makrana White Marble",
    category: "Indian Marble",
    size: "600 x 1200 mm",
    price: "₹185 / sq ft",
    image: pMakrana,
  },
  {
    name: "Honey Onyx Marble",
    category: "Onyx Marble",
    size: "800 x 1600 mm slab",
    price: "₹620 / sq ft",
    image: pOnyx,
  },
  {
    name: "Black Galaxy Granite",
    category: "Granite",
    size: "600 x 1800 mm slab",
    price: "₹240 / sq ft",
    image: pGranite,
  },
  {
    name: "Beige Glazed Vitrified Tile",
    category: "Floor Tiles",
    size: "800 x 800 mm",
    price: "₹78 / sq ft",
    image: pVitrified,
  },
  {
    name: "Grey Anti-Skid Parking Tile",
    category: "Outdoor & Parking",
    size: "300 x 300 mm",
    price: "₹52 / sq ft",
    image: pAntiskid,
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kitchen-dado-tile-ideas",
    title: "Kitchen Dado Tile Ideas That Make Plain Cabinets Look Premium",
    excerpt:
      "Patterned dado tiles are the fastest way to lift a simple kitchen. Here are the combinations our Kolkata customers love most.",
    category: "Kitchen Tiles",
    date: "12 August 2026",
    readTime: "5 min read",
    image: blogKitchen,
    body: [
      "A dado tile is the strip of tiling between your kitchen counter and the overhead cabinets. It takes the most heat, oil and scrubbing in the whole house, so the material matters as much as the pattern.",
      "Glossy ceramic dado tiles in a 300x600 mm format are the easiest to clean and reflect light back into a narrow kitchen. If your cabinets are plain laminate, a patterned Moroccan or geometric dado instantly adds character without any carpentry work.",
      "For a calmer look, pick a marble-effect dado in the same tone as your countertop and let the veining do the work. Darker cabinets pair beautifully with off-white veined tiles, while light wood cabinets suit warm beige.",
      "Visit our Kestopur showroom to see full dado panels mounted at real kitchen height before you decide.",
    ],
  },
  {
    slug: "marble-vs-vitrified-flooring",
    title: "Marble or Vitrified Tiles: Which Flooring Suits Your Home?",
    excerpt:
      "Both look stunning in a living room. The right pick depends on budget, maintenance and how much traffic your floor takes.",
    category: "Flooring Guide",
    date: "2 August 2026",
    readTime: "6 min read",
    image: blogLiving,
    body: [
      "Natural marble is a stone with unique veining in every slab. No two floors ever look the same, and a well-polished marble floor keeps its depth for decades.",
      "Vitrified tiles are engineered, so the finish is uniform, the water absorption is very low and the price per square foot is usually friendlier. Large format 800x1600 mm vitrified slabs now mimic marble closely enough that most visitors cannot tell the difference.",
      "Choose marble if you want a genuine premium stone and are comfortable with periodic polishing. Choose vitrified if you want a low-maintenance, scratch-resistant floor for a busy family home.",
      "Whichever you pick, always buy 8-10% extra for cutting wastage and future repairs.",
    ],
  },
  {
    slug: "outdoor-tiles-monsoon-kolkata",
    title: "Choosing Anti-Skid Outdoor Tiles for Kolkata Monsoons",
    excerpt:
      "Terraces, balconies and driveways need grip first, looks second. Here is how to read the anti-skid rating before you buy.",
    category: "Outdoor Tiles",
    date: "22 July 2026",
    readTime: "4 min read",
    image: blogOutdoor,
    body: [
      "Kolkata's long monsoon makes slip resistance a safety issue, not a preference. Look for a matte or structured surface with an R11 rating or higher for open terraces and driveways.",
      "Parking tiles carry heavy point loads, so thickness matters. A 20 mm heavy-duty tile will outlast a standard 9 mm floor tile under a car by many years.",
      "Lighter tones stay cooler underfoot on a terrace, while grey and charcoal hide dust better on a driveway. Keep the joints slightly wider outdoors so water drains away quickly.",
      "We stock full outdoor ranges in the showroom, and our team can help you calculate exactly how many boxes your area needs.",
    ],
  },
];
