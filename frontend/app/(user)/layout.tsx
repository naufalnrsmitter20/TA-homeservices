import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./../globals.css";
import { Toaster } from "react-hot-toast";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Navbar from "../_components/Navbar";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Klick Clean",
  description: "Klick Clean - Layanan Kebersihan Terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PoppinsFont.className} antialiased`}>
        <Navbar />
        <div>{children}</div>
        <footer id="contact" className="bg-blue-900 text-white text-sm py-10 px-6 mt-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Klick Clean</h4>
              <div className="flex space-x-3 mt-4">
                <FacebookIcon />
                <InstagramIcon />
                <TwitterIcon />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Head Office</h4>
              <p>
                Jl. Kebersihan No. 123
                <br />
                Jakarta, Indonesia
                <br />
                021-555-1234
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Menu</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:underline">
                    Tentang
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:underline">
                    Layanan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
