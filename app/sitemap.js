import { services } from "@/data/services";
import { work } from "@/data/work";
import { absoluteUrl } from "@/lib/site";

export default function sitemap() {
  const staticRoutes = [
    ["/", 1.0, "monthly"],
    ["/about", 0.7, "yearly"],
    ["/services", 0.9, "monthly"],
    ["/portfolio", 0.8, "monthly"],
    ["/pricing", 0.8, "monthly"],
    ["/contact", 0.7, "yearly"],
    ["/get-a-quote", 0.8, "yearly"],
    ["/faq", 0.6, "monthly"],
    ["/privacy-policy", 0.2, "yearly"],
    ["/terms-and-conditions", 0.2, "yearly"],
  ];

  return [
    ...staticRoutes.map(([path, priority, changeFrequency]) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...work.map((p) => ({
      url: absoluteUrl(`/portfolio/${p.slug}`),
      changeFrequency: "yearly",
      // Named client projects rank above numbered, untitled pieces.
      priority: p.titleSource === "source" ? 0.6 : 0.4,
    })),
  ];
}
