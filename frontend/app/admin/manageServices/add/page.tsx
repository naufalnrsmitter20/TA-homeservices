"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServiceType } from "@/lib/interfaces";
import Image from "next/image";
export default function AddServices() {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [servicesType, setServicesType] = useState<ServiceType[]>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchData() {
      const resServicesType = await fetch("http://localhost:5000/api/services/type", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resServicesType.ok) {
        throw new Error("Failed to fetch services type");
      }
      const servicesTypeData = await resServicesType.json();
      setServicesType(servicesTypeData.data);
    }
    fetchData();
  }, []);

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("loading...");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData(e.target as HTMLFormElement);
      console.log(selectedImage);
      const res = await fetch(`http://localhost:5000/api/services/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Services updated failed", { id: toastId });
        throw new Error(data.message || "Failed to update Services");
      }
      toast.success(data.message || "Services updated successfully", { id: toastId });
      router.push("/admin/manageServices");
    } catch (error) {
      toast.error((error as Error).message || "An error occurred", { id: toastId });
      console.error(error as Error);
    }
  };
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Services</h2>
      <form onSubmit={HandleSubmit} className="space-y-2 max-w-md">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="name"
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
            type="text"
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="price"
            id="price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price
          </label>
        </div>

        <div className="mb-5">
          <label htmlFor="servicesTypeId" className="block mb-2 text-sm font-medium text-gray-900">
            ServicesType
          </label>
          <select id="servicesTypeId" name="servicesTypeId" required className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-300 focus:border-amber-300 block w-full p-2.5">
            <option value="" disabled>
              Pilih layanan
            </option>
            {servicesType &&
              servicesType.map((st) => (
                <option key={st.id} value={String(st.id)}>
                  {st.name} - {st.description}
                </option>
              ))}
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="attachment"
            id="attachment"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer"
            placeholder=" "
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="attachment"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-400 peer-focus:dark:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Attachment
          </label>
        </div>
        <div>{selectedImage && <Image src={imagePreview as string} alt={""} width={200} height={200} unoptimized className="size-36 object-cover" />}</div>

        <button type="submit" className="focus:outline-none text-white bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:ring-amber-50 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Submit
        </button>
      </form>
    </div>
  );
}
