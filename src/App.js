import "./App.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
// Components
import Category from "./components/Category";
import Cart from "./components/Cart";

const calculateTotal = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].quantity * cart[i].price;
  }
  return total;
};

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("white");

  console.log("App re-render");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--xfxbzbd7ptfl.code.run/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = useCallback((meal) => {
    setCart((prev) => {
      const copy = [...prev];
      const mealPresent = copy.find((elem) => elem.id === meal.id);
      if (mealPresent) mealPresent.quantity++;
      else copy.push({ ...meal, quantity: 1 });
      return copy;
    });
  }, []);
  // const handleAddToCart = (meal) => {
  //   setCart((prev) => {
  //     const copy = [...prev];
  //     const mealPresent = copy.find((elem) => elem.id === meal.id);
  //     if (mealPresent) mealPresent.quantity++;
  //     else copy.push({ ...meal, quantity: 1 });
  //     return copy;
  //   });
  // };

  const handleRemoveFromCart = (meal) => {
    setCart((prev) => {
      const copy = [...prev];
      const mealPresent = copy.find((elem) => elem.id === meal.id);
      if (mealPresent.quantity === 1) {
        const index = copy.indexOf(mealPresent);
        copy.splice(index, 1);
      } else {
        mealPresent.quantity--;
      }
      return copy;
    });
  };

  let total = calculateTotal(cart);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={`App ${theme === "white" ? "theme-white" : "theme-red"}`}>
      <div className="container hero">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
        <button
          className="theme-button"
          onClick={() => {
            setTheme((prev) => (prev === "white" ? "red" : "white"));
          }}
        >
          Switch theme
        </button>
      </div>
      <div className="content">
        <div className="container sections-container">
          <section className="left-section">
            {data.categories.map((category, index) => {
              if (category.meals.length !== 0) {
                return (
                  <Category
                    key={index}
                    category={category}
                    handleAddToCart={handleAddToCart}
                  />
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="right-section">
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToCart={handleAddToCart}
              total={total}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
