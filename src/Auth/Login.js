import { useState } from 'react';
import { useFetch } from '../shared/useFetch';
import { useAuthContext } from './AuthContext';

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { onLogin } = useAuthContext();
  const { mutate } = useFetch('/auth/signin', false);

  function handleInputChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await mutate(values, 'POST');

    if (response.accessToken) {
      onLogin(response.accessToken);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={handleInputChange}
          value={values.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleInputChange}
          value={values.password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
