import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "KyberonAI | Open-Source Reliability for AI Agents",
  description:
    "KyberonAI builds focused open-source reliability software for AI agents: Attesta for action verification and MemProof for memory correctness.",
  keywords: [
    "AI agents",
    "open source",
    "HITL",
    "agent reliability",
    "attestation",
    "agent memory",
    "KyberonAI",
  ],
  openGraph: {
    title: "KyberonAI | Open-Source Reliability for AI Agents",
    description:
      "Attesta and MemProof: open-source reliability infrastructure for production AI agents.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/kyberon-icon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/kyberon-icon.svg?v=2",
    apple: "/kyberon-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-inter)] antialiased`}
      >
        <div className="dot-grid" aria-hidden="true" />
        <div className="top-glow" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
