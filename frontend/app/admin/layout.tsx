import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./../globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "./_components/Sidebar";
import ProtectedAdmin from "./_components/ProtectedAdmin";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Admin | Klick Clean",
  description: "Klick Clean - Layanan Kebersihan Terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PoppinsFont.className} antialiased flex gap-x-4`}>
        <ProtectedAdmin>
          <Sidebar />
          <div>{children}</div>
          <Toaster />
        </ProtectedAdmin>
      </body>
    </html>
  );
}
