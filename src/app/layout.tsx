import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import { CommunityProvider } from "@/context/community-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThriveWithSCD",
  description: "A premium digital ecosystem for education, community, healthcare, innovation, and belonging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CommunityProvider>{children}</CommunityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
