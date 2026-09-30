import { permanentRedirect } from "next/navigation";

// Prices change too often to publish. Old links and bookmarks land on the services page instead.
export default function Pricing() {
  permanentRedirect("/services");
}
