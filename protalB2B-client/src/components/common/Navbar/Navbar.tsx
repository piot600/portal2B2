import { useState } from "react";
import { useAuth } from "../../../features/auth/context/useAuth";
import { getNavMenuForRole } from "./navLinks";
import type { Role } from "../../../features/auth/types/userTypes";
import NavCategory from "./components/NavCategory";
import UserMenu from "./components/UserMenu";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const role = user?.role as Role | undefined;
  const navMenu = getNavMenuForRole(role);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>PortalB2B</div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>
          {navMenu.map((item) =>
            "links" in item ? (
              <NavCategory
                key={item.label}
                category={item}
                isOpen={openDropdown === item.label}
                onToggle={toggleDropdown}
                onClose={closeMenu}
              />
            ) : (
              <li key={item.to}>
                <Link to={item.to} onClick={closeMenu} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            )
          )}

          {user && (
            <UserMenu
              email={user.email}
              isOpen={openDropdown === "user"}
              onToggle={() => toggleDropdown("user")}
              onLogout={handleLogout}
              onClose={closeMenu}
            />
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
