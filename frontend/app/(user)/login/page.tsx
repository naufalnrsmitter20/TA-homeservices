"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Login failed", { id: toastId });
        return;
      } else {
        const data = await res.json();
        toast.success(data.message || "Login successful!", { id: toastId });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userData", JSON.stringify(data.data.user));
        router.refresh();
        router.push("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong during login.", { id: toastId });
    }
  };

  return (
    <div className="flex items-center justify-center bg-cover bg-center">
      <form onSubmit={handleLogin} className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            className="w-full mb-4 p-3 border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border border-gray-400 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition">
          Login
        </button>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don{"'"}t have an account?{" "}
          <Link href="/register">
            <div className="text-blue-600 font-medium hover:underline">Register</div>
          </Link>
        </p>
      </form>
    </div>
  );
}
