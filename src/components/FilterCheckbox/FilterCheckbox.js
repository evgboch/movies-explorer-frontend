import "./FilterCheckbox.css";
import React from "react";
import { useLocation } from "react-router-dom";

function FilterCheckbox({ isShort, setIsShort }) {
  const location = useLocation().pathname;

  function handleChange() {
    if (location === "/movies") {
      if (localStorage.getItem("movieShort") === "true") {
        localStorage.setItem("movieShort", "false");
      } else {
        localStorage.setItem("movieShort", "true");
      }
    } else {
      if (isShort === true) {
        setIsShort(false);
      } else {
        setIsShort(true);
      }
    }
  }

  return (
    <div className="checkbox">
      <p className="checkbox__title">Короткометражки</p>
      <input
        onChange={ handleChange }
        defaultChecked={ location === "/movies" ? ((localStorage.getItem("movieShort") === "true") ? true : false) : false }
        className="checkbox__input"
        type="checkbox"
        id="switch" />
      <label className="checkbox__round" htmlFor="switch"></label>
    </div>
  )
}

export default FilterCheckbox;
