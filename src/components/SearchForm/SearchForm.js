import "./SearchForm.css";
import { useFormWithValidation } from "../../utils/Validator.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearch, setIsLoading }) {
  const validation = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem("movieReq", validation.inputValues.movie);
    setIsLoading(true);
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
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;
