import { Phone, MessageCircle } from "lucide-react";
import { business, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-3 z-50 flex flex-col items-end gap-3">
      <a
        href={`tel:${business.phone}`}
        aria-label="Call us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-primary shadow-lg"
      >
        <Phone size={22} />
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-lg"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
