import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Parent } from './Comunication/Parent';
import { Counter } from './Counter/Counter';
import { MovieDetails, MovieList } from './Movies';
import { Nav } from './shared/Nav/Nav';

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={() => <h1>Homepage</h1>} />
        <Route path="/counter" component={Counter} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/movies" component={MovieList} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/communication" component={Parent} />
        <Route path="*" component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
