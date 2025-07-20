// Import NavLink for navigation between pages
import { NavLink } from "react-router-dom";

// Import scoped CSS module for PageNav styling
import styles from "./PageNav.module.css";

// Import the logo component
import Logo from "./Logo";

// Navigation bar component for top-level public pages
function PageNav() {
  return (
    <>
      <nav className={styles.nav}>
        {/* App logo on the left */}
        <Logo />

        {/* Navigation links on the right */}
        <ul>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink className={styles.ctaLink} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PageNav;
