"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSuccess } from "@/features/user/userSlice";

export default function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("http://localhost:5000/api/users/me", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(authSuccess({ user: data }));
      }
    }
    checkAuth();
  }, []);

  return null; // nic nie renderuje, tylko odpala efekt
}
