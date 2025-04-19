import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "Hacka",
  description: "Connect. Collaborate. Create.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}