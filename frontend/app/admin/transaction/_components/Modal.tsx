import { Transaksi } from "@/lib/interfaces";
import React, { Dispatch, SetStateAction } from "react";

export default function Modal({ setIsOpenModal, data }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; data: Transaksi | null }) {
  return (
    <>
      <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
            Detail Transaction
          </h2>

          <div className="my-4 space-y-2">
            <p className="text-pretty text-gray-700">
              Customer Name: <span className="text-black font-semibold">{data?.user.name}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Employee Name: <span className="text-black font-semibold">{data?.employee?.name ?? "Not Assigned"}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Transaction Date: <span className="text-black font-semibold">{new Date(data?.transactionDate as Date).toUTCString()}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Invoice Number: <span className="text-black font-semibold">{data?.invoiceNumber}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Customer Notes: <span className="text-black font-semibold">{data?.notes}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Payment Method: <span className="text-black font-semibold">{data?.paymentMethod}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Payment Status: <span className="text-black font-semibold">{data?.paymentStatus}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Total Amount: <span className="text-black font-semibold">Rp. {data?.totalAmount?.toLocaleString("id-ID")}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Transaction Status: <span className="text-black font-semibold">{data?.transactionStatus}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Created At: <span className="text-black font-semibold">{new Date(data?.createdAt as Date).toUTCString()}</span>
            </p>
            <p className="text-pretty text-gray-700">
              Updated At: <span className="text-black font-semibold">{new Date(data?.updatedAt as Date).toUTCString()}</span>
            </p>
          </div>
          <button onClick={() => setIsOpenModal(false)} className="inline-block rounded-sm border border-amber-400 py-2 text-sm font-medium text-amber-400 hover:bg-amber-300 hover:text-white focus:ring-3 focus:outline-hidden w-full">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
