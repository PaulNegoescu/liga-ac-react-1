import { useState } from 'react';

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  function handleInputChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(console.log);
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
