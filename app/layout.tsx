import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masters of Programming - University Club Portal",
  description: "Join the premier community for developers at University Abbas Laghrour Khenchela. Learn, innovate, and collaborate with fellow programmers.",
  keywords: "programming, club, university, developers, coding, workshops, hackathons",
  authors: [{ name: "Masters of Programming Team" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mastersofprogramming.vercel.app",
    siteName: "Masters of Programming",
    title: "Masters of Programming - University Club Portal",
    description: "Join the premier community for developers at University Abbas Laghrour Khenchela",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
