import { AppWindow, BrainCircuit, Compass, FileUser, type LucideIcon, MailOpen, PenTool, ReceiptText, Sparkles, UserRoundSearch } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "cv-writing": FileUser,
  "cover-letters": MailOpen,
  "brand-identity": PenTool,
  "digital-presence": UserRoundSearch,
  "career-strategy": Compass,
  "receipts-processing": ReceiptText,
  "custom-apps": AppWindow,
  "ai-workflows": BrainCircuit,
};

export function ServiceIcon({ id, size = 22 }: { id: string; size?: number }) {
  const Icon = icons[id] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
