import "./MoviesCardList.css";
// import moviesData from "../../utils/moviesData";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ savedMovies, onLike }) {
  const location = useLocation().pathname;
  let moviesList = [];

  if (location === "/movies") {
    const movies = JSON.parse(localStorage.getItem("movies"));
     moviesList = movies.filter((movie) => {
      const lowerMovieName = movie.nameRU.toLowerCase();
      const lowerMovieReq = localStorage.getItem("movieReq").toLowerCase();
        if (localStorage.getItem("movieShort") === "true") {
          return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
        }
      return lowerMovieName.includes(lowerMovieReq);
    });
  } else {
      moviesList = savedMovies;
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {moviesList.map((movie) => {
          return <MoviesCard key={movie.id || movie._id} onLike={ onLike } movie={ movie } />
        })}
      </ul>
      <button className="movies__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
