import "./MoviesCardList.css";
import moviesData from "../../utils/moviesData";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies">
      <ul className="movies__list">
        {moviesData.map((movie) => {
          return <MoviesCard key={ movie._id } cover={ movie.cover } name={ movie.name } duration={ movie.duration } view={ "movies" } isLiked={ movie.isLiked } />
        })}
      </ul>
      <button className="movies__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
