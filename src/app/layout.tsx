import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXUS — Unified Products Ecosystem",
  description: "The umbrella platform for AXUS systems, spatial simulation, deterministic compute, and autonomous intelligence.",
  icons: {
    icon: "/axus-logo.png",
    apple: "/axus-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black text-white min-h-screen antialiased selection:bg-[#B61C1C]/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
