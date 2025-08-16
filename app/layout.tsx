// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ReactQueryProvider } from "./providers";  // <-- nuevo

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  /* …tu metadata… */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        
        {/* sólo esta parte es client */}
        <ReactQueryProvider>
          <main className="min-h-screen">{children}</main>
        </ReactQueryProvider>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
