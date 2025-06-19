// app/page.js or page.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer"
import SessionWrapper from "./components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GetMeAChai",
  description: "Hot Chai To Serve You",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]`}
      >
        <SessionWrapper>
        <Navbar/>
        <div className=""> {children} </div>
        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
