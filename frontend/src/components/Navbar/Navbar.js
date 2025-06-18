import Link from "next/link";
import styles from "./Navbar.module.css";
import UserMenu from "../UserMenu/UserMenu";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link className={styles.link} href="/">
          Shopwise
        </Link>
        <span className={styles.separator}>|</span>
        <Link className={styles.link} href="/cart">
          Cart
        </Link>
      </div>
      <div className={styles.right}>
        <UserMenu />
      </div>
    </nav>
  );
}
