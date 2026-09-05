import { services } from "./services";
export const pricing = {
  currency: "ZAR", entryPrice: 50,
  heading: "Considered work.\nAccessible beginnings.",
  intro: "Premium is the care we put into your work. Professional career services start from {price}, with a clear quote agreed before we begin.",
  disclaimer: "The starting price applies to selected career services. Your final fee and turnaround depend on scope and are confirmed in writing before work starts.",
  quoteLabel: "Personalised quote", turnaround: "Confirmed with your quote",
  items: services.map(s => ({ serviceId: s.id, from: null as number | null, turnaround: "Confirmed with your quote" })),
  packages: [
    { id: "career", name: "Your next chapter", description: "A coherent application, from the first introduction to your professional profile.", includes: ["CV & resume writing", "Cover letter", "LinkedIn profile review"] },
    { id: "brand", name: "Your brand, considered", description: "A clear visual foundation for an independent professional or growing business.", includes: ["Brand & logo direction", "Visual identity guidance", "Agreed promotional materials"] },
    { id: "digital", name: "Your presence, connected", description: "Bring your story and selected work together in one focused online presence.", includes: ["Portfolio website", "Personal brand alignment", "Profile presentation"] },
  ],
};
export const formatPrice = (value: number) => `R${new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(value)}`;
export const startingPrice = () => formatPrice(pricing.entryPrice);
