"use client";

import React, { useEffect, useState } from "react";
import AdminHeader from "./_components/AdminHeader";
import { Services, Transaksi, User } from "@/lib/interfaces";
import { ArrowRightLeft, Briefcase, UsersIcon } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<User[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [transaction, setTransaction] = useState<Transaksi[]>([]);

  useEffect(() => {
    async function Fetching() {
      const token = localStorage.getItem("token");
      const resUser = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await resUser.json();
      setUser(userData.data);

      const resServices = await fetch("http://localhost:5000/api/services", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const servicesData = await resServices.json();
      setServices(servicesData.data);

      const resTransaction = await fetch("http://localhost:5000/api/transactions", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const transactionData = await resTransaction.json();
      setTransaction(transactionData.data);
    }
    Fetching();
  }, []);
  return (
    <div className="w-[80vw] min-h-screen h-auto">
      <AdminHeader>Dashboard</AdminHeader>
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
          <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div className="sm:order-last sm:shrink-0">
              <UsersIcon />
            </div>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-2xl font-medium text-pretty text-gray-900">{user.length}</h3>
              <p className="mt-1 text-sm text-gray-700">Total Users</p>
            </div>
          </div>
        </div>
        <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
          <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div className="sm:order-last sm:shrink-0">
              <Briefcase />
            </div>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-2xl font-medium text-pretty text-gray-900">{services.length}</h3>
              <p className="mt-1 text-sm text-gray-700">Total Services</p>
            </div>
          </div>
        </div>
        <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
          <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div className="sm:order-last sm:shrink-0">
              <ArrowRightLeft />
            </div>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-2xl font-medium text-pretty text-gray-900">{transaction.length}</h3>
              <p className="mt-1 text-sm text-gray-700">Total Transaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
