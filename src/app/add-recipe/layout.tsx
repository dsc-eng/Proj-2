import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a Recipe — tastecraft",
  description:
    "Share your culinary creation with the tastecraft community. Add your favorite recipes for everyone to enjoy.",
};

export default function AddRecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
