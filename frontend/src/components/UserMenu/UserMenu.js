"use client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { clearCart } from "../../features/cart/cartSlice";
import styles from "./UserMenu.module.css";
import Link from "next/link";

// UserMenu shows login/register if not logged, or user menu if logged in
export default function UserMenu() {
  // Get user data from Redux store (null if not logged in)
  const user = useSelector((state) => state.user.user);
  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // Handler for logging out the user
  async function handleLogout() {
    // 1. Tell the backend to remove session / clear cookie
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    // 2. Clear Redux state
    dispatch(logout());
    dispatch(clearCart());
  }

  if (!user) {
    // If user not logged in, show links for login and register
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

  // If user is logged in, show their name, link to profile, and log out button
  return (
    <div className={styles.menu}>
      <span className={styles.user}>👤 {user.name}</span>
      <Link href="/profile" className={styles.link}>
        My Account
      </Link>
      <button className={styles.btn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
