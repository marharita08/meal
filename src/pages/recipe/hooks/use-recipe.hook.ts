import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { type Meal } from "../../../types/meal.type";
import { fetchRecipeById } from "../fetch/fetch-recipe";

const useRecipe = (id: string | undefined): UseQueryResult<Meal, Error> => {
  return useQuery<Meal, Error>({
    queryKey: ["Recipe", id],
    queryFn: () => fetchRecipeById(id!),
    enabled: !!id
  });
};

export { useRecipe };
