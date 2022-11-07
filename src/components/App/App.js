import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
