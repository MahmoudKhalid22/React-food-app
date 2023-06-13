import { useState } from "react";
import "./App.css";
import Recipe from "./components/Recipe/Recipe";
import Search from "./components/Search/Search";

const dummyData = "dummyData";

function App() {
  //  Loading State
  const [loading, setLoading] = useState(false);

  //  Save results that we recieve from api
  const [recipes, setRecipes] = useState([]);

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
      // console.log(data.meals);
    }
    FetchData();
    // console.log(getData)
  };
  console.log(loading, recipes);
  return (
    <div className="App">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummy-data={dummyData}
      />
      <p>{loading ? "loading...." : null}</p>

      <div className="container">
        {recipes && recipes.length > 0
          ? recipes.map((item) => <Recipe item={item} />)
          : null}
      </div>
    </div>
  );
}

export default App;
