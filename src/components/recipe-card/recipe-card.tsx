import { Link } from "react-router-dom";

import { type Meal } from "../../types/meal.type";
import { useCart } from "../../hooks/use-cart.hook";
import styles from "./recipe-card.module.css";
import { useCallback, useState } from "react";

type RecipeCardProps = {
  meal: Meal;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [inCart, setInCart] = useState(isInCart(meal.idMeal));

  const handleCartToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (inCart) {
        removeFromCart(meal.idMeal);
      } else {
        addToCart(meal);
      }
      setInCart(!inCart);
    },
    [inCart, meal, removeFromCart, addToCart]
  );

  return (
    <div className={styles.card}>
      <Link to={`/recipes/${meal.idMeal}`}>
        <div className={styles.imageContainer}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className={styles.image}
          />
          <button
            className={`${styles.cartButton} ${inCart ? styles.inCart : ""}`}
            onClick={handleCartToggle}
            aria-label={inCart ? "Remove from cart" : "Add to cart"}
          >
            {inCart ? "✔" : "+"}
          </button>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{meal.strMeal}</h2>
          <p className={styles.category}>Category: {meal.strCategory}</p>
          <p className={styles.area}>Origin: {meal.strArea}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
