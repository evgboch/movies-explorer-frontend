import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import EntryHeader from '../EntryHeader/EntryHeader';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import EmptyPage from '../EmptyPage/EmptyPage';
// import { useFormWithValidation } from "../../utils/Validator.js";
import { getUserInfo, getSavedMovies, saveMovie, deleteMovie } from "../../utils/MainApi";
// import { errorMessages } from "../../utils/constants";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    getInitialInfo();
    loadFilteredMovies();
  }, []);

  function getInitialInfo() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");

      getUserInfo(token)
        .then((res) => {
          setCurrentUser({
            email: res.email,
            name: res.name,
            _id: res._id,
          });
          setIsLoggedIn(true);
          // history.push("/movies");
        })
        .catch((err) => {
          console.log(err);
        });

      getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
          // history.push("/movies");
        })
        .catch((err) => {
          Promise.reject(err);
        })
    }
  }

  function loadFilteredMovies() {
    let filteredMovies = []

    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));

      // filteredMovies = movies.filter((movie) => {
      //   const lowerMovieName = movie.nameRU.toLowerCase();
      //   const lowerMovieReq = (localStorage.getItem("movieReq") ? localStorage.getItem("movieReq") : "").toLowerCase();

      //   if (localStorage.getItem("movieShort") === "true") {
      //     return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
      //   }

      //   return lowerMovieName.includes(lowerMovieReq);
      // });
      filteredMovies = filterMovies(movies);
    }

    setFilteredMovies(filteredMovies);
  }

  function filterMovies(movies) {
    const newMovies = movies.filter((movie) => {
      const lowerMovieName = movie.nameRU.toLowerCase();
      const lowerMovieReq = (localStorage.getItem("movieReq") ? localStorage.getItem("movieReq") : "").toLowerCase();

      if (localStorage.getItem("movieShort") === "true") {
        return lowerMovieName.includes(lowerMovieReq) && (movie.duration <= 40);
      }

      return lowerMovieName.includes(lowerMovieReq);
    });

    return newMovies;
  }

  function handleMenuClick() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("movieShort");
    localStorage.removeItem("movieReq");
    setIsLoggedIn(false);
    history.push("/");
  }

  function handleLike(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    // owner,
    movieId,
    nameRU,
    nameEN,
  ) {
    // debugger
    saveMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      // owner,
      movieId,
      nameRU,
      nameEN,
    })
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDislike(_id) {
    deleteMovie(_id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((movie) => {
          return movie._id !== _id;
        })
        setSavedMovies(updatedSavedMovies);
      })
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <Switch>
          <Route path="/movies">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <Movies filterMovies={ filterMovies } filteredMovies={ filteredMovies } setFilteredMovies={ setFilteredMovies } onLike={ handleLike } onDislike={ handleDislike } />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <SavedMovies savedMovies={ savedMovies } />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <Profile onSignOut={ handleSignOut } />
          </Route>
          <Route path="/emptypage">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <EmptyPage />
            <Footer />
          </Route>
          <Route path="/signin">
            <EntryHeader>Рады видеть!</EntryHeader>
            <Login setIsLoggedIn={ setIsLoggedIn } setCurrentUser={ setCurrentUser } setSavedMovies={ setSavedMovies } />
          </Route>
          <Route path="/signup">
            <EntryHeader>Добро пожаловать!</EntryHeader>
            <Register setIsLoggedIn={ setIsLoggedIn } setCurrentUser={ setCurrentUser } />
          </Route>
          <Route exact path="/">
            <Header view="main" isLoggedIn={ isLoggedIn } />
            <Main />
            <Footer />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Navigation isOpen={ isNavigationOpen } onLinkClick={ handleMenuClick } />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
