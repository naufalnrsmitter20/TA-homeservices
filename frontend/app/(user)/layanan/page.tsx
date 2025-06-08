import React from "react";
import Layanan from "./_components/Layanan";

export default async function page() {
  const serviceType = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/type`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const serviceTypeRes = await serviceType.json();
  const services = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const servicesRes = await services.json();
  return <Layanan services={servicesRes.data} serviceType={serviceTypeRes.data} />;
}
