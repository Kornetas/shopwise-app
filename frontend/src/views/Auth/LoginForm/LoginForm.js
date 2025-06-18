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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(authStart());
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // If you use httpOnly cookie!
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) throw new Error((await res.json()).error || "Login failed");
      const data = await res.json();
      dispatch(authSuccess({ user: data.user || data, token: data.token }));
    } catch (err) {
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
      {error && <div className={styles.error}>{error}</div>}
      {user && <div className={styles.success}>Logged in as {user.name}</div>}
    </form>
  );
}
