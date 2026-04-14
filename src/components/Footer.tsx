"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { href: "/", label: "Home" },
      { href: "/recipes", label: "All Recipes" },
      { href: "/add-recipe", label: "Add Recipe" },
    ],
    categories: [
      { href: "/recipes?category=Breakfast", label: "Breakfast" },
      { href: "/recipes?category=Lunch", label: "Lunch" },
      { href: "/recipes?category=Dinner", label: "Dinner" },
      { href: "/recipes?category=Dessert", label: "Dessert" },
    ],
  };

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--muted-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-primary-500">taste</span>
                <span className="text-[var(--foreground)]">craft</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              Discover delicious recipes crafted with love. From quick weekday
              meals to weekend showstoppers — find your next favorite dish.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-[var(--foreground)] mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-primary-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-[var(--foreground)] mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-primary-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-[var(--foreground)] mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Get new recipes delivered to your inbox.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
              >
                →
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {currentYear} tastecraft. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Made with ♡ by{" "}
            <span className="font-medium text-[var(--foreground)]">
              Chinmay Ingle
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
