import { Employee, Transaksi } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function InsertEmployee({ setIsOpenModal, employeeData, data }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; employeeData: Employee[]; data?: Transaksi | null }) {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData(e.currentTarget);
      const employeeId = formData.get("employeeId");
      if (!employeeId) {
        throw new Error("Employee ID is required");
      }
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/addEmployee/${data?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ employeeId }),
      });
      const dataset = await res.json();
      if (!res.ok) {
        toast.error(dataset.message || "Failed to update transaction", { id: toastId });
        throw new Error(dataset.message || "Failed to update transaction");
      }
      toast.success(dataset.message || "Transaction updated successfully", { id: toastId });
      router.refresh();
      window.location.reload();
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
            Insert/Edit Employee
          </h2>

          <div className="my-5">
            <label htmlFor="employeeId" className="block mb-2 text-sm font-medium text-gray-900">
              Insert Employee
            </label>
            <select
              defaultValue={String(data?.employeeId)}
              id="employeeId"
              name="employeeId"
              required
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-300 focus:border-amber-300 block w-full p-2.5"
            >
              <option value="" disabled>
                Choose Employee
              </option>
              {employeeData.map((st) => (
                <option key={st.id} value={String(st.id)}>
                  {st.name} - {st.position}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="inline-block rounded-sm border border-amber-400 py-2 text-sm font-medium bg-amber-400 text-white hover:bg-amber-300 focus:ring-3 focus:outline-hidden w-full">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsOpenModal(false)}
              className="inline-block rounded-sm border border-amber-400 py-2 text-sm font-medium text-amber-400 hover:bg-amber-300 hover:text-white focus:ring-3 focus:outline-hidden w-full"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
