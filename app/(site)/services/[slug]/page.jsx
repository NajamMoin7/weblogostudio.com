import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/site";

// Every known slug is prerendered by generateStaticParams. Unknown slugs are allowed to
// block so notFound() can return a genuine 404 status instead of a streamed soft 404.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
