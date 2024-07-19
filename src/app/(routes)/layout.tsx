import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import UserProvider from "../../context/UserProvider";
import { headers } from "next/headers";
import { EdgeStoreProvider } from "@/lib/edgestore";

const monstserrat = Montserrat({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JagoMektek",
  description: "Portal Pembalajaran Siswa",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={monstserrat.className}>
        <UserProvider>
          <SessionProvider session={session}>
            <Navbar />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Footer />
          </SessionProvider>
        </UserProvider>
      </body>
    </html>
  );
}
