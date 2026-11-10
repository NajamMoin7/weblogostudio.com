/** Instagram and Facebook glyphs drawn in the same 24px, 1.75 stroke as the lucide icon set. */
const paths = {
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M17.6 6.4h.01" strokeWidth="2.6" />
    </>
  ),
  Facebook: <path d="M15 3h-2.6A4.4 4.4 0 0 0 8 7.4V10H5.5v3.6H8V21h3.7v-7.4h2.8l.6-3.6h-3.4V7.6c0-.6.4-1 1-1H15z" />,
};

export default function SocialIcon({ name, className = "size-[1.05rem]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
