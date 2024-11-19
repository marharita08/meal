import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchAllCategories } from "../fetch/fetch-all-categories";
import { type Category } from "../../../types/category.type";

const useAllCategories = (): UseQueryResult<Category[], Error> => {
  return useQuery<Category[], Error>({
    queryKey: ["allCategories"],
    queryFn: fetchAllCategories
  });
};

export { useAllCategories };
