import { useState } from "react";

import { useAllRecipes } from "./hooks/use-all-recipes.hook";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { Loader } from "../../components/loader/loader";
import { ErrorDisplay } from "../../components/error/error-display";
import styles from "./recipes.module.css";

const Recipes: React.FC = () => {
  const { data: recipes, isLoading, error } = useAllRecipes();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = recipes?.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div className={styles.recipesContainer}>
      <div className={styles.recipes}>
        {paginatedItems?.map(recipe => (
          <RecipeCard meal={recipe} key={recipe.idMeal} />
        ))}
      </div>

      {recipes && (
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage(prev =>
                endIndex < recipes.length ? prev + 1 : prev
              )
            }
            disabled={endIndex >= recipes.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export { Recipes };
