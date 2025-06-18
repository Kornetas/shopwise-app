"use client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import styles from "./UserMenu.module.css";
import Link from "next/link";

export default function UserMenu() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  if (!user) {
    // User not logged in – show login/register links
    return (
      <div className={styles.menu}>
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
        <Link href="/register" className={styles.link}>
          Register
        </Link>
      </div>
    );
  }

  // User is logged in – show name, panel, logout
  return (
    <div className={styles.menu}>
      <span className={styles.user}>👤 {user.name}</span>
      <Link href="/profile" className={styles.link}>
        My Account
      </Link>
      <button className={styles.btn} onClick={() => dispatch(logout())}>
        Log out
      </button>
    </div>
  );
}
