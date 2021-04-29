import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../Auth/AuthContext';

import styles from './Nav.module.css';

export function Nav() {
  const { user, onLogout } = useAuthContext();

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

  return (
    <nav>
      <ul className={styles['main-menu']}>
        <li>
          <NavLink activeClassName={styles.active} exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/counter">
            Counter
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/movies">
            Movies
          </NavLink>
        </li>

        {(!user || !user.firstName) && (
          <>
            <li className={styles['right-align']}>
              <NavLink activeClassName={styles.active} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}

        {user && user.firstName && (
          <li className={styles['right-align']}>
            Welcome {user.firstName}!{' '}
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
