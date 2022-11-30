import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { MOVIES_URL, ONE_HOUR } from "../../utils/constants";

function MoviesCard({ onLike, onDelete, movie }) {
  const location = useLocation().pathname;

  function handleLike() {
    onLike(movie);
  }

  function handleDeleteClick() {
    onDelete(movie);
  }

  return (
    <li className="card">
      <a className="card__link" href={ movie.trailerLink } target="_blank" rel="noreferrer">
       <img
        className="card__cover"
        src={ MOVIES_URL.short + ((typeof movie.image === "string") ? movie.image : movie.image.url) }
        alt="Обложка фильма" />
      </a>
      <div className="card__container">
        <h3 className="card__name">{ movie.nameRU }</h3>
        <button
          className={ "card__icon" + (location === "/movies" ? (movie.isLiked ? " card__icon_liked-heart" : " card__icon_disliked-heart" ) : " card__icon_delete") }
          onMouseDown={ location === "/movies" ? (movie.isLiked ? handleDeleteClick : handleLike ) : handleDeleteClick }>
        </button>
      </div>
      <p className="card__duration">{ Math.floor(movie.duration/ONE_HOUR) + "ч " + (movie.duration - Math.floor(movie.duration/ONE_HOUR)*ONE_HOUR) + "м" }</p>
    </li>
  )
}

export default MoviesCard;
