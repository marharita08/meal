import { useParams } from "react-router-dom";

import { useRecipe } from "./hooks/use-recipe.hook";
import { type Meal } from "../../types/meal.type";
import styles from "./recipe.module.css";
import { Loader } from "../../components/loader/loader";
import { ErrorDisplay } from "../../components/error/error-display";

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: meal, error, isLoading } = useRecipe(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (!meal) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className={styles.recipeContainer}>
      <h1 className={styles.recipeTitle}>{meal.strMeal}</h1>
      <div className={styles.recipeHead}>
        <div>
          <img
            className={styles.recipeImage}
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </div>
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
              const ingredient = meal[`strIngredient${i}` as keyof Meal];
              const measure = meal[`strMeasure${i}` as keyof Meal];
              if (ingredient && measure) {
                return (
                  <li key={i}>
                    {ingredient}: {measure}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>

      <div className={styles.recipeDetails}>
        <div className={styles.recipeCategories}>
          {meal.strTags && (
            <>
              {meal.strTags
                .split(",")
                .map(tag => `#${tag}`)
                .join(" ")}
            </>
          )}

          <div>
            <strong>Category:</strong> {meal.strCategory}
          </div>
          <div>
            <strong>Area:</strong> {meal.strArea}
          </div>
        </div>
        <p>{meal.strInstructions}</p>

        {meal.strYoutube && (
          <a
            className={styles.link}
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        )}
        {meal.strSource && (
          <p>
            <strong>Source:</strong>{" "}
            <a
              className={styles.link}
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
            >
              {meal.strSource}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export { Recipe };
