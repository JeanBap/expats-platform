import type { Metadata } from "next";
import { AuthProvider } from "./lib/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expats Platform Italy",
  description: "Find the best cities to live as an expat in Italy",
};

// Root layout that wraps the app with AuthProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
