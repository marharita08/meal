import { useQueryClient } from "@tanstack/react-query";

import { Meal } from "../types/meal.type";

const cartKey = "cart";

type UseCartActions = {
  addToCart: (recipe: Meal) => void;
  removeFromCart: (recipeId: number) => void;
  isInCart: (recipeId: number) => boolean;
  cart: Meal[];
};

const useCart = (): UseCartActions => {
  const queryClient = useQueryClient();

  const addToCart = (recipe: Meal) => {
    queryClient.setQueryData<Meal[]>([cartKey], (prevCart = []) => {
      if (!prevCart.find(item => item.idMeal === recipe.idMeal)) {
        return [...prevCart, recipe];
      }
      return prevCart;
    });
  };

  const removeFromCart = (recipeId: number) => {
    queryClient.setQueryData<Meal[]>([cartKey], (prevCart = []) =>
      prevCart.filter(item => item.idMeal !== recipeId)
    );
  };

  const getCart = () => {
    return queryClient.getQueryData<Meal[]>([cartKey]) || [];
  };

  const isInCart = (recipeId: number) => {
    const cart = getCart();
    return cart.some(item => item.idMeal === recipeId);
  };

  return {
    cart: getCart(),
    addToCart,
    removeFromCart,
    isInCart
  };
};

export { useCart };
