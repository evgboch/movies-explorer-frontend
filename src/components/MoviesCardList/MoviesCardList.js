import "./MoviesCardList.css";
import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MOVIES_LIST_CONSTANTS } from "../../utils/constants";

function MoviesCardList({ movies, savedMovies, onLike, onDelete }) {
  const location = useLocation().pathname;
  const [moreValue, setMoreValue] = React.useState(Number);
  const [maxMoviesLength, setMaxMoviesLength] = React.useState(Number);
  const [moviesForRender, setMoviesForRender] = React.useState(Array);

  React.useEffect(() => {
    if (location === "/movies") {
      countMaxMoreValues();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (location === "/movies") {
      window.addEventListener("resize", countMaxMoreValues);
      return () => {
        window.removeEventListener("resize", countMaxMoreValues);
      };
    }
  }, [location]);

  React.useEffect(() => {
    if (location === "/movies") {
      const newMovies = movies.filter((mov) => movies.indexOf(mov) < maxMoviesLength);
      setMoviesForRender(newMovies);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, maxMoviesLength]);

  function countMaxMoreValues() {
    if (window.screen.width >= MOVIES_LIST_CONSTANTS.width.desktop) {
      setMaxMoviesLength(MOVIES_LIST_CONSTANTS.maxListLenght.desktop);
      setMoreValue(MOVIES_LIST_CONSTANTS.moreValue.desktop);
    } else if (window.screen.width >= MOVIES_LIST_CONSTANTS.width.tablet) {
      setMaxMoviesLength(MOVIES_LIST_CONSTANTS.maxListLenght.tablet);
      setMoreValue(MOVIES_LIST_CONSTANTS.moreValue.tablet);
    } else {
      setMaxMoviesLength(MOVIES_LIST_CONSTANTS.maxListLenght.mobile);
      setMoreValue(MOVIES_LIST_CONSTANTS.moreValue.mobile);
    }
  }

  function handleMoreClick() {
    setMaxMoviesLength(maxMoviesLength + moreValue);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {(location === "/movies" ? moviesForRender : movies).map((movie) => {
          return <MoviesCard
            key={movie.id || movie._id}
            onLike={ onLike }
            onDelete={ onDelete }
            movie={ movie }
            savedMovies={ savedMovies } />
        })}
      </ul>
      <button
        className={"movies__button" + ((location === "/movies") &&
        (moviesForRender.length < movies.length) ? " movies__button_visible" : "")}
        type="button"
        onMouseDown={ handleMoreClick }>
        Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;
