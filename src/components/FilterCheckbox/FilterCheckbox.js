import "./FilterCheckbox.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { LOCAL_STORAGE } from "../../utils/constants";

function FilterCheckbox({ isShort, setIsShort }) {
  const location = useLocation().pathname;

  function handleChange() {
    if (location === "/movies") {
      if (localStorage.getItem(LOCAL_STORAGE.movies.short) === "true") {
        localStorage.setItem(LOCAL_STORAGE.movies.short, "false");
      } else {
        localStorage.setItem(LOCAL_STORAGE.movies.short, "true");
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
        defaultChecked={ location === "/movies" ? ((localStorage.getItem(LOCAL_STORAGE.movies.short) === "true") ? true : false) : false }
        className="checkbox__input"
        type="checkbox"
        id="switch" />
      <label className="checkbox__round" htmlFor="switch"></label>
    </div>
  )
}

export default FilterCheckbox;
