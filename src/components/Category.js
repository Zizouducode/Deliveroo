import { memo } from "react";
import Meal from "./Meal";

const Category = ({ category, handleAddToCart }) => {
  console.log("Categroy re-render");
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal) => {
          return (
            <Meal key={meal.id} meal={meal} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Category);
