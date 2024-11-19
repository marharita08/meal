import { type Meal } from "../../../types/meal.type";
import { envConfig } from "../../../configs/env.config";

const fetchSearchedRecipes = async (name: string): Promise<Meal[]> => {
  const response = await fetch(`${envConfig.apiUrl}search.php?s=${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();

  if (data && Array.isArray(data.meals)) {
    return data.meals as Meal[];
  }

  return [];
};

export { fetchSearchedRecipes };
