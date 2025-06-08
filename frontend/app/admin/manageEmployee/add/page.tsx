"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
export default function AddUser() {
  const router = useRouter();
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("loading...");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Employee Added failed", { id: toastId });
        throw new Error(data.message || "Failed to update Employee");
      }
      toast.success(data.message || "Employee Added successfully", { id: toastId });
      router.push("/admin/manageEmployee");
    } catch (error) {
      toast.error((error as Error).message || "An error occurred", { id: toastId });
      console.error(error as Error);
    }
  };
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Employee</h2>
      <form onSubmit={HandleSubmit} className="space-y-2 max-w-md">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="position"
            id="position"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="position"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Position
          </label>
        </div>
        <button type="submit" className="focus:outline-none text-white bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:ring-amber-50 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Submit
        </button>
      </form>
    </div>
  );
}
