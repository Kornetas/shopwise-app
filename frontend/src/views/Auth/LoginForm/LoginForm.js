"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFail,
} from "../../../features/user/userSlice";
import styles from "./LoginForm.module.css";

// Login form for user authentication
export default function LoginForm() {
  // State for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Get loading, error, user from Redux store
  const { loading, error, user } = useSelector((state) => state.user);
  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault(); // Stop default form action
    dispatch(authStart()); // Set loading true, clear errors

    try {
      // Send POST request to login API
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Needed if server uses httpOnly cookie
          body: JSON.stringify({ email, password }),
        }
      );

      // If response is not ok, get error from server or set default
      if (!res.ok) throw new Error((await res.json()).error || "Login failed");

      // Get user and token from response
      const data = await res.json();
      dispatch(authSuccess({ user: data.user || data, token: data.token }));
    } catch (err) {
      // If error, save error in Redux
      dispatch(authFail(err.message));
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <input
        type="email"
        placeholder="Email"
        required
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button className={styles.btn} disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>
      {/* Show error message if login failed */}
      {error && <div className={styles.error}>{error}</div>}
      {/* Show success if user is logged in */}
      {user && <div className={styles.success}>Logged in as {user.name}</div>}
    </form>
  );
}
