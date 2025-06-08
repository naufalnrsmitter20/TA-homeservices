"use client";
import { Transaksi, User } from "@/lib/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [unpaidTransactions, setUnpaidTransactions] = useState<Transaksi[] | undefined>([]);
  const [paidTransactions, setPaidTransactions] = useState<Transaksi[] | undefined>([]);
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

    async function fetchTransactions() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await res.json();
        const users: User = data.data;
        setUnpaidTransactions(users?.Transaksi?.filter((t) => t.paymentStatus === "UNPAID"));
        setPaidTransactions(users?.Transaksi?.filter((t) => t.paymentStatus === "PAID"));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  }, [router]);

  const HandlePay = async (transactionId: number) => {
    const toastId = toast.loading("Processing payment...");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/pay/${transactionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Payment failed", { id: toastId });
        throw new Error(data.message || "Failed to process payment");
      }
      toast.success(data.message || "Payment processed successfully", { id: toastId });
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment", { id: toastId });
    }
  };
  return (
    <div className="flex flex-col mt-10 items-center min-h-screen">
      <div className="w-full max-w-full px-10 bg-white text-black p-6">
        <div className="mt-6 flex items-start space-x-6">
          <Image width={100} height={100} src="https://res.cloudinary.com/mokletorg/image/upload/f_auto,q_auto/user" alt="Profile" className="h-28 w-28 rounded-full object-cover" />
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
        <div className="mb-4 mt-8">
          <h4 className="font-semibold text-xl">Waiting for Payment</h4>
        </div>
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unpaidTransactions?.length !== 0 ? (
            unpaidTransactions?.map((dataUn, index) => (
              <div key={index} className="max-w-full flex flex-col justify-between mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                <div>
                  <div className="text-xl font-bold text-gray-800">
                    Transaction <span className="text-red-400">UNPAID</span> | #{index + 1}
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-2">
                    Invoice Number: <span className="text-amber-400">{dataUn.invoiceNumber}</span>
                  </div>
                  <div className="space-y-4 grid grid-cols-1 gap-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                        <p>Transaction Status:</p>
                        <p className={`font-semibold ${dataUn.transactionStatus === "SUCCESS" ? "text-green-400" : "text-red-400"}`}>{dataUn.transactionStatus}</p>

                        <p>Payment Status:</p>
                        <p className="font-semibold text-red-400">{dataUn.paymentStatus}</p>

                        <p>Total Amount:</p>
                        <p className="font-semibold text-green-600">Rp {dataUn.totalAmount.toLocaleString("id-ID")}</p>

                        <p>Payment Method:</p>
                        <p className="font-semibold">{dataUn.paymentMethod}</p>

                        <p>Transaction Date:</p>
                        <p className="font-semibold">{new Date(dataUn.transactionDate).toUTCString()}</p>

                        <p>Invoice Number:</p>
                        <p className="font-semibold"></p>

                        <p>Customer Notes:</p>
                        <p className="font-semibold">{dataUn.notes ?? "-"}</p>

                        <p>Item Count:</p>
                        <p className="font-semibold">{dataUn.DetailTransaksi.length}</p>
                      </div>

                      <div>
                        <h3 className="mt-4 mb-2 font-semibold text-gray-800">Detail Transaksi</h3>
                        <ul className="divide-y divide-gray-100 text-sm">
                          {dataUn.DetailTransaksi.map((item, index) => (
                            <li key={index} className="py-2 flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">{item.serviceName}</p>
                                <p className="text-gray-500">Rp {item.servicePrice.toLocaleString("id-ID")}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mt-4 mb-2 font-semibold text-gray-800">Detail Employee</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                          <p>Name:</p>
                          <span className="font-semibold">{dataUn.employee?.name ?? "Not Assigned"}</span>
                          <p>Email:</p>
                          <span className="font-semibold">{dataUn.employee?.email ?? "Not Assigned"}</span>
                          <p>Phone:</p>
                          <span className="font-semibold">{dataUn.employee?.phone ?? "Not Assigned"}</span>
                          <p>Position:</p>
                          <span className="font-semibold">{dataUn.employee?.position ?? "Not Assigned"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {dataUn.employee && (
                  <button
                    onClick={() => HandlePay(dataUn.id)}
                    className="inline-block mt-8 rounded-sm border border-amber-400 py-2 text-sm font-medium text-amber-400 hover:bg-amber-300 hover:text-white focus:ring-3 focus:outline-hidden w-full cursor-pointer"
                  >
                    Click to Pay
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="max-w-full bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <p className="text-center text-gray-500">No transactions found.</p>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-xl">Transaction History</h4>
        </div>
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paidTransactions?.length !== 0 ? (
            paidTransactions?.map((dataUn, index) => (
              <div key={index} className="max-w-full mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                <div className="text-xl font-bold text-gray-800">
                  Transaction <span className="text-green-400">PAID</span> | #{index + 1}
                </div>
                <div className="text-sm font-bold text-gray-800 mb-2">
                  Invoice Number: <span className="text-amber-400">{dataUn.invoiceNumber}</span>
                </div>
                <div className="space-y-4 grid grid-cols-1 gap-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                      <p>Transaction Status:</p>
                      <p className="font-semibold text-green-400">{dataUn.transactionStatus}</p>

                      <p>Payment Status:</p>
                      <p className="font-semibold text-green-400">{dataUn.paymentStatus}</p>

                      <p>Total Amount:</p>
                      <p className="font-semibold text-green-600">Rp {dataUn.totalAmount.toLocaleString("id-ID")}</p>

                      <p>Payment Method:</p>
                      <p className="font-semibold">{dataUn.paymentMethod}</p>

                      <p>Transaction Date:</p>
                      <p className="font-semibold">{new Date(dataUn.transactionDate).toUTCString()}</p>

                      <p>Invoice Number:</p>
                      <p className="font-semibold"></p>

                      <p>Customer Notes:</p>
                      <p className="font-semibold">{dataUn.notes ?? "-"}</p>

                      <p>Item Count:</p>
                      <p className="font-semibold">{dataUn.DetailTransaksi.length}</p>
                    </div>

                    <div>
                      <h3 className="mt-4 mb-2 font-semibold text-gray-800">Detail Transaksi</h3>
                      <ul className="divide-y divide-gray-100 text-sm">
                        {dataUn.DetailTransaksi.map((item, index) => (
                          <li key={index} className="py-2 flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{item.serviceName}</p>
                              <p className="text-gray-500">Rp {item.servicePrice.toLocaleString("id-ID")}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mt-4 mb-2 font-semibold text-gray-800">Detail Employee</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                        <p>Name:</p>
                        <span className="font-semibold">{dataUn.employee?.name ?? "Not Assigned"}</span>
                        <p>Email:</p>
                        <span className="font-semibold">{dataUn.employee?.email ?? "Not Assigned"}</span>
                        <p>Phone:</p>
                        <span className="font-semibold">{dataUn.employee?.phone ?? "Not Assigned"}</span>
                        <p>Position:</p>
                        <span className="font-semibold">{dataUn.employee?.position ?? "Not Assigned"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="max-w-full bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <p className="text-center text-gray-500">No transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
