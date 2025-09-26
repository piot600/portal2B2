import { useAuth } from "../../../features/auth/context/useAuth";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>

      <ul className={styles.ul}>
        {!user ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className={styles.button} onClick={logout}>
                Logout
              </button>
            </li>
            <li className={styles.username}>{user.email}</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
