// app/login/layout.tsx
import React from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="min-h-screen max-h-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/pictures/cs2.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-300">{children}</div>
    </main>
  );
}
