import "./Movies.css";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <div className="movies">
      <MoviesContainer>
        <Header />
        <SearchForm />
      </MoviesContainer>
    </div>
  )
}

export default Movies;
