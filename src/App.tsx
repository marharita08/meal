import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Recipes } from "./pages/recipes/recipes";
import { Recipe } from "./pages/recipe/recipe";
import { Cart } from "./pages/cart/cart";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
