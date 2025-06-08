"use client";
import { User } from "@/lib/interfaces";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredUser, setFilteredUser] = useState<User[]>(users);
  useEffect(() => {
    async function Fetching() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();
      setUsers(user.data);
    }
    Fetching();
  }, []);
  console.log(users);

  useEffect(() => {
    const filterProjects = () => {
      const filteredByName = users.filter((x) => x?.name?.toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredUser(filteredByName);
    };
    filterProjects();
  }, [searchInput, users]);
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const column: TableColumn<User>[] = [
    {
      name: "No",
      selector: (row, idx) => (idx as number) + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name as string,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role!,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt!).toUTCString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => new Date(row.updatedAt!).toUTCString(),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button title="Edit" onClick={() => editUserData(row)} className="p-2 bg-blue-500 text-white rounded-lg hover:scale-110 active:scale-105 duration-150">
            <Pencil size={14} />
          </button>
          <button
            title="Delete"
            onClick={() => {
              const confirmDelete = confirm("Are you sure you want to delete this user?");
              if (confirmDelete) {
                deteleUserData(row.id as number);
              }
            }}
            className="p-2.5 bg-red-500 text-white rounded-md hover:scale-110 active:scale-105 duration-150"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  function editUserData(data: User) {
    router.push(`/admin/manageUser/edit/${data.id}`);
  }

  const deteleUserData = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUser(filteredUser.filter((user) => user.id !== id));
    }
    toast.success(data.message);
    router.refresh();
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return;
  <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-primary-green" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2 px-4 sm:px-6 lg:px-8 py-6 mb-4">
          <label htmlFor="Search">
            <span className="text-sm font-medium text-gray-700"> Search </span>
            <div className="relative">
              <input
                value={searchInput}
                onChange={handleSearchInput}
                type="text"
                id="Search"
                className="mt-0.5 w-full rounded border border-gray-300 outline-none focus:border-amber-300 px-4 pe-10 shadow-sm focus:shadow-amber-50 py-2 sm:text-sm"
                placeholder="search data"
              />
              <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
                <button type="button" aria-label="Submit" className="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </span>
            </div>
          </label>
        </div>
        <button
          onClick={() => router.push("/admin/manageUser/add")}
          type="button"
          className="focus:outline-none text-white bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:ring-amber-50 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add New
        </button>
      </div>
      <DataTable columns={column} data={filteredUser} pagination highlightOnHover />
    </div>
  );
}
