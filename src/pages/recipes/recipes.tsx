import { useAllRecipes } from "./hooks/use-all-recipes.hook";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { Loader } from "../../components/loader/loader";
import { ErrorDisplay } from "../../components/error/error-display";
import { Pagination } from "../../components/pagination/pagination";
import { usePagination } from "./hooks/use-pagination.hook";
import styles from "./recipes.module.css";
import { Link } from "react-router-dom";

const Recipes: React.FC = () => {
  const { data: recipes, isLoading, error } = useAllRecipes();
  const itemsPerPage = 8;

  const {
    paginatedItems,
    totalPages,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    visiblePages
  } = usePagination(recipes, itemsPerPage);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div className={styles.recipesContainer}>
      <Link to={"/cart"}> Go to cart</Link>
      <div className={styles.recipes}>
        {paginatedItems?.map(recipe => (
          <RecipeCard meal={recipe} key={recipe.idMeal} />
        ))}
      </div>

      {recipes && totalPages > 1 && (
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
