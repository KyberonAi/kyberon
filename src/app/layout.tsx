import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <div className="dot-grid" aria-hidden="true" />
        <div className="top-glow" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
