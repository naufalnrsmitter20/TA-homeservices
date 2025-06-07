"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const router = useRouter();
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [router]);
  return (
    <div className="flex flex-col mt-10 items-center">
      <div className="w-full max-w-screen-md bg-white text-black p-6">
        <div className="mt-6 flex items-start space-x-6">
          <Image width={100} height={100} src="/pictures/profile1.jpg" alt="Profile" className="h-28 w-28 rounded-full object-cover" />
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-bold">Nama:</span> {userData.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-bold">Role:</span> {userData.role}
            </p>
          </div>
        </div>
        <div className="mt-10 border rounded-lg p-4 min-h-[200px]">
          <div className="space-y-6">
            <div className="border-b" />
            <div className="border-b" />
            <div className="border-b" />
            <div className="border-b" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
