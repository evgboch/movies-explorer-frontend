import "./MoviesCardList.css";
import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, savedMovies, onLike, onDelete }) {
  const location = useLocation().pathname;
  const [moreValue, setMoreValue] = React.useState(Number);
  const [maxMoviesLength, setMaxMoviesLength] = React.useState(Number);
  const [moviesForRender, setMoviesForRender] = React.useState(Array);

  React.useEffect(() => {
    if (location === "/movies") {
      countMaxMoreValues();
    }
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
  }, [movies, maxMoviesLength]);

  function countMaxMoreValues() {
    if (window.screen.width > 1023) {
      setMaxMoviesLength(12);
      setMoreValue(3);
    } else if (window.screen.width > 767) {
      setMaxMoviesLength(8);
      setMoreValue(2);
    } else {
      setMaxMoviesLength(5);
      setMoreValue(1);
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
