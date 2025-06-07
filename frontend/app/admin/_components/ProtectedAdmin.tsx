"use client";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedAdmin() {
  const router = useRouter();
  useEffect(() => {
    const data = localStorage.getItem("userData");
    const user: User = JSON.parse(data || "{}");
    if (user.role !== "ADMIN") {
      router.push("/");
    }
  }, [router]);
  return <></>;
}
