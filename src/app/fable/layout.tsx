import type { Metadata } from "next";
import "./fable.css";

export const metadata: Metadata = {
  title: "Fable koncept",
  description: "Koncept nové vizuální varianty webu Adverse.",
  // Concept page — keep it out of search results while it's a draft.
  robots: { index: false, follow: false },
};

export default function FableLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
