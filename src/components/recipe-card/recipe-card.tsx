import { Link } from "react-router-dom";

import { type Meal } from "../../types/meal.type";

import styles from "./recipe-card.module.css";

type RecipeCardProps = {
  meal: Meal;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  return (
    <Link to={`/recipes/${meal.idMeal}`}>
      <div className={styles.card}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{meal.strMeal}</h2>
          <p className={styles.category}>Category: {meal.strCategory}</p>
          <p className={styles.area}>Origin: {meal.strArea}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
