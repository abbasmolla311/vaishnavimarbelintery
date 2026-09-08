import { Facebook, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { business, whatsappLink } from "@/lib/site";

export function SocialIcons({ variant = "solid" }: { variant?: "solid" | "plain" }) {
  const base =
    variant === "solid"
      ? "flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground"
      : "flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground";

  const links = [
    { href: business.social.facebook, label: "Facebook", Icon: Facebook },
    { href: business.social.instagram, label: "Instagram", Icon: Instagram },
    { href: business.social.youtube, label: "YouTube", Icon: Youtube },
    { href: business.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: whatsappLink(), label: "WhatsApp", Icon: MessageCircle },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={base}>
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
