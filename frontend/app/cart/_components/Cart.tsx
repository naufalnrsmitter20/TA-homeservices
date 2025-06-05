"use client";
import React, { useEffect, useState } from "react";
import { Services } from "@/lib/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Services[]>([]);
  const router = useRouter();
  useEffect(() => {
    const tempCartStorage = localStorage.getItem("cart");
    const cartItems = tempCartStorage ? JSON.parse(tempCartStorage) : [];
    setCartItems(cartItems);
  }, []);
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.price, 0);
  const HandleAddToCart = async () => {
    try {
      const cartStorage = localStorage.getItem("cart");
      if (!cartStorage) {
        console.log("Keranjang kosong");
        return;
      }
      const token = localStorage.getItem("token");
      const cartItems = JSON.parse(cartStorage);
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: cartItems.map(
            (item: Services) =>
              ({
                id: item.id,
              }.id)
          ),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
      } else {
        toast.success("Layanan berhasil ditambahkan ke keranjang!");
        router.push("/checkout");
      }
    } catch (error) {
      console.log(error as Error);
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div
        className="flex-1
         flex flex-col p-6 gap-6 bg-gray-50"
      >
        <div className="w-full bg-white border rounded shadow p-4">
          <div className="text-md font-semibold mb-2">Services</div>
          <div className="space-y-2 mb-4">
            {cartItems.map((service) => (
              <div key={service.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                  <Image width={100} height={100} src={service.attachment as string} alt={service.name} unoptimized className="w-10 h-10 object-cover" />
                  <span>{service.name}</span>
                </div>
                <p className="text-sm">{service.description}</p>
                <span>Rp. {service.price.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold pt-2">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <button type="button" onClick={HandleAddToCart} className="w-full mt-4 cursor-pointer bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Selesaikan Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
