import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="search-form-container">
      <form className="search-form" onSubmit={ handleSubmit }>
        <input className="search-form__input" type="text" placeholder="Фильм" required="true" />
        <button className="search-form__submit-button" type="submit">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;
