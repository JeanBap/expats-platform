import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expats Platform Italy",
  description: "Find the best cities to live as an expat in Italy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
