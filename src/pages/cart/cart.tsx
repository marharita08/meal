import { useCart } from "../../hooks/use-cart.hook";
import RecipeCard from "../../components/recipe-card/recipe-card";
import styles from "./cart.module.css";
import { Meal } from "../../types/meal.type";

const Cart: React.FC = () => {
  const { cart } = useCart();

  const ingredientsMap = cart.reduce(
    (acc, meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof Meal] as
          | string
          | null;
        const measure = meal[`strMeasure${i}` as keyof Meal] as string | null;
        if (ingredient && measure) {
          acc[ingredient] = acc[ingredient]
            ? `${String(acc[ingredient])} + ${measure}`
            : measure;
        }
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const ingredientsList = Object.entries(ingredientsMap)
    .map(([ingredient, measure]) => `${ingredient}: ${measure}`)
    .sort();

  if (cart.length === 0) {
    return <div className={styles.empty}>Your cart is empty!</div>;
  }

  return (
    <div className={styles.cart}>
      <div className={styles.content}>
        <div className={styles.recipes}>
          {cart.map(meal => (
            <div key={meal.idMeal} className={styles.recipe}>
              <div>
                <RecipeCard meal={meal} />
              </div>
              <div className={styles.instructions}>
                <p className={styles.mealInstructions}>
                  {meal.strInstructions}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ingredients}>
          <h2 className={styles.title}>Total Ingredients</h2>
          <ul className={styles.list}>
            {ingredientsList.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Cart };
