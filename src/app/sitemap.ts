import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFreq: "monthly" },
    { path: "/sluzby", priority: 0.9, changeFreq: "monthly" },
    { path: "/portfolio", priority: 0.8, changeFreq: "monthly" },
    { path: "/reference", priority: 0.8, changeFreq: "monthly" },
    { path: "/o-nas", priority: 0.6, changeFreq: "yearly" },
    { path: "/kontakt", priority: 0.7, changeFreq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));
}
