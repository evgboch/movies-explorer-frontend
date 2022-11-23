import "./SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearch, setIsLoading, isShort, setIsShort, setUserReq, validation }) {
  const location = useLocation().pathname;

  React.useEffect(() => {
    if ((location === "/movies") && localStorage.getItem("movieReq")) {
      validation.setInputValues({movie: localStorage.getItem("movieReq")});
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (location === "/movies") {
      localStorage.setItem("movieReq", validation.inputValues.movie);
      setIsLoading(true);
    } else {
      setUserReq(validation.inputValues.movie);
      console.log(validation.inputValues.movie);
    }

    onSearch();
  }

  return (
    <section className="search-form-container">
      <form noValidate className="search-form" onSubmit={ handleSubmit }>
        <input
        onChange={ validation.handleChange }
        value={validation.inputValues.movie || ""}
        className={"search-form__input" + (validation.inputErrors.movie ? " search-form__input_error" : "")}
        name="movie"
        type="text"
        placeholder="Фильм"
        required={ true } />
        <button
        className={"search-form__submit-button" + (!validation.isValid ? " search-form__submit-button_disabled" : "")}
        type="submit"
        disabled={ validation.isValid ? false : true }>
          Найти
        </button>
        <span className={"search-form__input-error" + (validation.inputErrors.movie ? " search-form__input-error_visible" : "")}>
          { validation.inputErrors.movie }
        </span>
      </form>
      <FilterCheckbox isShort={ isShort } setIsShort={ setIsShort } />
    </section>
  )
}

export default SearchForm;
