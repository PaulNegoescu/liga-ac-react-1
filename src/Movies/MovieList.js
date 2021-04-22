import { useEffect, useState } from 'react';

export function MovieList() {
  const [state, setState] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/movies?_limit=10')
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <>
      <h1>Movie List</h1>

      <article>
        <a href="#">
          <img src="" alt="Batman Begins Poster" />
          <h2>Batman Begins</h2>
        </a>
      </article>
      <button onClick={() => setState(state + 1)}>Increase</button>
    </>
  );
}
