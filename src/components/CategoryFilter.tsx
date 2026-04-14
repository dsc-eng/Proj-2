"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/recipes";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category)}
          className={`relative px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
            selected === category
              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20 category-active"
              : "bg-[var(--muted-light)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
