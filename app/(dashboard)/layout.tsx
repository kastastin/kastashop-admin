import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

import TopBar from "@/components/layout/TopBar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "KastaShop | Admin Panel",
	description: "Admin dashboard to manage KastaShop's data",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<ToasterProvider />
					<div className="flex max-lg:flex-col text-grey-1">
						<TopBar />
						<LeftSidebar />
						<div className="flex-1">{children}</div>
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
