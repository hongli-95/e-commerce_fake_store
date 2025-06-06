import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import { StoreProvider } from "@/context/StoreContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fake Store",
	description: "E-commerce mockup, generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col gap-4 h-dvh bg-white text-black dark:bg-black dark:text-white`}
			>
				<StoreProvider>
					<Header />
					{children}
					<Footer />
				</StoreProvider>
			</body>
		</html>
	);
}
