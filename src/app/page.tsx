"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { useState, useRef } from "react";
import { getFeaturedRecipes, getRecipesByCategory, recipes } from "@/data/recipes";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const featured = getFeaturedRecipes();
  const filtered = getRecipesByCategory(selectedCategory);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const stats = [
    { label: "Recipes", value: `${recipes.length}+` },
    { label: "Categories", value: "8" },
    { label: "Avg. Time", value: "20min" },
  ];

  return (
    <div className="page-transition">
      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-warm-200/40 dark:bg-warm-900/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-sage-200/30 dark:bg-sage-900/15 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                Crafted with love
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 sm:mt-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-balance"
            >
              Discover{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-warm-500">
                  Delicious
                </span>
              </span>{" "}
              Recipes
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed"
            >
              From quick weekday meals to weekend showstoppers — explore recipes
              that make every meal a moment to savor.
            </motion.p>

            {/* Search */}
            <motion.div variants={fadeUp} custom={3} className="mt-8 sm:mt-10">
              <SearchBar />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 sm:mt-14 flex items-center justify-center gap-8 sm:gap-12"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[var(--foreground)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-[var(--muted)]/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--muted)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ====== FEATURED RECIPES ====== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12"
          >
            <div>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-500">
                Handpicked for you
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                Featured Recipes
              </h2>
            </div>
            <Link
              href="/recipes"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1 group"
            >
              View all recipes
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== HORIZONTAL PARALLAX SCROLL ====== */}
      <section ref={targetRef} className="py-16 sm:py-24 overflow-hidden bg-[var(--background)]">
        <div className="flex flex-col gap-4 sm:gap-8">
          <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-4 sm:gap-8 items-center">
            {[...Array(4)].map((_, i) => (
              <div key={`row1-${i}`} className="flex gap-4 sm:gap-8 items-center shrink-0">
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-warm-500 drop-shadow-sm">
                  TASTECRAFT
                </span>
                <span className="text-3xl sm:text-5xl text-[var(--muted)]/40">✦</span>
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-[var(--foreground)] drop-shadow-sm">
                  DELICIOUS
                </span>
                <span className="text-3xl sm:text-5xl text-[var(--muted)]/40">✦</span>
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-transparent" style={{ WebkitTextStroke: "2px var(--muted)", opacity: 0.6 }}>
                  RECIPES
                </span>
                <span className="text-3xl sm:text-5xl text-[var(--muted)]/40">✦</span>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-4 sm:gap-8 items-center -ml-[20%]">
            {[...Array(4)].map((_, j) => (
              <div key={`row2-${j}`} className="flex gap-4 sm:gap-8 items-center shrink-0">
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-transparent" style={{ WebkitTextStroke: "2px var(--muted)", opacity: 0.6 }}>
                  COOKING
                </span>
                <span className="text-3xl sm:text-5xl text-[var(--muted)]/40">✦</span>
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-[var(--foreground)] drop-shadow-sm">
                  PASSION
                </span>
                <span className="text-3xl sm:text-5xl text-[var(--muted)]/40">✦</span>
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-warm-500 to-primary-400 drop-shadow-sm">
                  INSPIRATION
                </span>
                <span className="text-3xl sm:text-5xl text-[var(--muted)]/40">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== BROWSE BY CATEGORY ====== */}
      <section className="py-16 sm:py-24 bg-[var(--muted-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-500">
              Find what you love
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Browse by Category
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.slice(0, 6).map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
          </div>

          {filtered.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-12"
            >
              <Link
                href={`/recipes?category=${selectedCategory}`}
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-sm font-medium rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                View all {selectedCategory !== "All" ? selectedCategory : ""}{" "}
                recipes
                <svg
                  className="w-4 h-4"
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
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-warm-600 p-8 sm:p-12 md:p-16 text-center"
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Got a Recipe to Share?
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/80 max-w-lg mx-auto">
                Add your favorite recipes to our collection and share the joy of
                cooking with everyone.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-6 sm:mt-8"
              >
                <Link
                  href="/add-recipe"
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-full bg-white text-primary-600 hover:bg-white/90 transition-colors duration-300 shadow-xl"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add Your Recipe
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
