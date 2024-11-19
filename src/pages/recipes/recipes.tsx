import { Link } from "react-router-dom";
import { useCallback, useState, ChangeEvent } from "react";
import { useDebounce } from "use-debounce";

import { useAllRecipes } from "./hooks/use-all-recipes.hook";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { Loader } from "../../components/loader/loader";
import { ErrorDisplay } from "../../components/error/error-display";
import { Pagination } from "../../components/pagination/pagination";
import { usePagination } from "./hooks/use-pagination.hook";
import styles from "./recipes.module.css";
import { useAllCategories } from "./hooks/use-all-categories.hook";
import { useSearchedRecipes } from "./hooks/use-searched-recipes.hook";

const defaultCategory = "All";

const Recipes: React.FC = () => {
  const { data: recipes, isLoading, error } = useAllRecipes();
  const { data: categories } = useAllCategories();
  const itemsPerPage = 8;
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { data: searchedRecipes } = useSearchedRecipes(debouncedQuery);

  const filteredRecipes =
    selectedCategory === defaultCategory
      ? debouncedQuery
        ? searchedRecipes
        : recipes
      : (debouncedQuery ? searchedRecipes : recipes)?.filter(
          recipe => recipe.strCategory === selectedCategory
        );

  const {
    paginatedItems,
    totalPages,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    visiblePages
  } = usePagination(filteredRecipes, itemsPerPage);

  const handleCategorySelected = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
    },
    []
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div className={styles.recipesContainer}>
      <Link to={"/cart"}> Go to cart</Link>

      <div className={styles.controls}>
        <div className={styles.filterContainer}>
          <label htmlFor="categoryFilter" className={styles.filterLabel}>
            Filter by category:
          </label>
          <select
            id="categoryFilter"
            className={styles.categoryFilter}
            value={selectedCategory}
            onChange={handleCategorySelected}
          >
            <option value={defaultCategory}>{defaultCategory}</option>
            {categories?.map(category => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.searchContainer}>
          <label htmlFor="searchInput" className={styles.searchLabel}>
            Search recipes:
          </label>
          <input
            id="searchInput"
            type="text"
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter recipe name..."
          />
        </div>
      </div>

      <div className={styles.recipes}>
        {paginatedItems?.map(recipe => (
          <RecipeCard meal={recipe} key={recipe.idMeal} />
        ))}
      </div>

      {filteredRecipes && totalPages > 1 && (
        <Pagination
          visiblePages={visiblePages}
          currentPage={currentPage}
          onPageClick={goToPage}
          onNextClick={goToNextPage}
          onPreviousClick={goToPreviousPage}
          isNextDisabled={currentPage === totalPages}
          isPreviousDisabled={currentPage === 1}
        />
      )}
    </div>
  );
};

export { Recipes };
