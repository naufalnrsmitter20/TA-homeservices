"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ServiceType } from "@/lib/interfaces";

export default function Home({ serviceTypes }: { serviceTypes: ServiceType[] }) {
  const router = useRouter();
  const [area, setArea] = useState("");
  const [service, setService] = useState("");

  const handleSearch = () => {
    console.log("Search:", area, service);
    router.push(`/search?area=${area}&service=${service}`);
  };

  return (
    <main>
      <section className="relative">
        <Image unoptimized width={100} height={100} src="/pictures/cs1.jpg" alt="Cleaning" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg flex p-4 w-11/12 max-w-2xl">
            <select className="border p-2 rounded w-1/3 text-sm" value={area} onChange={(e) => setArea(e.target.value)}>
              <option value="">Cari area</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
            </select>
            <input type="text" placeholder="Layanan yang ingin kamu gunakan" className="border p-2 rounded w-2/3 mx-2 text-sm" value={service} onChange={(e) => setService(e.target.value)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500 transition" onClick={handleSearch}>
              Cari
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Layanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {serviceTypes.map((item) => (
            <div key={item.id} className="p-6 border rounded shadow-sm text-left">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <Link href="/layanan" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
                Lihat jasa →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 justify-center items-center">
          <Image unoptimized width={100} height={100} src="/pictures/cs2.jpg" alt="About Us" className="rounded-lg shadow w-full h-auto" />
          <div>
            <h3 className="text-xl font-semibold">Best cleaning services provider since 2024</h3>
            <ul className="text-sm text-gray-700 mt-4 space-y-2 list-disc list-inside">
              <li>Tenaga kerja profesional</li>
              <li>Layanan cepat dan bersih</li>
              <li>Pelayanan 24 jam</li>
              <li>Harga terjangkau dan transparan</li>
            </ul>
            <p className="mt-4 text-sm text-blue-600 font-bold">10+ tahun pengalaman</p>
            <button className="mt-4 bg-yellow-400 text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition">Lihat Selengkapnya</button>
          </div>
        </div>
      </section>
    </main>
  );
}
