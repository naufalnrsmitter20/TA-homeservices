import React, { ReactNode } from "react";

export default function AdminHeader({ children }: { children: ReactNode }) {
  return (
    <header className="bg-amber-50 flex flex-col items-center justify-center w-full h-auto py-3">
      <p className="font-medium text-gray-900 text-xl">{children} Page</p>
    </header>
  );
}
