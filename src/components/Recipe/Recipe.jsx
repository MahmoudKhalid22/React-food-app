import React from "react";
import "./recipe.css";
import { CiLocationOn } from "react-icons/ci";
import { useContext } from "react";
import { themeContext } from "../../App";

function Recipe(props) {
  const { id, meal, img, area, addFavourite } = props;
  const { theme } = useContext(themeContext);
  return (
    <div>
      <div key={id} className="item" id="item">
        {/* <h3 className="info">
          {item.length > 0 ? item[0].strMeal : "There in no meals now"}
        </h3> */}
        <h4 className="item-title">{meal}</h4>
        <img src={img} alt="Recipie img" />
        <div className="location">
          <CiLocationOn className="location-icon" />
          <p className="area">{area}</p>
        </div>
        <button
          style={theme ? { backgroundColor: "#12343b" } : {}}
          type="submit"
          onClick={addFavourite}
          className="cart"
        >
          Add To favourites
        </button>
      </div>
    </div>
  );
}

export default Recipe;
