import "./MoviesCard.css";

function MoviesCard({ cover, name, duration, view, isLiked, link }) {
  return (
    <li className="card">
      <a className="card__link" href={ link } target="_blank" rel="noreferrer">
       <img className="card__cover" src={ cover } alt="Обложка фильма" />
      </a>
      <div className="card__container">
        <h3 className="card__name">{ name }</h3>
        <button className={"card__icon" + (view === "movies" ? (isLiked ? " card__icon_liked-heart" : " card__icon_disliked-heart" ) : " card__icon_delete")}></button>
      </div>
      <p className="card__duration">{ duration }</p>
    </li>
  )
}

export default MoviesCard;
