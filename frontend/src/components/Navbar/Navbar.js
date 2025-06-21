import Link from "next/link";
import styles from "./Navbar.module.css";
import UserMenu from "../UserMenu/UserMenu";

// Navbar component - top navigation for the shop
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Left side: logo and main links */}
      <div className={styles.left}>
        {/* Home link */}
        <Link className={styles.link} href="/" data-cy="navbar-home-link">
          Shopwise
        </Link>
        <span className={styles.separator}>|</span>
        {/* Cart link with data-cy for testing */}
        <Link className={styles.link} href="/cart" data-cy="cart-link">
          Cart
        </Link>
      </div>
      {/* Right side: user account and auth actions */}
      <div className={styles.right}>
        <UserMenu />
      </div>
    </nav>
  );
}
