"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/lib/interfaces";

export default function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("userData");

    if (!data) {
      router.push("/login");
      return;
    }

    let user: User;
    try {
      user = JSON.parse(data);
    } catch (e) {
      console.log(e);
      router.push("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.push("/");
      return;
    }

    setIsAuthorized(true);
    setLoading(false);
  }, [router]);

  if (loading) return null;

  return isAuthorized ? <>{children}</> : null;
}
