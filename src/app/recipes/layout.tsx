import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Recipes — tastecraft",
  description:
    "Browse our complete collection of handcrafted recipes. Filter by category, search by ingredients, and find your next favorite dish.",
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
