import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFetch } from '../shared/useFetch';

export function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isLoading } = useFetch(`/movies/${id}`, false, [id]);
  console.log('render');
  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <h1>{movie.title}</h1>
      <Link to={'/movies/' + (Number(id) - 1)}>Previous Movie</Link>
      <Link to={'/movies/' + (Number(id) + 1)}>Next Movie</Link>
    </>
  );
}
