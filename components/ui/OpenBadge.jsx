/** "Open 24 hours" with a live green dot. Static markup: no clock, no client JavaScript. */
export default function OpenBadge({ className = "", tone = "default" }) {
  return (
    <p className={`flex items-center gap-2 text-[0.8rem] ${tone === "quiet" ? "text-subtle" : "text-muted"} ${className}`}>
      <span aria-hidden="true" className="relative inline-flex size-2 rounded-full bg-success">
        <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:hidden" />
      </span>
      <span>
        <span className="font-semibold text-fg">Open 24 hours</span>, 7 days a week
      </span>
    </p>
  );
}
