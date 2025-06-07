"use client";
import React, { useEffect, useState } from "react";
import { Services } from "@/lib/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Services[]>([]);
  const router = useRouter();
  useEffect(() => {
    const tempCartStorage = localStorage.getItem("cart");
    const cartItems = tempCartStorage ? JSON.parse(tempCartStorage) : [];
    setCartItems(cartItems);
  }, []);
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pl-6 mt-2">
        <h4 className="font-medium text-xl">Cart</h4>
      </div>
      <div
        className="flex-1
         flex flex-col p-6 gap-6 bg-gray-50"
      >
        <div className="w-full bg-white border rounded shadow p-4">
          <div className="text-md font-semibold mb-2">Services</div>
          {cartItems.length === 0 ? (
            <div className="text-center w-full py-2 mt-6 bg-amber-50 rounded-lg border-amber-200">
              Keranjang Anda kosong. Silakan{" "}
              <span className="text-amber-400 hover:text-amber-500 font-medium">
                <Link href={"/layanan"}>tambahkan layanan</Link>
              </span>
              .
            </div>
          ) : (
            <>
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
              <div className="flex gap-4">
                <button type="button" onClick={() => router.back()} className="w-full mt-4 cursor-pointer bg-white text-amber-400 border-2 border-amber-400 py-2 px-4 rounded hover:bg-amber-50">
                  Kembali
                </button>
                <button type="button" onClick={() => router.push("/checkout")} className="w-full mt-4 cursor-pointer bg-amber-400 text-white py-2 px-4 rounded hover:bg-amber-300">
                  Selesaikan Pesanan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
