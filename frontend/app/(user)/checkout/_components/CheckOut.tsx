"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Services } from "@/lib/interfaces";
import toast from "react-hot-toast";
enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  CREDIT_CARD = "CREDIT_CARD",
  CASH = "CASH",
}

const paymentLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.BANK_TRANSFER]: "Transfer Bank",
  [PaymentMethod.CREDIT_CARD]: "Kartu Kredit",
  [PaymentMethod.CASH]: "Tunai",
};
export default function CheckOut() {
  const router = useRouter();

  const [userCart, setUserCart] = useState<Services[]>();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [notes, setNotes] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const cart = localStorage.getItem("cart");
    setUserCart(JSON.parse(cart || "[]"));
  }, [router]);
  const totalPrice = userCart?.reduce((acc, cur) => acc + cur.price, 0);
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
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menambahkan layanan ke keranjang");
        return;
      }
      return res;
    } catch (error) {
      console.log(error as Error);
    }
  };

  const HandleTransaction = async (cartId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token tidak ditemukan");
        return;
      }

      const res = await fetch("http://localhost:5000/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId,
          paymentMethod: selectedPayment,
          notes,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal melakukan transaksi");
        return;
      }
      return res;
    } catch (error) {
      console.log(error as Error);
    }
  };

  const HandleCheckOut = async () => {
    try {
      if (!selectedPayment) {
        toast.error("Silakan pilih metode pembayaran");
        return;
      }
      if (!notes) {
        toast.error("Silakan isi catatan");
        return;
      }
      const addToCartAction = await HandleAddToCart();
      const cartAction = await addToCartAction?.json();
      if (addToCartAction?.ok) {
        const cartId = cartAction.data.id;
        const handleTransactionAction = await HandleTransaction(cartId);
        if (handleTransactionAction?.ok) {
          toast.success("Transaksi berhasil");
          localStorage.removeItem("cart");
          router.push("/profile");
        }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-start mb-4 gap-4">
          <div className="w-full bg-white border rounded shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <ArrowLeft onClick={() => router.back()} size={20} className="cursor-pointer" />
              <span className="font-medium">Pembayaran</span>
            </div>
            <div className="space-y-2">
              {Object.values(PaymentMethod).map((method) => (
                <div key={method} className={`border rounded p-3 cursor-pointer hover:bg-amber-100 ${selectedPayment === method ? "bg-amber-100" : ""}`} onClick={() => setSelectedPayment(method)}>
                  <span className="font-medium">{paymentLabels[method]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full bg-white border rounded shadow p-4">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="message"
              className="block p-2.5 w-full h-24 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Write your notes here..."
            ></textarea>
          </div>
        </div>

        <div className="w-full bg-white border rounded shadow p-4">
          <div className="text-md font-semibold mb-2">Services</div>
          <div className="space-y-2 mb-4">
            {userCart &&
              userCart.map((us) => (
                <div key={us.id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Image width={100} height={100} src={us.attachment as string} alt={us.name} unoptimized className="w-10 h-10 object-cover" />
                    <span>{us.name}</span>
                  </div>
                  <p className="text-sm">{us.description}</p>
                  <span>Rp. {us.price.toLocaleString("id-ID")}</span>
                </div>
              ))}
          </div>
          <div className="flex justify-between font-semibold pt-2">
            <span>Total</span>
            <span>Rp {totalPrice?.toLocaleString("id-ID") ?? 0}</span>
          </div>
          <button onClick={HandleCheckOut} className="w-full mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Checkout Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
