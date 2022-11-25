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
import EntryHeader from '../EntryHeader/EntryHeader';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import EmptyPage from '../EmptyPage/EmptyPage';

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);

  function handleMenuClick() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  return (
    <div className='page'>
      <Switch>
        <Route path="/movies">
          <Header isLoggedIn={true} onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header isLoggedIn={true} onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isLoggedIn={true} onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
          <Profile />
        </Route>
        <Route path="/emptypage">
          <Header isLoggedIn={true} onMenuClick={ handleMenuClick } isMenuOpen={ isNavigationOpen } />
          <EmptyPage />
          <Footer />
        </Route>
        <Route path="/signin">
          <EntryHeader>Рады видеть!</EntryHeader>
          <Login />
        </Route>
        <Route path="/signup">
          <EntryHeader>Добро пожаловать!</EntryHeader>
          <Register />
        </Route>
        <Route exact path="/">
          <Header view="main" />
          <Main />
          <Footer />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Navigation isOpen={ isNavigationOpen } onLinkClick={ handleMenuClick } />
    </div>
  );
}

export default App;
