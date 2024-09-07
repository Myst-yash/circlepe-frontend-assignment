import type { Metadata } from "next";
import "./globals.css";
import { League_Spartan } from "next/font/google"; 


const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Circlepe FrontEnd Assignment",
  description: "Circlepe Frontend Development Assignment",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased ${leagueSpartan.style}`}>
        {children}
      </body>
    </html>
  );
}
