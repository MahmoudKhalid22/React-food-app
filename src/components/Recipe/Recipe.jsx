import React from "react";

function Recipe(props) {
  // console.log(props);
  const { item } = props;
  console.log(item);
  return (
    <div>
      <div className="item">
        {/* <h3 className="info">
          {item.length > 0 ? item[0].strMeal : "There in no meals now"}
        </h3> */}
        <img src={item.strMealThumb} alt="item img" />
        <p className="instructions">{item.strArea}</p>
        {/* <p>{item.strInstructions}</p> */}
      </div>
    </div>
  );
}

export default Recipe;
