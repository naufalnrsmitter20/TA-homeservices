"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in.");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        toast.success("Logout successful!");
        router.push("/login");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.log(error as Error);
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <nav className="flex justify-between items-center px-6 py-4 w-full max-w-full shadow-md">
      <div className="text-xl font-bold">Klick Clean</div>
      <div className="text-sm font-medium">
        <ul className="flex items-center gap-6 justify-end">
          <li className="text-gray-900 hover:text-amber-400 duration-200">
            <Link href={"/"}>Homepage</Link>
          </li>
          <li className="text-gray-900 hover:text-amber-400 duration-200">
            <Link href={"/tentang_kami"}>Tentang</Link>
          </li>
          <li className="text-gray-900 hover:text-amber-400 duration-200">
            <Link href={"/layanan"}>Layanan</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="text-gray-900 hover:text-amber-400 duration-200">
                <Link href={"/profile"}>Profile</Link>
              </li>
              <li className="text-gray-900 hover:text-amber-400 duration-200">
                <Link href={"/cart"}>Cart</Link>
              </li>
              <li className="text-shadow-gray-900 w-full py-2 hover:text-red-400 duration-200">
                <button onClick={handleLogout} className="cursor-pointer" type="button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="text-gray-900 hover:text-amber-400 duration-200">
                <Link href={"/register"}>Register</Link>
              </li>
              <li className="text-gray-900 hover:text-amber-400 duration-200">
                <Link href={"/login"}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
