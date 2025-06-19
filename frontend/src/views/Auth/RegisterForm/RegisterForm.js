"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFail,
} from "../../../features/user/userSlice";
import styles from "./RegisterForm.module.css";

// Registration form for user signup
export default function RegisterForm() {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Get loading, error, user from Redux store
  const { loading, error, user } = useSelector((state) => state.user);
  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    dispatch(authStart()); // Set loading true, clear errors

    try {
      // Send POST request to register API
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

      // If registration failed, show error from server or default
      if (!res.ok)
        throw new Error((await res.json()).error || "Registration failed");

      // Get user and token from response
      const data = await res.json();
      dispatch(authSuccess({ user: data.user || data, token: data.token }));
    } catch (err) {
      // Save error in Redux
      dispatch(authFail(err.message));
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        required
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button className={styles.btn} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {/* Show error if registration failed */}
      {error && <div className={styles.error}>{error}</div>}
      {/* Show welcome message if registration successful */}
      {user && <div className={styles.success}>Welcome, {user.name}!</div>}
    </form>
  );
}
