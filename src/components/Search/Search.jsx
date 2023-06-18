import React, { useState, useContext } from "react";
import { themeContext } from "../../App";
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

  const { theme } = useContext(themeContext);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        placeholder="Search Recipe"
        onChange={handleInputValue}
        value={inputValue}
        id="search"
      />
      <button style={theme ? { backgroundColor: "#12343b" } : {}} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
