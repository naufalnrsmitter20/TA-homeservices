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
      const res = await fetch("http://localhost:5000/api/auth/logout", {
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
          {/* <li className="relative">
            <button onClick={toggleDropdown} className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0 md:w-auto duration-200">
              Layanan
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            {isOpen && (
              <div className="z-10 font-normal absolute -right-10 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link href="/layanan/handyman" className="block px-4 py-2 hover:bg-gray-100">
                      Handyman Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/layanan/cleaning_service" className="block px-4 py-2 hover:bg-gray-100">
                      Cleaning Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/layanan/daycare" className="block px-4 py-2 hover:bg-gray-100">
                      Daycare
                    </Link>
                  </li>
                  <li>
                    <Link href="/layanan/security" className="block px-4 py-2 hover:bg-gray-100">
                      Security Service
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li> */}
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
