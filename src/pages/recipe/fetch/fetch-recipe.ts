import { type Meal } from "../../../types/meal.type";
import { envConfig } from "../../../configs/env.config";

const fetchRecipeById = async (id: string): Promise<Meal> => {
  const response = await fetch(`${envConfig.apiUrl}lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch meal");
  }

  const data = await response.json();
  const meals = data.meals as Meal[];

  if (!meals || meals.length < 1) {
    throw new Error("Recipe not found");
  }

  return meals[0];
};

export { fetchRecipeById };
