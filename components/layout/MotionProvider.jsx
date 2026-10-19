"use client";

import { MotionConfig } from "motion/react";

/** Makes every Motion animation respect the visitor's reduced-motion preference. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
