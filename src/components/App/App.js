import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from "../Header/Header";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);

  function onNavOpen() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  return (
    <div className='page'>
      <Switch>
        <Route path="/movies">
          <Header isLoggedIn={true} onMenuClick={ onNavOpen } />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header isLoggedIn={true} onMenuClick={ onNavOpen } />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isLoggedIn={true} onMenuClick={ onNavOpen } />
          <Profile />
        </Route>
        <Route exact path="/">
          <Header view="main" />
          <Main />
          <Footer />
        </Route>
      </Switch>
      <Navigation isOpen={ isNavigationOpen } />
    </div>
  );
}

export default App;
