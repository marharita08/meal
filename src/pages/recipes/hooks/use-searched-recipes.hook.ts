import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchSearchedRecipes } from "../fetch/fetch-searched-recipes";
import { type Meal } from "../../../types/meal.type";

const useSearchedRecipes = (
  name: string | null
): UseQueryResult<Meal[], Error> => {
  return useQuery<Meal[], Error>({
    queryKey: ["searchedRecipes", name],
    queryFn: () => fetchSearchedRecipes(name!),
    enabled: !!name
  });
};

export { useSearchedRecipes };
