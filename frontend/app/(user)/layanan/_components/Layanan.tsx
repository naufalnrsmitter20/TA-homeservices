"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Services, ServiceType } from "@/lib/interfaces";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Layanan({ services, serviceType }: { services: Services[]; serviceType: ServiceType[] }) {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [priceOrder, setPriceOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const router = useRouter();
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Filter by category
    if (selectedTypeId !== null) {
      result = result.filter((s) => s.servicesTypeId === selectedTypeId);
    }

    // Filter by keyword
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(term) || s.description.toLowerCase().includes(term));
    }

    // Filter by price range
    if (minPrice !== null) {
      result = result.filter((s) => s.price >= minPrice);
    }

    if (maxPrice !== null) {
      result = result.filter((s) => s.price <= maxPrice);
    }

    // Sort by price
    if (priceOrder === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (priceOrder === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [services, selectedTypeId, searchTerm, priceOrder, minPrice, maxPrice]);
  const [cartItems, setCartItems] = useState<Services[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
  }, [router]);

  const handleAddToCart = (serviceId: number) => {
    const serviceStorage = services.filter((service) => service.id === serviceId);
    const tempService = [...cartItems, ...serviceStorage];
    localStorage.setItem("cart", JSON.stringify(tempService));
    setCartItems(tempService);
    toast.success("Layanan telah ditambahkan ke keranjang!");
  };

  const handleRemoveFromCart = (serviceId: number) => {
    const updatedCart = cartItems.filter((service) => service.id !== serviceId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast("Layanan telah dihapus dari keranjang!", {
      icon: "🗑️",
    });
  };

  return (
    <main className="flex">
      <aside className="w-1/4 bg-gray-100 p-6 min-h-screen space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Kategori</h2>
          <ul className="space-y-2 text-gray-700">
            <li onClick={() => setSelectedTypeId(null)} className={`p-2 rounded cursor-pointer ${selectedTypeId === null ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}>
              <button>Semua Kategori</button>
            </li>
            {serviceType.map((type) => (
              <li key={type.id} onClick={() => setSelectedTypeId(type.id)} className={`p-2 rounded cursor-pointer ${selectedTypeId === type.id ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}>
                <button>{type.name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pencarian</h2>
          <input type="text" placeholder="Cari layanan..." className="w-full px-3 py-2 border rounded" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Filter Harga</h2>
          <div className="flex gap-2">
            <input type="number" placeholder="Min" className="w-1/2 px-2 py-1 border rounded" value={minPrice ?? ""} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)} />
            <input type="number" placeholder="Max" className="w-1/2 px-2 py-1 border rounded" value={maxPrice ?? ""} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Urutkan Harga</h2>
          <select className="w-full border rounded px-2 py-1" value={priceOrder} onChange={(e) => setPriceOrder(e.target.value)}>
            <option value="">Pilih urutan harga</option>
            <option value="high">Tertinggi ke Terendah</option>
            <option value="low">Terendah ke Tertinggi</option>
          </select>
        </div>
      </aside>

      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-2">Cleaning Service</h1>
        <p className="mb-4 text-gray-600">Temukan layanan terbaik sesuai kebutuhan Anda.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((product) => {
              const isInCart = cartItems.some((item) => item.id === product.id);
              return (
                <div key={product.id}>
                  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    <div className="relative">
                      <Image width={100} height={100} src={product.attachment} alt={product.name} className="w-full h-48 object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold">{product.name}</h4>
                      <p className="text-xs mb-2 text-amber-400">{product.ServicesType.name}</p>
                      <p className="text-sm font-semibold text-gray-800">Rp {product.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <div className="flex gap-3 items-center">
                        <button
                          onClick={() => {
                            // const confirmAdd = window.confirm(`Apakah Anda yakin ingin menambahkan layanan "${product.name}" ke keranjang?`);
                            // if (confirmAdd) {
                            handleAddToCart(product.id);
                            // }
                          }}
                          className={`mt-3 w-full py-3 rounded-lg font-medium text-sm ${isInCart ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-300 hover:ring-2 hover:ring-amber-50"}`}
                          disabled={isInCart}
                        >
                          {isInCart ? "Sudah di Keranjang" : "Add To Cart"}
                        </button>
                        <button onClick={() => handleRemoveFromCart(product.id)} className={`bg-white cursor-pointer duration-200 rounded-lg border-2 border-red-500 hover:bg-amber-50 w-auto p-2 mt-2 ${isInCart ? "block" : "hidden"}`}>
                          <TrashIcon className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-gray-500">Tidak ada layanan yang ditemukan.</p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="text-center w-full py-2 mt-6 bg-amber-50 rounded-lg border-amber-200">
            <Link href={"/cart"} className="text-gray-900 hover:text-amber-400">
              Lanjutkan Ke Keranjang
            </Link>
          </div>
        )}
        <div></div>
      </main>
    </main>
  );
}
