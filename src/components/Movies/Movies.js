import "./Movies.css";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <main className="movies-page">
      <MoviesContainer>
        <SearchForm />
        <MoviesCardList view="movies" />
      </MoviesContainer>
    </main>
  )
}

export default Movies;
