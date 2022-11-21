import "./Movies.css";
import React from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { loadMovies } from "../../utils/MoviesApi";
import LoadingError from "../LoadingError/LoadingError";


function Movies({ filterMovies, filteredMovies, setFilteredMovies, onLike, onDislike }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  function searchMovies() {
    loadMovies()
      .then((res) => {
        setIsError(false);
        // debugger
        localStorage.setItem("movies", JSON.stringify(res));
        setFilteredMovies(filterMovies(res));
        // setMovies(res);
        // console.log(movies);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      })
  }

  return (
    <main className="movies-page">
      <MoviesContainer>
        <SearchForm onSearch={ searchMovies } setIsLoading={ setIsLoading } />
        {isLoading ? <Preloader /> :
          (isError ? <LoadingError /> : <MoviesCardList movies={ filteredMovies } onLike={ onLike } onDislike={ onDislike } />)}
      </MoviesContainer>
    </main>
  )
}

export default Movies;
