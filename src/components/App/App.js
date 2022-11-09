import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from "../Header/Header";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route path="/movies">
          <Header />
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <Header />
          <SavedMovies />
        </Route>
        <Route exact path="/">
          <Header view="main" />
          <Main />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
