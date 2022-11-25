import "./MoviesContainer.css";

function MoviesContainer({ children }) {
  return (
    <div className="movies-container">
      { children }
    </div>
  )
}

export default MoviesContainer;
