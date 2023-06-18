import React, { useContext } from "react";
import { themeContext } from "../../App";
import "./theme.css";

function Theme() {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div>
      <button
        className="themeButton"
        onClick={() => setTheme(!theme)}
        style={theme ? { backgroundColor: "#12343b" } : {}}
      >
        ChangeTheme
      </button>
    </div>
  );
}

export default Theme;
