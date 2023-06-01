import { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ClientOnly from './components/ClientOnly';

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Book your favorite destination now!",
  keywords : ["airbnb-clone", "booking-destination", "booking-destination-app", "website created by Manish"]
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
      <ClientOnly>
      <ToasterProvider/>
      <SearchModal />
     <RegisterModal />
     <LoginModal />
     <RentModal />
     
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-24">
        {children}
        </div>
      </ClientOnly>
        </body>
    </html>
  );
}
