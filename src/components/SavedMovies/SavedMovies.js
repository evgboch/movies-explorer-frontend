import "./SavedMovies.css";
import React from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LoadingError from "../LoadingError/LoadingError";
import { useFormWithValidation } from "../../utils/validationHook.js";

function SavedMovies({ savedMovies, onDelete }) {
  const [isShort, setIsShort] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isEmptySearch, setIsEmptySearch] = React.useState(false);

  const validation = useFormWithValidation();


  React.useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  function filterMovies(movies) {
    const newMovies = movies.filter((movie) => {
      const lowerMovieName = movie.nameRU.toLowerCase();
      const lowerMovieReq = (validation.inputValues.movie ? validation.inputValues.movie : "").toLowerCase();

      if (isShort === true) {
        return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
      }

      return lowerMovieName.includes(lowerMovieReq);
    });
    return newMovies;
  }

  function searchMovies() {
    const filteredMovies = filterMovies(savedMovies);
    setFilteredMovies(filteredMovies);
    filteredMovies.length === 0 ? setIsEmptySearch(true) : setIsEmptySearch(false);
  }

  return (
    <main className="saved-movies-page">
      <MoviesContainer>
        <SearchForm
          onSearch={ searchMovies }
          isShort={ isShort }
          setIsShort={ setIsShort }
          validation={ validation }
        />
          {isEmptySearch? <LoadingError>Ничего не&nbsp;найдено</LoadingError> :
            <MoviesCardList movies={ filteredMovies } onDelete={ onDelete } />}
      </MoviesContainer>
    </main>
  )
}

export default SavedMovies;
