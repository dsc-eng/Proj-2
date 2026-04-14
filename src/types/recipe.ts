export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  steps: string[];
  tags: string[];
  featured?: boolean;
}

export type Category =
  | "All"
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Dessert"
  | "Snacks"
  | "Drinks"
  | "Quick Meals";
