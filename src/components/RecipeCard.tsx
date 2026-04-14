"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/recipe/${recipe.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm hover:shadow-xl transition-all duration-500">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full bg-white/90 dark:bg-black/60 dark:text-white backdrop-blur-md text-gray-800">
                {recipe.category}
              </span>
            </div>

            {/* Time Badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-white/90 dark:bg-black/60 dark:text-white backdrop-blur-md text-gray-800 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {recipe.time}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            <h3 className="font-display text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-primary-500 transition-colors duration-300 line-clamp-1">
              {recipe.title}
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>

            {/* Meta */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-[var(--muted)]">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  {recipe.servings} servings
                </span>
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-[var(--muted)]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      recipe.difficulty === "Easy"
                        ? "bg-green-400"
                        : recipe.difficulty === "Medium"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                  />
                  {recipe.difficulty}
                </span>
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
