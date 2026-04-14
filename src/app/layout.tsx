import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "tastecraft — Discover Delicious Recipes",
  description:
    "Explore a curated collection of delicious recipes. From quick weekday meals to weekend showstoppers — find your next favorite dish with tastecraft.",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "meals",
    "breakfast",
    "dinner",
    "dessert",
  ],
  openGraph: {
    title: "tastecraft — Discover Delicious Recipes",
    description:
      "Explore a curated collection of delicious recipes. Find your next favorite dish.",
    type: "website",
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
