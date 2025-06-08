"use client";

import React, { useEffect, useState } from "react";
import AdminHeader from "./_components/AdminHeader";
import { Employee, Services, Transaksi, User } from "@/lib/interfaces";
import { ArrowRightLeft, Briefcase, ContactRound, UsersIcon } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<User[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [transaction, setTransaction] = useState<Transaksi[]>([]);
  const [employee, setEmployee] = useState<Employee[]>([]);

  useEffect(() => {
    async function Fetching() {
      const token = localStorage.getItem("token");
      const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await resUser.json();
      setUser(userData.data);

      const resServices = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const servicesData = await resServices.json();
      setServices(servicesData.data);

      const resTransaction = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const transactionData = await resTransaction.json();
      setTransaction(transactionData.data);

      const resEmployee = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const employeeData = await resEmployee.json();
      setEmployee(employeeData.data);
    }
    Fetching();
  }, []);
  return (
    <div className="w-[80vw] min-h-screen h-auto">
      <AdminHeader>Dashboard</AdminHeader>
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              <ContactRound />
            </div>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-2xl font-medium text-pretty text-gray-900">{employee.length}</h3>
              <p className="mt-1 text-sm text-gray-700">Total Employee</p>
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
