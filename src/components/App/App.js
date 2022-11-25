import "./App.css";
import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import EntryHeader from "../EntryHeader/EntryHeader";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getUserInfo, getSavedMovies, saveMovie, deleteMovie } from "../../utils/mainApi";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    getInitialInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        })
        .catch((err) => {
          console.log(err);
        });
      getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
          loadInitialMovies(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleMovieLike(movie) {
    saveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image.url || movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail || movie.image.formats.thumbnail.url,
      movieId: movie.id || movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setFilteredMovies((state) => {
          newMovie.isLiked = true;
          return state.map((m) => (m.id || m.movieId) === newMovie.movieId ? newMovie : m);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkLikes(filteredMovies, savedMovies) {
    filteredMovies.map((movie) => {
      savedMovies.forEach((mov) => {
        if (mov.movieId === movie.id) {
          movie.isLiked = true;
          movie._id = mov._id;
        }
      });
      return movie;
    });
  }

  function loadInitialMovies(savedMovies) {
    let filteredMovies = []
    if (localStorage.getItem("movies")) {
      filteredMovies = JSON.parse(localStorage.getItem("movies"));
      checkLikes(filteredMovies, savedMovies);
      setFilteredMovies(filteredMovies);
    }
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
    setCurrentUser(null);
    setFilteredMovies([]);
    setSavedMovies([]);
    history.push("/");
  }

  function handleMovieDislike(delMovie) {
    deleteMovie(delMovie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((mov) => mov.movieId !== delMovie.movieId);
        setSavedMovies(updatedSavedMovies);
        setFilteredMovies((state) => {
          delMovie.isLiked = false;
          return state.map((mov) => (mov.id || mov.movieId) === delMovie.movieId ? delMovie : mov);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <Switch>
          <ProtectedRoute path="/movies" isLoggedIn={ isLoggedIn } >
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <Movies
              filteredMovies={ filteredMovies }
              setFilteredMovies={ setFilteredMovies }
              savedMovies={ savedMovies}
              checkLikes={ checkLikes }
              onLike={ handleMovieLike }
              onDelete ={ handleMovieDislike } />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={ isLoggedIn }>
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <SavedMovies savedMovies={ savedMovies } onDelete={ handleMovieDislike } />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" isLoggedIn={ isLoggedIn }>
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <Profile onSignOut={ handleSignOut } setCurrentUser={ setCurrentUser } />
          </ProtectedRoute>
          <Route path="/signin">
            { isLoggedIn && <Redirect to="/movies" /> }
            <EntryHeader>Рады видеть!</EntryHeader>
            <Login setIsLoggedIn={ setIsLoggedIn } setCurrentUser={ setCurrentUser } setSavedMovies={ setSavedMovies } />
          </Route>
          <Route path="/signup">
            { isLoggedIn && <Redirect to="/movies" /> }
            <EntryHeader>Добро пожаловать!</EntryHeader>
            <Register setIsLoggedIn={ setIsLoggedIn } setCurrentUser={ setCurrentUser } />
          </Route>
          <Route exact path="/">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
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
