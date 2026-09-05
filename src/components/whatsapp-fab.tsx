import Link from "next/link"; import { MessageCircle } from "lucide-react"; import { whatsappUrl } from "@/content/site";
export function WhatsAppFab() { return <Link className="whatsapp-fab" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Chat with Mahlangu Online Solutions on WhatsApp"><MessageCircle aria-hidden="true"/><span>WhatsApp us</span></Link>; }
