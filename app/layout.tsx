import type { Metadata } from "next";
import { Inter, Khula, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const khula = Khula({ weight:["300"], subsets: ["latin"] });
const poppins = Poppins({weight:['100', '200', '400'], subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Bienvenid@ a Camu",
  description: "Software de Contructora Camu para administrar prospectos",
  icons:{
    icon:'/favicon.ico',
  }
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
