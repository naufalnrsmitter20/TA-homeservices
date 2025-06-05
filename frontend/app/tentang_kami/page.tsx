"use client";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-white">
      <section className="bg-white text-black py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Image width={100} height={100} src="/pictures/cs3.jpg" unoptimized alt="About Us" className="rounded-lg w-full h-auto" />
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Introduction <span className="text-black">To Best Cleaning Service!</span>
            </h2>
            <p className="mb-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <Image width={100} height={100} src="/pictures/profile1.jpg" alt="Service 1" className="rounded w-full h-48 object-cover mb-2" />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Image width={100} height={100} src="/pictures/profile2.jpg" alt="Service 2" className="rounded w-full h-48 object-cover mb-2" />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Image width={100} height={100} src="/pictures/profile3.jpg" alt="Service 3" className="rounded w-full h-48 object-cover mb-2" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-white text-center">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4">Team Members</h3>
        <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        <div className="flex justify-center gap-6 overflow-x-auto px-6">
          <Image width={100} height={100} src="/pictures/profile1.jpg" alt="Member 1" className="rounded-lg w-40 h-40 object-cover" />
          <Image width={100} height={100} src="/pictures/profile2.jpg" alt="Member 2" className="rounded-lg w-40 h-40 object-cover" />
          <Image width={100} height={100} src="/pictures/profile3.jpg" alt="Member 3" className="rounded-lg w-40 h-40 object-cover" />
        </div>
      </section>
    </div>
  );
}
