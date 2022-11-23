import "./Movies.css";
import React from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { loadMovies } from "../../utils/MoviesApi";
import LoadingError from "../LoadingError/LoadingError";


function Movies({ filteredMovies, setFilteredMovies, savedMovies, checkLikes, onLike, onDelete }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  function filterMovies(movies) {
    const newMovies = Array.from(movies).filter((movie) => {
      const lowerMovieName = movie.nameRU.toLowerCase();
      const lowerMovieReq = (localStorage.getItem("movieReq") ? localStorage.getItem("movieReq") : "").toLowerCase();

      if (localStorage.getItem("movieShort") === "true") {
        return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
      }

      return lowerMovieName.includes(lowerMovieReq);
    });
    return newMovies;
  }

  function searchMovies() {
    loadMovies()
      .then((res) => {
        setIsError(false);
        let filteredMovies = filterMovies(res);
        // localStorage.setItem("movies", JSON.stringify(filteredMovies));
        checkLikes(filteredMovies, savedMovies);
        setFilteredMovies(filteredMovies);
        localStorage.setItem("movies", JSON.stringify(filteredMovies));
        setIsLoading(false);


        // debugger
        // const moviesArray = filterMovies(JSON.stringify(res));
        // localStorage.setItem("movies", filterMovies(JSON.stringify(res)));
        // localStorage.setItem("movies", res);
        // setFilteredMovies(localStorage.getItem("movies"));
        // setMovies(res);
        // console.log(movies);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      })
  }

  // console.log(filteredMovies);
  // console.log(savedMovies);


  return (
    <main className="movies-page">
      <MoviesContainer>
        <SearchForm onSearch={ searchMovies } setIsLoading={ setIsLoading } />
        {isLoading ? <Preloader /> :
          (isError ? <LoadingError /> : <MoviesCardList movies={ filteredMovies } savedMovies={ savedMovies } onLike={ onLike } onDelete={ onDelete } />)}
      </MoviesContainer>
    </main>
  )
}

export default Movies;
