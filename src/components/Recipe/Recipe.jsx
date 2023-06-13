import React, { useState } from "react";
import "./recipe.css";
import { CiLocationOn } from "react-icons/ci";

function Recipe(props) {
  const { item } = props;
  // Favourite state
  const [favourites, setFavourites] = useState([]);
  // favourite function
  const addFavourites = (getCurrentRecipieItem) => {
    // console.log(getCurrentRecipieItem);
    let cpyFavourites = [...favourites];

    const index = cpyFavourites.findIndex(
      (category) => category.idMeal === getCurrentRecipieItem.idMeal
    );
    console.log(index);
    if (index === -1) {
      cpyFavourites.push(getCurrentRecipieItem);
      setFavourites(cpyFavourites);
      // SET THE FAVOURITES IN LOCAL STORAGE
      localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
    } else {
      alert("Already added to favourite");
    }
    console.log(cpyFavourites);
  };

  return (
    <div>
      <div key={item.idMeal} className="item">
        {/* <h3 className="info">
          {item.length > 0 ? item[0].strMeal : "There in no meals now"}
        </h3> */}
        <h4 className="item-title">{item.strMeal}</h4>
        <img src={item.strMealThumb} alt="Recipie img" />
        <div className="location">
          <CiLocationOn className="location-icon" />
          <p className="area">{item.strArea}</p>
        </div>
        <button
          type="submit"
          onClick={() => addFavourites(item)}
          className="cart"
        >
          Add To favourites
        </button>
      </div>
    </div>
  );
}

export default Recipe;
