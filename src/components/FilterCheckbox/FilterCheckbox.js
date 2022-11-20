import "./FilterCheckbox.css";
import React from "react";

function FilterCheckbox() {
  function handleChange() {
    if (localStorage.getItem("movieShort") === "true") {
      localStorage.setItem("movieShort", "false");
    } else {
      localStorage.setItem("movieShort", "true");
    }
  }

  return (
    <div className="checkbox">
      <p className="checkbox__title">Короткометражки</p>
      <input
      onChange={ handleChange }
      defaultChecked={(localStorage.getItem("movieShort") === "true") ? true : false}
      className="checkbox__input"
      type="checkbox"
      id="switch" />
      <label className="checkbox__round" htmlFor="switch"></label>
    </div>
  )
}

export default FilterCheckbox;
