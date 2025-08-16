// app/admin/layout.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AdminLayout from "@/components/admin/AdminLayout";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Todas las redirecciones desde useEffect
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else if (user && pathname === "/admin/login") {
        router.replace("/admin");
      }
    }
  }, [user, isLoading, pathname, router]);

  // Mientras cargamos el token/usuario…
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si estamos en la página de login, renderizamos el formulario sin el AdminLayout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Si no hay usuario (y no estamos en login), no renderizamos nada (el useEffect ya redirige)
  if (!user) {
    return null;
  }

  // Rutas protegidas
  return <AdminLayout>{children}</AdminLayout>;
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
