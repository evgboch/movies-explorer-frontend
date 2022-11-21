import "./MoviesCardList.css";
import React from "react";
// import moviesData from "../../utils/moviesData";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onLike, onDislike }) {
  const location = useLocation().pathname;
  // console.log(movies);

  // const [moviesList, setMoviesList] = React.useState([]);
  // let moviesList = [];

  // React.useEffect(() => {
  //   if (location === "/movies") {
  //     // debugger
  //     filterMovies();
  //   } else {
  //     setMoviesList(savedMovies);
  //   }
  //   // console.log(savedMovies);
  // }, [savedMovies]);

  // function filterMovies() {
  //   let filteredMovies = []

  //   if (localStorage.getItem("movies")) {
  //     const movies = JSON.parse(localStorage.getItem("movies"));

  //     filteredMovies = movies.filter((movie) => {
  //       const lowerMovieName = movie.nameRU.toLowerCase();
  //       const lowerMovieReq = (localStorage.getItem("movieReq") ? localStorage.getItem("movieReq") : "").toLowerCase();

  //       if (localStorage.getItem("movieShort") === "true") {
  //         return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
  //       }

  //       return lowerMovieName.includes(lowerMovieReq);
  //     });
  //   }

  //   setMoviesList(filteredMovies);
  // }





  // if (location === "/movies") {
  //   const movies = JSON.parse(localStorage.getItem("movies"));
  //    moviesList = movies.filter((movie) => {
  //     // movie.isLiked = savedMovies.some((mov) => {
  //     //   return mov.movieId === movie.id;
  //     // });
  //     // console.log(movie.isLiked);
  //     const lowerMovieName = movie.nameRU.toLowerCase();
  //     const lowerMovieReq = localStorage.getItem("movieReq").toLowerCase();
  //       if (localStorage.getItem("movieShort") === "true") {
  //         return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
  //       }
  //     return lowerMovieName.includes(lowerMovieReq);
  //   });
  // } else {
  //     moviesList = savedMovies;
  // }

  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((movie) => {
          return <MoviesCard key={movie.id || movie._id} onLike={ onLike } onDislike={ onDislike } movie={ movie } />
        })}
      </ul>
      <button className="movies__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
