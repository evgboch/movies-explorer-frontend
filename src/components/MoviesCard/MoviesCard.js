import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ onLike, movie }) {
  const location = useLocation().pathname;

  function handleLike() {
    onLike(
      movie.country,
      movie.director,
      movie.duration,
      movie.year,
      movie.description,
      movie.image.url,
      movie.trailerLink,
      movie.image.formats.thumbnail.url,
      // movie.owner,
      movie.id,
      movie.nameRU,
      movie.nameEN,
    );
  }

  return (
    <li className="card">
      <a className="card__link" href={ movie.trailerLink } target="_blank" rel="noreferrer">
       <img
       className="card__cover"
       src={"https://api.nomoreparties.co" + (location === "/movies" ? movie.image.url : movie.image)}
       alt="Обложка фильма" />
      </a>
      <div className="card__container">
        <h3 className="card__name">{ movie.nameRU }</h3>
        <button
        className={"card__icon" + (location === "/movies" ? (movie.isLiked ? " card__icon_liked-heart" : " card__icon_disliked-heart" ) : " card__icon_delete")}
        onMouseDown={ handleLike }>
        </button>
      </div>
      <p className="card__duration">{Math.floor(movie.duration/60) + "ч " + (movie.duration - Math.floor(movie.duration/60)*60) + "м"}</p>
    </li>
  )
}

export default MoviesCard;
