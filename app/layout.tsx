import type { Metadata } from "next";
import "./globals.css";
import { rc_light } from "./fonts";

export const metadata: Metadata = {
    title: "Arun Karki",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth max-w-[2000px] mx-auto select-none"
        >
            <body className={`${rc_light.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
