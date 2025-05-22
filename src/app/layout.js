import React from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Projeto Estudantes",
    icons: {
    icon: "/icon/favicon.ico",
  },
    description: "Projeto para genrenciar e mostrar visualmente uma api de estudantes",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
