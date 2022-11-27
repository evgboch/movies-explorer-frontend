import "./SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ isDisabled, onSearch, setIsLoading, isShort, setIsShort, validation }) {
  const location = useLocation().pathname;

  React.useEffect(() => {
    if ((location === "/movies") && localStorage.getItem("movieReq")) {
      validation.setInputValues({movie: localStorage.getItem("movieReq")});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkValidRequestAndSearch(setIsLoading) {
    if ((validation.inputValues.movie !== "") && (validation.inputValues.movie !== undefined)) {
      if (setIsLoading) {
        localStorage.setItem("movieReq", validation.inputValues.movie);
        setIsLoading(true);
      }
      onSearch();
    } else {
      validation.setInputErrors({movie: "Заполните это поле."});
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (location === "/movies") {
      checkValidRequestAndSearch(setIsLoading);
    } else {
      checkValidRequestAndSearch();
    }
  }

  return (
    <section className="search-form-container">
      <form noValidate className="search-form" onSubmit={ handleSubmit }>
        <input
          onChange={ validation.handleChange }
          value={ validation.inputValues.movie || "" }
          className={ "search-form__input" + (validation.inputErrors.movie ? " search-form__input_error" : "") }
          name="movie"
          type="text"
          placeholder="Фильм"
          required={ true }
          disabled={ isDisabled } />
        <button
          className={ "search-form__submit-button" + ((isDisabled) ? " search-form__submit-button_disabled" : "") }
          type="submit"
          disabled={ (!isDisabled) ? false : true }>
          Найти
        </button>
        <span className={ "search-form__input-error" + (validation.inputErrors.movie ? " search-form__input-error_visible" : "") }>
          { validation.inputErrors.movie }
        </span>
      </form>
      <FilterCheckbox isShort={ isShort } setIsShort={ setIsShort } />
    </section>
  )
}

export default SearchForm;
