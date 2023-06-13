import React, { useState } from "react";
import "./search.css";

function Search(props) {
  // console.log(props);
  const { getDataFromSearchComponent } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
    // console.log(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        placeholder="Search Recipe"
        onChange={handleInputValue}
        value={inputValue}
        id="search"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
