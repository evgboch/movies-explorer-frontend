import "./SavedMovies.css";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies }) {
  return (
    <main className="saved-movies-page">
      <MoviesContainer>
        <SearchForm />
        <MoviesCardList movies={ savedMovies } />
      </MoviesContainer>
    </main>
  )
}

export default SavedMovies;
