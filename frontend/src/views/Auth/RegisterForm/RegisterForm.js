"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFail,
} from "../../../features/user/userSlice";
import styles from "./RegisterForm.module.css";

// User registration form with client-side validation
export default function RegisterForm() {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Local validation error for UI only (not from backend)
  const [localError, setLocalError] = useState("");
  // Get Redux state for async status and errors
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Handles register form submit
  async function handleSubmit(e) {
    e.preventDefault(); // No page reload
    // Basic client-side validation
    if (!name || !email || !password) {
      setLocalError("All fields are required");
      return;
    }
    setLocalError(""); // Clear local error on submit
    dispatch(authStart());
    try {
      // Register user using API (use env or fallback)
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (!res.ok) {
        // Try to extract server error
        let data;
        try {
          data = await res.json();
        } catch {}
        throw new Error((data && data.error) || "Registration failed");
      }
      const data = await res.json();
      // Save user & token in Redux
      dispatch(authSuccess({ user: data.user || data, token: data.token }));
    } catch (err) {
      dispatch(authFail(err.message));
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>
      {/* Labels for accessibility (linked by htmlFor/id) */}
      <label htmlFor="register-name" className={styles.label}>
        Name
      </label>
      <input
        id="register-name"
        type="text"
        placeholder="Name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />

      <label htmlFor="register-email" className={styles.label}>
        Email
      </label>
      <input
        id="register-email"
        type="email"
        placeholder="Email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <label htmlFor="register-password" className={styles.label}>
        Password
      </label>
      <input
        id="register-password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button className={styles.btn} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {/* Local error (client-side) */}
      {localError && <div className={styles.error}>{localError}</div>}
      {/* Server error */}
      {error && <div className={styles.error}>{error}</div>}
      {/* Show welcome message if registration successful */}
      {user && <div className={styles.success}>Welcome, {user.name}!</div>}
    </form>
  );
}
