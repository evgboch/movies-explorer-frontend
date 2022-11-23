import "./SavedMovies.css";
import React from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useFormWithValidation } from "../../utils/Validator.js";

function SavedMovies({ savedMovies, onDelete }) {
  const [isShort, setIsShort] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies);
  const [userReq, setUserReq] = React.useState(null);

  const validation = useFormWithValidation();


  React.useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  // console.log(filteredMovies);
  function loadInitialMovies() {
    setFilteredMovies(savedMovies);
  }

  // Array.from(movies).

  function filterMovies(movies) {
    const newMovies = movies.filter((movie) => {
      const lowerMovieName = movie.nameRU.toLowerCase();
      const lowerMovieReq = (validation.inputValues.movie ? validation.inputValues.movie : "").toLowerCase();
      console.log(userReq);

      if (isShort === true) {
        return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
      }

      return lowerMovieName.includes(lowerMovieReq);
    });
    return newMovies;
  }

  function searchMovies() {
        // let filteredMovies = filterMovies(res);
        setFilteredMovies(filterMovies(savedMovies));
        // localStorage.setItem("movies", JSON.stringify(filteredMovies));
  }
  return (
    <main className="saved-movies-page">
      <MoviesContainer>
        <SearchForm onSearch={ searchMovies } isShort={ isShort } setIsShort={ setIsShort } setUserReq={ setUserReq } validation={ validation } />
        <MoviesCardList movies={ filteredMovies } onDelete={ onDelete } />
      </MoviesContainer>
    </main>
  )
}

export default SavedMovies;
