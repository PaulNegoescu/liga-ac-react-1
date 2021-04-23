import { useEffect, useState } from 'react';
import { Movie } from './Movie';

import styles from './Movie.module.css';

export function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const data = await fetch(
        'http://localhost:3001/movies?_limit=10'
      ).then((res) => res.json());

      setMovies(data);
    }

    getMovies();

    return () => {
      //cleanup
    };
  }, []);
  return (
    <>
      <h1>Movie List</h1>
      {movies.length === 0 && <h2>Loading ... </h2>}
      <main className={styles['movie-list']}>
        {movies.length !== 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </main>
    </>
  );
}
