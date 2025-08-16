// app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    // Toma credenciales desde las vars de entorno:
    const username = process.env.NEXT_PUBLIC_FASTAPI_USER;
    const password = process.env.NEXT_PUBLIC_FASTAPI_PASSWORD;

    if (!username || !password) {
      setError("Faltan credenciales en .env.local");
      return;
    }

    // Form-url-encoded para FastAPI
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const res = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setError(err.detail || "Error en el login");
      return;
    }

    const { access_token } = await res.json();
    localStorage.setItem("token", access_token);
    router.push("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Conectar con FastAPI
      </button>
    </div>
  );
}
