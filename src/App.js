import { useState, useEffect } from "react";
import "./App.css";
import Favourites from "./components/Favourties/Favourites";
import Recipe from "./components/Recipe/Recipe";
import Search from "./components/Search/Search";

const dummyData = "dummyData";

function App() {
  //  Loading State
  const [loading, setLoading] = useState(false);
  // Favourite state
  const [favourites, setFavourites] = useState([]);
  //  Save results that we recieve from api
  const [recipes, setRecipes] = useState([]);

  // search function
  const getDataFromSearchComponent = (getData) => {
    setLoading(true);
    async function FetchData() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${getData}`
      );
      const { meals } = await res.json();
      // !meals ? setLoading(true) : setLoading(false);
      // console.log(meals);

      if (meals && meals.length > 0) {
        // Loading state will be false as it finished loading and recipe will be meals
        setLoading(false);
        setRecipes(meals);
      }
      // console.log(!meals);
      // meals === null ? setLoading(false)
      if (!meals) {
        setLoading(false);
        setRecipes([]);
      }
      // console.log(data.meals);
    }
    FetchData();
    // console.log(getData)
  };

  // add favourite function
  const addFavourite = (getCurrentRecipieItem) => {
    // console.log(getCurrentRecipieItem);
    let cpyFavourites = [...favourites];

    const index = cpyFavourites.findIndex(
      (category) => category.idMeal === getCurrentRecipieItem.idMeal
    );

    if (index === -1) {
      cpyFavourites.push(getCurrentRecipieItem);
      setFavourites(cpyFavourites);
      // SET THE FAVOURITES IN LOCAL STORAGE
      localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
    } else {
      alert("Already added to favourite");
    }
  };

  // Remove favourites
  const removeFavourite = (category) => {
    // console.log(category);
    let cpyFavourites = [...favourites];
    cpyFavourites = cpyFavourites.filter((e) => e.idMeal !== category);
    console.log(cpyFavourites);
    setFavourites(cpyFavourites);
    // SET THE FAVOURITES IN LOCAL STORAGE
    localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
  };

  // Get Items from localstorage
  useEffect(() => {
    const getFavouritesFromStorage = JSON.parse(
      localStorage.getItem("favourites")
    );

    setFavourites(getFavouritesFromStorage);
  }, []);
  console.log(favourites);
  return (
    <div className="App">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummy-data={dummyData}
      />
      <p className="loading">{loading ? "loading...." : null}</p>
      <h2 className="favourites">Favourites</h2>
      <div className="container">
        {favourites && favourites.length > 0
          ? favourites.map((cat) => (
              <Favourites
                removerFavourite={() => removeFavourite(cat.idMeal)}
                id={cat.idMeal}
                meal={cat.strMeal}
                img={cat.strMealThumb}
                area={cat.strArea}
              />
            ))
          : null}
      </div>
      <div className="separation">
        <hr />
      </div>

      <div className="container">
        {recipes && recipes.length > 0 ? (
          recipes.map((item) => (
            <Recipe
              addFavourite={() => addFavourite(item)}
              id={item.idMeal}
              meal={item.strMeal}
              img={item.strMealThumb}
              area={item.strArea}
            />
          ))
        ) : (
          <p className="no-meal">
            {loading ? null : "There is no meal by this name try another one"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
