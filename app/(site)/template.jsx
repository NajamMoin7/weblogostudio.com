import { ViewTransition } from "react";

/**
 * Page transition as a sheet change. A template remounts on every navigation, so this
 * <ViewTransition> enters and exits per route. React animates it only inside a transition
 * (client navigation), never on the first load, so the first paint is untouched. The header
 * is anchored with its own view-transition-name (see globals.css). Browsers without the
 * View Transitions API swap instantly.
 */
export default function SiteTemplate({ children }) {
  return (
    <ViewTransition enter="sheet" exit="sheet" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
