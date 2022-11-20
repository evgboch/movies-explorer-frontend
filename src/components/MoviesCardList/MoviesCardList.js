import "./MoviesCardList.css";
// import moviesData from "../../utils/moviesData";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ view }) {
  const movies = JSON.parse(localStorage.getItem("movies"));
  const filteredMovies = movies.filter((movie) => {
    const lowerMovieName = movie.nameRU.toLowerCase();
    const lowerMovieReq = localStorage.getItem("movieReq").toLowerCase();
    return lowerMovieName.includes(lowerMovieReq);
  });

  return (
    <section className="movies">
      <ul className="movies__list">
        {filteredMovies.map((movie) => {
          return <MoviesCard
          key={ movie.id }
          cover={ "https://api.nomoreparties.co" + movie.image.url }
          name={ movie.nameRU }
          duration={Math.floor(movie.duration/60) + "ч " + (movie.duration - Math.floor(movie.duration/60)*60) + "м"}
          view={ view }
          isLiked={ movie.isLiked }
          link={ movie.trailerLink } />
        })}
      </ul>
      <button className="movies__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
