import {
  useState,
  useEffect,
  useReducer,
  createContext,
  useCallback,
  useMemo,
} from "react";
import "./App.css";
import Favourites from "./components/Favourties/Favourites";
import Recipe from "./components/Recipe/Recipe";
import Search from "./components/Search/Search";
import Theme from "./components/Theme/Theme";

const dummyData = "dummyData";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavourites":
      console.log(action);
      return {
        ...state,
        filteredValue: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

// USE CONTEXT AND CHANGE THEME ==> create provide consume
export const themeContext = createContext(null);

function App() {
  //  Loading State
  const [loading, setLoading] = useState(false);
  // Favourite state
  const [favourites, setFavourites] = useState([]);
  //  Save results that we recieve from api
  const [recipes, setRecipes] = useState([]);

  // use reducer
  const [state, dispatch] = useReducer(reducer, initialState);

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
  const addFavourite = useCallback(
    (getCurrentRecipieItem) => {
      let cpyFavourites = [...favourites];

      const index = cpyFavourites.findIndex(
        (category) => category.idMeal === getCurrentRecipieItem.idMeal
      );

      if (index === -1) {
        cpyFavourites.push(getCurrentRecipieItem);
        setFavourites(cpyFavourites);
        // SET THE FAVOURITES IN LOCAL STORAGE
        localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
        window.scrollTo({ top: "0", behavior: "smooth" });
      } else {
        alert("Already added to favourite");
      }
    },
    [favourites]
  );

  // Remove favourites
  const removeFavourite = (category) => {
    // console.log(category);
    let cpyFavourites = [...favourites];
    cpyFavourites = cpyFavourites.filter((e) => e.idMeal !== category);

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

  // Filter Favourites
  const filterFavouritesItems = favourites.filter((item) => {
    return item.strMeal.toLowerCase().includes(state.filteredValue);
    // console.log(item);
  });

  // PROVIDE THE CONTEXT
  const [theme, setTheme] = useState(false);

  // USE CALLBACK TO RERENDER ONLY WHEN RECIPIES CHANGE
  const renderRecipies = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return recipes.map((item) => (
        <Recipe
          addFavourite={() => addFavourite(item)}
          id={item.idMeal}
          meal={item.strMeal}
          img={item.strMealThumb}
          area={item.strArea}
        />
      ));
    } else {
      return (
        <p className="no-meal">
          {loading ? null : "There is no meal by this name try another one"}
        </p>
      );
    }
  }, [recipes, addFavourite, loading]);
  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <Theme />
        <Search
          getDataFromSearchComponent={getDataFromSearchComponent}
          dummy-data={dummyData}
        />
        <p className="loading">{loading ? "loading...." : null}</p>
        <h2 className="favourites">Favourites</h2>
        <div className="search-favourites">
          <input
            name="searchfavourites"
            placeholder="Search Favourites"
            type="text"
            onChange={(event) =>
              dispatch({ type: "filterFavourites", value: event.target.value })
            }
            value={state.filteredValue}
          />
        </div>
        <div className="containerFav">
          {filterFavouritesItems && filterFavouritesItems.length > 0
            ? filterFavouritesItems.map((cat) => (
                <Favourites
                  removerFavourite={() => removeFavourite(cat.idMeal)}
                  id={cat.idMeal}
                  meal={cat.strMeal}
                  img={cat.strMealThumb}
                  area={cat.strArea}
                />
              ))
            : null}
          {!loading && !filterFavouritesItems.length && (
            <p className="no-meal">
              There is no favourite recipes by this name
            </p>
          )}
        </div>

        <div className="separation">
          <hr />
        </div>
        <div className="container">
          {useMemo(
            () =>
              !loading && recipes && recipes.length > 0
                ? renderRecipies()
                : null,
            [loading, recipes, renderRecipies]
          )}

          {!loading && !recipes.length && (
            <p className="no-meal">
              There is no recipes by this name try another one
            </p>
          )}
        </div>
      </div>
    </themeContext.Provider>
  );
}

export default App;
