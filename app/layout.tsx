import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({weight:['100', '200', '400'], subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Bienvenid@ a Camu",
  description: "Software de Contructora Camu para administrar prospectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
