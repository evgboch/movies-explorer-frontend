import "./Movies.css";
import React from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
// import { loadMovies } from "../../utils/MoviesApi";
import apiMov from "../../utils/MoviesApi";


function Movies() {
  const [isLoading, setIsLoading] = React.useState(false);

  function searchMovies() {
    apiMov.getMovies()
      .then((res) => {
        // debugger
        localStorage.setItem("movies", JSON.stringify(res));
        // setMovies(res);
        // console.log(movies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <main className="movies-page">
      <MoviesContainer>
        <SearchForm onSearch={ searchMovies } setIsLoading={ setIsLoading } />
        {isLoading ? <Preloader /> : <MoviesCardList view="movies" />}
      </MoviesContainer>
    </main>
  )
}

export default Movies;
