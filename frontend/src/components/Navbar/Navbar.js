import Link from "next/link";
import styles from "./Navbar.module.css";
import UserMenu from "../UserMenu/UserMenu";

// Navbar component - shows top navigation bar
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Left part: site name and links */}
      <div className={styles.left}>
        <Link className={styles.link} href="/">
          Shopwise
        </Link>
        <span className={styles.separator}>|</span>
        <Link className={styles.link} href="/cart">
          Cart
        </Link>
      </div>
      {/* Right part: user menu (login/logout, profile etc.) */}
      <div className={styles.right}>
        <UserMenu />
      </div>
    </nav>
  );
}
