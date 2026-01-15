import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brilliant Inventory | Price Intelligence",
  description: "Circuit breaker price tracking and competitive intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
