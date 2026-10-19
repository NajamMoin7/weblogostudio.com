import PageLoader from "@/components/ui/PageLoader";

/**
 * Route-level fallback. It appears only while a route genuinely waits and fades in
 * after ~300ms, so prefetched static pages never show it. Unknown slugs are answered
 * with a 404 by proxy.js before rendering, so this boundary cannot create soft 404s.
 */
export default function Loading() {
  return <PageLoader />;
}
