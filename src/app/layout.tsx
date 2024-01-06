import { Inter } from "next/font/google";
import "./main.css";
import "./icons.css";
import type { Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	metadataBase: new URL("https://passgen.demwe.me/"),
	title: "PassGen",
	description: "Password Generator",
	icons: {
		icon: [
			{
				url: "/favicon.png",
			},
		],
	},
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
			<Toaster expand={false} position="top-center" richColors />
		</html>
	);
}
