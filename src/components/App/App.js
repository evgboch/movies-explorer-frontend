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
    // loadFilteredMovies();
    getInitialInfo();
    // console.log(savedMovies);
    // console.log(filteredMovies);
  }, []);

  // React.useEffect(() => {
  //   if (savedMovies.length !== 0) {
  //     checkLikes(savedMovies);
  //   }
  // }, [ filteredMovies ]);


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
          // debugger
          loadInitialMovies(movies);
          // console.log(movies);
          // console.log(JSON.parse(localStorage.getItem("movies")));
          // checkLikes(movies, filteredMovies);
          // history.push("/movies");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // const getSavedMovie = (arr, movie) => {
  //   return arr.find((item) => {
  //     return item.movieId === (movie.id || movie.movieId);
  //   });
  // };

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

  // function handleMovieDelete(movie) {
  //   api.deleteCard(card._id)
  //     .then(() => {
  //       setCards((state) => state.filter((c) => c._id !== card._id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // function loadFilteredMovies() {
  //   // let filteredMovies = []

  //   if (localStorage.getItem("movies")) {
  //     // debugger
  //     // const movies = JSON.parse(localStorage.getItem("movies"));
  //     // const filteredMovies = filterMovies(movies);
  //     setFilteredMovies(JSON.parse(localStorage.getItem("movies")));
  //   }

  //   // setFilteredMovies(filteredMovies);
  // }

  function checkLikes(filteredMovies, savedMovies) {
    filteredMovies.map((movie) => {
      // movie.isLiked = savedMovies.some((mov) => {
      //   return mov.movieId === movie.id;
      // });

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

  // function handleLike(
  //   country,
  //   director,
  //   duration,
  //   year,
  //   description,
  //   image,
  //   trailerLink,
  //   thumbnail,
  //   // owner,
  //   movieId,
  //   nameRU,
  //   nameEN,
  // ) {
  //   // debugger
  //   saveMovie({
  //     country,
  //     director,
  //     duration,
  //     year,
  //     description,
  //     image,
  //     trailerLink,
  //     thumbnail,
  //     // owner,
  //     movieId,
  //     nameRU,
  //     nameEN,
  //   })
  //     .then((movie) => {
  //       setSavedMovies([movie, ...savedMovies]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function handleMovieDislike(delMovie) {
    deleteMovie(delMovie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((mov) => mov.movieId !== delMovie.movieId);
        setSavedMovies(updatedSavedMovies);
        setFilteredMovies((state) => {
          delMovie.isLiked = false;
          return state.map((mov) => mov.id === delMovie.movieId ? delMovie : mov);
        });
      })
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <Switch>
          <Route path="/movies">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <Movies filteredMovies={ filteredMovies } setFilteredMovies={ setFilteredMovies } savedMovies={ savedMovies} checkLikes={ checkLikes } onLike={ handleMovieLike } onDelete ={ handleMovieDislike } />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header isLoggedIn={ isLoggedIn } onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
            <SavedMovies savedMovies={ savedMovies } onDelete={ handleMovieDislike } />
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
