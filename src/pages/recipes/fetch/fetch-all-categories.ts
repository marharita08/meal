import { Category } from "../../../types/category.type";
import { envConfig } from "../../../configs/env.config";

const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${envConfig.apiUrl}categories.php`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();

  if (data && Array.isArray(data.categories)) {
    return data.categories as Category[];
  }

  return [];
};

export { fetchAllCategories };
