"use client";
import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      {/* Header Navigation */}
      <header className="flex justify-end space-x-6 font-medium mb-6">
        <a href="#" className="hover:text-blue-600">
          Beranda
        </a>
        <a href="#" className="hover:text-blue-600">
          Kategori
        </a>
        <a href="#" className="hover:text-blue-600">
          Tentang kami
        </a>
        <a href="#" className="text-blue-600 font-bold">
          Layanan
        </a>
      </header>

      {/* Hero */}
      <section className="mb-10">
        <Image src="/images/hero-cleaning.jpg" alt="Hero" className="w-full rounded-lg mb-4" />
        <div className="flex">
          <input type="text" placeholder="Apa yang kamu butuhkan hari ini?" className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg" />
          <button className="bg-blue-800 text-white px-6 rounded-r-lg">Cari</button>
        </div>
      </section>

      {/* Layanan */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Layanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Cleaning Service",
              desc: "Membersihkan rumah atau kantor secara menyeluruh.",
            },
            {
              title: "Handyman Service",
              desc: "Layanan tukang untuk perbaikan ringan seperti pipa, pintu, dll.",
              icon: "🔧",
            },
            {
              title: "Security Service",
              desc: "Petugas keamanan profesional dan terpercaya.",
              icon: "🛡️",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{item.desc}</p>
              <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                Lihat jasa →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <Image src="/images/about-cleaning.jpg" alt="About" className="rounded-lg w-full md:w-1/2" />
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Best cleaning services provider since 2024</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
            <li>Lebih dari 10.000 klien sejak 2024</li>
            <li>Tim expert & alat bersih lengkap</li>
            <li>Rating 4.8/5 di Google & Shopee</li>
          </ul>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">More About Us →</button>
        </div>
      </section>
    </>
  );
};

// HomePage.getLayout = function getLayout(page: React.ReactNode) {
//   return <Layout>{page}</Layout>;
// };

export default HomePage;
