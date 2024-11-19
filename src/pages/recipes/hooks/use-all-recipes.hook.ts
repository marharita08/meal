import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchAllRecipes } from "../fetch/fetch-all-recipes";
import { type Meal } from "../../../types/meal.type";

const useAllRecipes = (): UseQueryResult<Meal[], Error> => {
  return useQuery<Meal[], Error>({
    queryKey: ["allRecipes"],
    queryFn: fetchAllRecipes
  });
};

export { useAllRecipes };
