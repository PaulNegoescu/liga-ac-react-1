import { useState } from 'react';

export function Register() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.id]: '' });
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  function formIsValid() {
    const newErrors = { ...errors };
    let isValid = true;

    if (values.email === '') {
      newErrors.email = 'Email is required!';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // const safeValues = { ...values };
    // delete safeValues.retypePassword;
    const { retypePassword, ...safeValues } = values;
    if (!formIsValid()) {
      return;
    }

    fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(safeValues),
    })
      .then((res) => res.json())
      .then(console.log);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Register</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={handleInputChange}
          value={values.email}
        />
        {errors.email !== '' ? <strong>{errors.email}</strong> : null}
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
      <div>
        <label htmlFor="retypePassword">Retype Password</label>
        <input
          type="password"
          id="retypePassword"
          onChange={handleInputChange}
          value={values.retypePassword}
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          onChange={handleInputChange}
          value={values.firstName}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          onChange={handleInputChange}
          value={values.lastName}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
