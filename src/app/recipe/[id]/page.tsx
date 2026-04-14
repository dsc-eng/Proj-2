"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getRecipeById, recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipe = getRecipeById(params.id as string);

  if (!recipe) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-display font-bold">Recipe Not Found</h1>
        <p className="mt-2 text-[var(--muted)]">
          The recipe you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/recipes"
          className="inline-block mt-6 px-6 py-3 text-sm font-medium rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  // Get related recipes (same category, excluding current)
  const relatedRecipes = recipes
    .filter((r) => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);

  return (
    <div className="page-transition pt-20 sm:pt-24 pb-16 sm:pb-24">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh]"
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-black/20" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => router.back()}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 sm:p-3 rounded-full glass border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-[var(--card-bg)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] shadow-xl p-6 sm:p-8 md:p-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {recipe.category}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                recipe.difficulty === "Easy"
                  ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : recipe.difficulty === "Medium"
                  ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                  : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight">
            {recipe.title}
          </h1>

          {/* Description */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            {recipe.description}
          </p>

          {/* Meta Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            {[
              {
                label: "Cook Time",
                value: recipe.time,
                icon: (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                label: "Servings",
                value: `${recipe.servings}`,
                icon: (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                ),
              },
              {
                label: "Difficulty",
                value: recipe.difficulty,
                icon: (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                ),
              },
            ].map((meta) => (
              <div
                key={meta.label}
                className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--muted-light)] border border-[var(--card-border)]"
              >
                <div className="flex justify-center text-primary-500 mb-1 sm:mb-2">
                  {meta.icon}
                </div>
                <div className="text-sm sm:text-base font-bold text-[var(--foreground)]">
                  {meta.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)] mt-0.5">
                  {meta.label}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr className="my-8 sm:my-10 border-[var(--card-border)]" />

          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-base sm:text-lg">
                🥘
              </span>
              Ingredients
            </h2>
            <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              {recipe.ingredients.map((ingredient, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                  <span className="text-sm sm:text-base text-[var(--foreground)]">
                    {ingredient}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Divider */}
          <hr className="my-8 sm:my-10 border-[var(--card-border)]" />

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-base sm:text-lg">
                👨‍🍳
              </span>
              Instructions
            </h2>
            <ol className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              {recipe.steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 sm:gap-4"
                >
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm sm:text-base text-[var(--foreground)] leading-relaxed pt-0.5 sm:pt-1">
                    {step}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Tags */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-[var(--muted-light)] border border-[var(--card-border)] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-6 sm:mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedRecipes.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
