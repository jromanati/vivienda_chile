"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


// Ajusta estos tipos a tu API real
export interface Property {
  id: number;
  title: string;
  description?: string;
  images?: Array<{ id: number; url: string }>|string[];
  // ...otros campos
}

export type PropertyCreate = Record<string, any>;
export type PropertyUpdate = Record<string, any>;

const API = "http://127.0.0.1:8000";

function makeFormData(data?: object, files?: File[]) {
  const fd = new FormData();
  if (data && Object.keys(data).length > 0) {
    fd.append("data", JSON.stringify(data));
  }
  if (files && files.length > 0) {
    for (const f of files) fd.append("images", f);
  }
  return fd;
}

export function useProperties(token_admin?: string | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const token_admin_user = localStorage.getItem("admin_user");
  const token_client = localStorage.getItem("token");

  // Auto-login (tu /api/auth/login del Next)
  const autoLogin = useCallback(async (): Promise<string> => {
    const res = await fetch("/api/auth/login");
    if (!res.ok) throw new Error(`Auto-login failed: ${res.status}`);
    const data = await res.json();
    const newToken = data.access_token;
    if (!newToken) throw new Error("No access_token received during auto-login");
    localStorage.setItem("token", newToken);
    // setToken(newToken);
    return newToken;
  }, []);

  // Cargar token inicial
  // useEffect(() => {
  //   if (token_admin) {
  //     setToken(token_admin);
  //     return;
  //   }
  //   const saved = localStorage.getItem("token");
  //   if (saved) setToken(saved);
  // }, [token_admin]);

  // Sync entre pestañas
  // useEffect(() => {
  //   const onStorage = () => setToken(localStorage.getItem("token"));
  //   window.addEventListener("storage", onStorage);
  //   return () => window.removeEventListener("storage", onStorage);
  // }, []);

  // Si no hay token, intenta auto-login
  useEffect(() => {
    const token_client = localStorage.getItem("token");
    const token_admin_user = localStorage.getItem("admin_user");
    if (!token_client && !token_admin_user) {
      console.log('aja?=')
      autoLogin().catch(console.error);
    }
  }, [token, token_admin, autoLogin]);

  // WebSocket: actualiza cache en tiempo real
  useEffect(() => {
    const token_client = localStorage.getItem("token");
    const token_admin_user = localStorage.getItem("admin_user");
    console.log(token_client, 'token_client')
    console.log(token_admin_user, 'token_admin_user')
    if (!token_client && !token_admin_user) {
      return;
    }
    // Cierra cualquier conexión previa (reconexión limpia)
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try { wsRef.current.close(1000, "reconnect"); } catch {}
    }
  
    const wsBase =
      API.startsWith("https") ? API.replace("https", "wss") : API.replace("http", "ws");
  
    const ws = new WebSocket(`${wsBase}/ws/propiedades?token=${token_client}`);
    wsRef.current = ws;
  
    ws.onopen = () => console.log("WS conectado");
    ws.onmessage = (e) => {
      try {
        const prop: Property = JSON.parse(e.data);
  
        // Lista
        queryClient.setQueryData<Property[]>(["propiedades"], (old) => {
          if (!old) return [prop];
          const i = old.findIndex((p) => p.id === prop.id);
          if (i === -1) return [...old, prop];
          const copy = old.slice();
          copy[i] = prop;
          return copy;
        });
  
        // Detalle
        queryClient.setQueryData<Property>(["propiedad", prop.id], prop);
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };
  
    ws.onerror = (ev) => {
      // suele dispararse en dev por el cierre mientras CONNECTING
      console.error("WS error:", ev);
    };
  
    ws.onclose = (e) => {
      console.log("WS cerrado:", e.code, e.reason);
      if (wsRef.current === ws) wsRef.current = null;
    };
  
    // Cleanup "amable" para StrictMode: no cierres mientras CONNECTING
    return () => {
      if (!ws) return;
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.addEventListener(
          "open",
          () => {
            try { ws.close(1000, "unmounted while connecting"); } catch {}
          },
          { once: true }
        );
      } else if (ws.readyState === WebSocket.OPEN) {
        try { ws.close(1000, "component unmounted"); } catch {}
      }
    };
  }, [token_client, queryClient]);

  useEffect(() => {
    const token_admin_user = localStorage.getItem("admin_user");
    if (!token_admin_user) {
      return;
    }
    // Cierra cualquier conexión previa (reconexión limpia)
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try { wsRef.current.close(1000, "reconnect"); } catch {}
    }
  
    const wsBase =
      API.startsWith("https") ? API.replace("https", "wss") : API.replace("http", "ws");
  
    const ws = new WebSocket(`${wsBase}/ws/propiedades?token=${token_admin_user}`);
    wsRef.current = ws;
  
    ws.onopen = () => console.log("WS conectado");
    ws.onmessage = (e) => {
      try {
        const prop: Property = JSON.parse(e.data);
  
        // Lista
        queryClient.setQueryData<Property[]>(["propiedades"], (old) => {
          if (!old) return [prop];
          const i = old.findIndex((p) => p.id === prop.id);
          if (i === -1) return [...old, prop];
          const copy = old.slice();
          copy[i] = prop;
          return copy;
        });
  
        // Detalle
        queryClient.setQueryData<Property>(["propiedad", prop.id], prop);
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };
  
    ws.onerror = (ev) => {
      // suele dispararse en dev por el cierre mientras CONNECTING
      console.error("WS error:", ev);
    };
  
    ws.onclose = (e) => {
      console.log("WS cerrado:", e.code, e.reason);
      if (wsRef.current === ws) wsRef.current = null;
    };
  
    // Cleanup "amable" para StrictMode: no cierres mientras CONNECTING
    return () => {
      if (!ws) return;
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.addEventListener(
          "open",
          () => {
            try { ws.close(1000, "unmounted while connecting"); } catch {}
          },
          { once: true }
        );
      } else if (ws.readyState === WebSocket.OPEN) {
        try { ws.close(1000, "component unmounted"); } catch {}
      }
    };
  }, [token_admin_user, queryClient]);

  // LIST
  const listQuery = useQuery<Property[]>({
    queryKey: ["propiedades"],
    enabled: !!token,
    queryFn: async () => {
      let t = token ?? (await autoLogin());
      const url = `${API}/propiedades/?skip=0&limit=100`;
      let res = await fetch(url, { headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) {
        t = await autoLogin();
        res = await fetch(url, { headers: { Authorization: `Bearer ${t}` } });
      }
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
      return res.json();
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // CREATE (JSON o multipart si envías files)
  const createMutation = useMutation({
    mutationFn: async (args: { data: PropertyCreate; files?: File[] }): Promise<Property> => {
      const { data, files } = args;
      let t = token ?? (await autoLogin());

      // Si hay archivos -> multipart al endpoint /propiedades/create
      if (files && files.length > 0) {
        const url = `${API}/propiedades/create`;
        const body = makeFormData(data, files);
        let res = await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${t}` }, // ¡NO pongas Content-Type!
          body,
        });
        if (res.status === 401) {
          t = await autoLogin();
          res = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${t}` }, body });
        }
        if (!res.ok) throw new Error(`Error creando (multipart) ${res.status}: ${await res.text()}`);
        return res.json();
      }

      // Sin archivos -> JSON a /propiedades/
      {
        const url = `${API}/propiedades/`;
        let res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
          body: JSON.stringify(data),
        });
        if (res.status === 401) {
          t = await autoLogin();
          res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
            body: JSON.stringify(data),
          });
        }
        if (!res.ok) throw new Error(`Error creando ${res.status}: ${await res.text()}`);
        return res.json();
      }
    },
    onSuccess: (created) => {
      // Lista
      queryClient.setQueryData<Property[]>(["propiedades"], (old) => {
        if (!old) return [created];
        const i = old.findIndex((p) => p.id === created.id);
        if (i === -1) return [...old, created];
        const copy = old.slice();
        copy[i] = created;
        return copy;
      });
      // Detalle
      queryClient.setQueryData<Property>(["propiedad", created.id], created);
    },
  });

  // UPDATE (JSON o multipart)
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
      images,
    }: {
      id: number;
      payload: PropertyUpdate;   // tu tipo de update
      images?: File[];           // ahora sí, archivos reales
    }): Promise<Property> => {
      let currentToken = token ?? (await autoLogin());
      const url = `${API}/propiedades/${id}/update`;

      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));
      if (images && images.length) {
        for (const file of images) {
          fd.append("images", file); // mismo nombre que en FastAPI
        }
      }

      let res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentToken}`, // no pongas Content-Type
        },
        body: fd,
      });

      if (res.status === 401) {
        currentToken = await autoLogin();
        res = await fetch(url, {
          method: "PUT",
          headers: { Authorization: `Bearer ${currentToken}` },
          body: fd,
        });
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error actualizando propiedad (${res.status}): ${text}`);
      }

      return res.json();
    },
    onSuccess: (updated) => {
      // Lista
      queryClient.setQueryData<Property[]>(["propiedades"], (old) => {
        if (!old) return [updated];
        const idx = old.findIndex((p) => p.id === updated.id);
        if (idx === -1) return [...old, updated];
        const copy = old.slice();
        copy[idx] = updated;
        return copy;
      });
      // Detalle
      queryClient.setQueryData<Property>(["propiedad", updated.id], updated);
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      let t = token ?? (await autoLogin());
      const url = `${API}/propiedades/${id}`;
      let res = await fetch(url, { method: "DELETE", headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) {
        t = await autoLogin();
        res = await fetch(url, { method: "DELETE", headers: { Authorization: `Bearer ${t}` } });
      }
      if (!res.ok) throw new Error(`Error eliminando ${res.status}: ${await res.text()}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Property[]>(["propiedades"], (old) => (old ? old.filter((p) => p.id !== id) : old));
      queryClient.removeQueries({ queryKey: ["propiedad", id] });
    },
  });

  return {
    ...listQuery, // data, isLoading, error...

    // Crear
    // createProperty: (data: PropertyCreate, files?: File[]) =>
    //   createMutation.mutateAsync({ data, files }),
    // isCreating: createMutation.isPending,

    // // Actualizar
    // updateProperty: updateMutation.mutateAsync,

    // // Eliminar
    // deleteProperty: (id: number) => deleteMutation.mutateAsync(id),
    // isDeleting: deleteMutation.isPending,
  };
}

// Hook de detalle (GET /propiedades/:id) con hydrated initialData desde la lista
export function useProperty(id: number | string, token_admin?: string | null) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  const autoLogin = useCallback(async (): Promise<string> => {
    const res = await fetch("/api/auth/login");
    if (!res.ok) throw new Error(`Auto-login failed: ${res.status}`);
    const data = await res.json();
    const newToken = data.access_token;
    if (!newToken) throw new Error("No access_token received during auto-login");
    localStorage.setItem("token", newToken);
    setToken(newToken);
    return newToken;
  }, []);

  useEffect(() => {
    if (token_admin) {
      setToken(token_admin);
      return;
    }
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, [token_admin]);

  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!token && !token_admin) autoLogin().catch(console.error);
  }, [token, token_admin, autoLogin]);

  const numericId = typeof id === "string" ? Number(id) : id;
  const initialFromList = queryClient.getQueryData<Property[]>(["propiedades"])?.find((p) => p.id === numericId);

  return useQuery<Property>({
    queryKey: ["propiedad", numericId],
    enabled: !!numericId && !!token_admin,
    initialData: initialFromList,
    queryFn: async () => {
      let t = token_admin ?? (await autoLogin());
      const url = `${API}/propiedades/${numericId}`;
      let res = await fetch(url, { headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) {
        t = await autoLogin();
        res = await fetch(url, { headers: { Authorization: `Bearer ${t}` } });
      }
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
      const data = (await res.json()) as Property;

      // Mantén coherente la lista
      queryClient.setQueryData<Property[]>(["propiedades"], (old) => {
        if (!old) return [data];
        const idx = old.findIndex((p) => p.id === data.id);
        if (idx === -1) return [...old, data];
        const copy = old.slice();
        copy[idx] = data;
        return copy;
      });

      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
