import React, { useContext } from "react";
import { CiLocationOn } from "react-icons/ci";
import { themeContext } from "../../App";

function Favourites(props) {
  const { id, meal, img, area, removerFavourite } = props;
  const { theme } = useContext(themeContext);
  return (
    <div>
      <div key={id} className="item">
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
          onClick={removerFavourite}
          className="cart"
        >
          Remove from favourites
        </button>
      </div>
    </div>
  );
}

export default Favourites;
