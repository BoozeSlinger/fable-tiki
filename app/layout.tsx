import type { Metadata } from "next";
import { Rye, Space_Grotesk, Oswald, Monoton } from "next/font/google";
import "./globals.css";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-eyebrow",
  display: "swap",
});
const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-neon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Last Call Collective · The House Standard",
  description:
    "By the industry, for the industry. We build the revenue engine that puts asses in your barstools — websites, AI visibility, and content for independent bars. Experience in the bar and behind it, not just behind a screen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = [
    rye.variable,
    spaceGrotesk.variable,
    oswald.variable,
    monoton.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
