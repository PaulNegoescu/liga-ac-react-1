import { useFetch } from '../shared/useFetch';
import { Movie } from './Movie';

import styles from './Movie.module.css';

export function MovieList() {
  const { data: movies, isLoading } = useFetch(
    '/movies?_limit=10',
    false,
    true
  );

  return (
    <>
      <h1>Movie List</h1>
      {isLoading && <h2>Loading ... </h2>}

      {movies && (
        <main className={styles['movie-list']}>
          {movies.length !== 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </main>
      )}
    </>
  );
}
