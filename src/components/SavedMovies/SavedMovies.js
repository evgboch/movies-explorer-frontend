import "./SavedMovies.css";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <main className="saved-movies-page">
      <MoviesContainer>
        <SearchForm />
        <MoviesCardList />
      </MoviesContainer>
    </main>
  )
}

export default SavedMovies;
