import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Register } from './Auth/Register';
import { Counter } from './Counter/Counter';
import { MovieList } from './Movies/MovieList';
import { Nav } from './shared/Nav/Nav';

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={() => <h1>Homepage</h1>} />
        <Route path="/counter" component={Counter} />
        <Route path="/register" component={Register} />
        <Route path="/movies" component={MovieList} />
        <Route path="*" component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
