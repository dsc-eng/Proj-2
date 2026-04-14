"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Recipe } from "@/types/recipe";

export default function AddRecipePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Dinner",
    time: "",
    servings: 4,
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    ingredients: [""],
    steps: [""],
    tags: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ""] });
  };

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...formData.steps];
    updated[index] = value;
    setFormData({ ...formData, steps: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = {
      id: formData.title.toLowerCase().replace(/\s+/g, "-"),
      title: formData.title,
      description: formData.description,
      image: "/images/recipes/placeholder.jpg",
      category: formData.category,
      time: formData.time,
      servings: formData.servings,
      difficulty: formData.difficulty,
      ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
      steps: formData.steps.filter((s) => s.trim() !== ""),
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };

    // In a production app, this would save to a database
    console.log("New Recipe:", newRecipe);
    setSubmitted(true);
  };

  const inputStyles =
    "w-full px-4 py-3 text-sm rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300";

  const labelStyles =
    "block text-sm font-medium text-[var(--foreground)] mb-2";

  if (submitted) {
    return (
      <div className="pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
            Recipe Submitted!
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            Your recipe has been saved successfully. Thank you for sharing!
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: "",
                  description: "",
                  category: "Dinner",
                  time: "",
                  servings: 4,
                  difficulty: "Easy",
                  ingredients: [""],
                  steps: [""],
                  tags: "",
                });
              }}
              className="px-6 py-3 text-sm font-medium rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              Add Another
            </button>
            <a
              href="/recipes"
              className="px-6 py-3 text-sm font-medium rounded-full bg-[var(--muted-light)] text-[var(--foreground)] hover:bg-[var(--card-border)] transition-colors"
            >
              View Recipes
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-transition pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            Add a Recipe
          </h1>
          <p className="mt-3 text-base text-[var(--muted)]">
            Share your culinary creation with the community
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8"
        >
          {/* Basic Info */}
          <div className="bg-[var(--card-bg)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] p-5 sm:p-8 space-y-5 sm:space-y-6">
            <h2 className="font-display text-lg font-bold text-[var(--foreground)]">
              Basic Info
            </h2>

            <div>
              <label htmlFor="title" className={labelStyles}>
                Recipe Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Creamy Tomato Pasta"
                className={inputStyles}
              />
            </div>

            <div>
              <label htmlFor="description" className={labelStyles}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="A short description of your recipe..."
                className={`${inputStyles} resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className={labelStyles}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyles}
                >
                  {[
                    "Breakfast",
                    "Lunch",
                    "Dinner",
                    "Dessert",
                    "Snacks",
                    "Drinks",
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="difficulty" className={labelStyles}>
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className={inputStyles}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="time" className={labelStyles}>
                  Cook Time *
                </label>
                <input
                  id="time"
                  name="time"
                  type="text"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g., 25 min"
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="servings" className={labelStyles}>
                  Servings
                </label>
                <input
                  id="servings"
                  name="servings"
                  type="number"
                  min={1}
                  max={20}
                  value={formData.servings}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      servings: parseInt(e.target.value) || 1,
                    })
                  }
                  className={inputStyles}
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-[var(--card-bg)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] p-5 sm:p-8 space-y-4">
            <h2 className="font-display text-lg font-bold text-[var(--foreground)]">
              Ingredients
            </h2>

            <AnimatePresence>
              {formData.ingredients.map((ingredient, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2 items-center"
                >
                  <span className="text-xs text-[var(--muted)] w-6 text-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(i, e.target.value)}
                    placeholder="e.g., 2 cups flour"
                    className={`${inputStyles} flex-1`}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(i)}
                      className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors flex-shrink-0"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Ingredient
            </button>
          </div>

          {/* Steps */}
          <div className="bg-[var(--card-bg)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] p-5 sm:p-8 space-y-4">
            <h2 className="font-display text-lg font-bold text-[var(--foreground)]">
              Instructions
            </h2>

            <AnimatePresence>
              {formData.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2 items-start"
                >
                  <span className="w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2.5">
                    {i + 1}
                  </span>
                  <textarea
                    value={step}
                    onChange={(e) => updateStep(i, e.target.value)}
                    placeholder={`Step ${i + 1}...`}
                    rows={2}
                    className={`${inputStyles} flex-1 resize-none`}
                  />
                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors flex-shrink-0 mt-2"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={addStep}
              className="flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Step
            </button>
          </div>

          {/* Tags */}
          <div className="bg-[var(--card-bg)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] p-5 sm:p-8">
            <label htmlFor="tags" className={labelStyles}>
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., pasta, italian, quick (comma separated)"
              className={inputStyles}
            />
            <p className="mt-2 text-xs text-[var(--muted)]">
              Separate tags with commas
            </p>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-2xl bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300 shadow-lg shadow-primary-500/20"
          >
            Publish Recipe
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
