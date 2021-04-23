import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

export function Movie({ id, title, poster }) {
  return (
    <article className={styles.card}>
      <Link to={`/movies/${id}`}>
        <img src={poster} alt={`${title} Poster`} />
        <strong>{title}</strong>
      </Link>
    </article>
  );
}
