import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.css";

interface UserMenuProps {
  email: string;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  onClose: () => void;
}

function UserMenu({
  email,
  isOpen,
  onToggle,
  onLogout,
  onClose,
}: UserMenuProps) {
  return (
    <li className={`${styles.username} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.userButton}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {email}
      </button>
      <ul
        className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}
        role="menu"
      >
        <li role="menuitem">
          <NavLink to="/user/change-password" onClick={onClose}>
            Change Password
          </NavLink>
        </li>
        <li role="menuitem">
          <button className={styles.button} onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </li>
  );
}

export default UserMenu;
