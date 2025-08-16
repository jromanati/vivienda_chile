// hooks/useAutoLogin.ts
"use client";

import { useEffect } from "react";

export default function useAutoLogin() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, 'token')
    if (!token) {
      fetch("/api/auth/login")
        .then((res) => res.json())
        .then(({ access_token }) => {
          if (access_token) {
            console.log("access_token", access_token)
            localStorage.setItem("token", access_token);
          }
        })
        .catch(console.error);
    }
  }, []);
}
