import React from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { loadMovies } from "../../utils/moviesApi";
import LoadingError from "../LoadingError/LoadingError";
import { useFormWithValidation } from "../../utils/validationHook.js";
import { SHORT_FILM_DURATION, ERROR_MESSAGES, LOCAL_STORAGE } from "../../utils/constants";

function Movies({ filteredMovies, setFilteredMovies, savedMovies, checkLikes, onLike, onDelete }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isEmptySearch, setIsEmptySearch] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const validation = useFormWithValidation();

  function filterMovies(movies) {
    const newMovies = Array.from(movies).filter((movie) => {
      const lowerMovieName = movie.nameRU.toLowerCase();
      const lowerMovieReq = (localStorage.getItem(LOCAL_STORAGE.movies.request) ? localStorage.getItem(LOCAL_STORAGE.movies.request) : "").toLowerCase();
      if (localStorage.getItem(LOCAL_STORAGE.movies.short) === "true") {
        return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= SHORT_FILM_DURATION);
      }
      return lowerMovieName.includes(lowerMovieReq);
    });
    return newMovies;
  }

  function searchMovies() {
    setIsDisabled(true);
    loadMovies()
      .then((res) => {
        setIsError(false);
        let filteredMovies = filterMovies(res);
        filteredMovies.length === 0 ? setIsEmptySearch(true) : setIsEmptySearch(false);
        localStorage.setItem(LOCAL_STORAGE.movies.list, JSON.stringify(filteredMovies));
        checkLikes(filteredMovies, savedMovies);
        setFilteredMovies(filteredMovies);
        setIsLoading(false);
        setIsDisabled(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setIsDisabled(false);
      })
  }

  return (
    <main className="movies-page">
      <MoviesContainer>
        <SearchForm isDisabled={ isDisabled } setIsDisabled={isDisabled} onSearch={ searchMovies } setIsLoading={ setIsLoading } validation={ validation } />
        {isLoading ? <Preloader /> :
          isError ? <LoadingError>{ ERROR_MESSAGES.loading.connectionError }</LoadingError> :
            isEmptySearch? <LoadingError>{ ERROR_MESSAGES.loading.emptyMoviesList }</LoadingError> :
              <MoviesCardList
                movies={ filteredMovies }
                savedMovies={ savedMovies }
                onLike={ onLike }
                onDelete={ onDelete } />}
      </MoviesContainer>
    </main>
  )
}

export default Movies;
