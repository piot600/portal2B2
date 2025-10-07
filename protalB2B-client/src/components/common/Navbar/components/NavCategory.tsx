import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.css";
import type { NavCategoryProps } from "../navbarTypes";

function NavCategory({
  category,
  isOpen,
  onToggle,
  onClose,
}: NavCategoryProps) {
  return (
    <li className={`${styles.category} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.categoryLabel}
        onClick={() => onToggle(category.label)}
        aria-expanded={isOpen}
      >
        {category.label}
      </button>

      {category.links.length > 0 && (
        <ul
          className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}
          role="menu"
        >
          {category.links.map((link) => (
            <li key={link.to} onClick={onClose} role="menuitem">
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
      )}
    </li>
  );
}

export default NavCategory;
