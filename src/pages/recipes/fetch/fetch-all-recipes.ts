import { type Meal } from "../../../types/meal.type";
import { envConfig } from "../../../configs/env.config";

const fetchRecipesByLetter = async (letter: string): Promise<Meal[]> => {
  const response = await fetch(`${envConfig.apiUrl}search.php?f=${letter}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();

  if (data && Array.isArray(data.meals)) {
    return data.meals as Meal[];
  }

  return [];
};

const fetchAllRecipes = async (): Promise<Meal[]> => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const promises = alphabet.map(letter => fetchRecipesByLetter(letter));
  const results = await Promise.all(promises);

  return results.flat();
};

export { fetchAllRecipes };
