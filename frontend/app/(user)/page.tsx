import React from "react";
import Home from "./_components/Home";

export default async function page() {
  const serviceType = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/type`, {
    cache: "no-store",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch service types");
    }
    return res.json();
  });

  return <Home serviceTypes={serviceType.data} />;
}
