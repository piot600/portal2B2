// src/components/layout/Navbar/Navbar.tsx
import { useAuth } from "../../../features/auth/context/useAuth";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getNavLinksForRole } from "./navLinks";
import type { Role } from "../../../features/auth/types/userTypes";

function Navbar() {
  const { user, logout } = useAuth();
  const navLinks = getNavLinksForRole(user?.role as Role | undefined);

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {user && (
        <ul className={styles.ul}>
          <li className={styles.username}>{user.email}</li>
          <li>
            <button className={styles.button} onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
