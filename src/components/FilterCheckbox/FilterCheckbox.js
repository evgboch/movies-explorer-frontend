import "./FilterCheckbox.css";
import React from "react";

function FilterCheckbox() {
  return (
    <div className="checkbox">
      <p className="checkbox__title">Короткометражки</p>
      <input className="checkbox__input" type="checkbox" id="switch" />
      <label className="checkbox__round" htmlFor="switch"></label>
    </div>
  )
}

export default FilterCheckbox;
