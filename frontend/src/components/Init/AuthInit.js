"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSuccess } from "@/features/user/userSlice";

// This component checks if user is logged in when app loads
export default function AuthInit() {
  const dispatch = useDispatch(); // Get dispatch function from Redux

  useEffect(() => {
    // This function runs once after component mounts
    async function checkAuth() {
      // Call API to check current user
      const res = await fetch("http://localhost:5000/api/users/me", {
        credentials: "include", // Send cookies (important for auth)
      });
      if (res.ok) {
        // If user is logged in, get user data
        const data = await res.json();
        // Save user data to Redux store
        dispatch(authSuccess({ user: data }));
      }
      // If not ok, do nothing (user not logged in)
    }
    checkAuth();
  }, []); // Empty array = only run once, on first render

  return null; // Component renders nothing, only logic inside
}
