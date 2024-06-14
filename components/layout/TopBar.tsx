"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import { navLinks } from "@/lib/constants";

export default function TopBar() {
	const pathname = usePathname();
	const [dropdownMenu, setDropdownMenu] = useState(false);

	return (
		<div className="w-full sticky top-0 z-20 flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
			<Image src="/logo.svg" alt="Logo" width={150} height={70} />

			<div className="flex gap-8 max-md:hidden">
				{navLinks.map((link) => (
					<Link
						key={link.label}
						href={link.url}
						className={`flex items-center gap-4 text-body-medium ${
							pathname === link.url ? "text-blue-1" : ""
						}`}
					>
						<p>{link.label}</p>
					</Link>
				))}
			</div>

			<div className="relative flex items-center gap-4">
				<Menu
					className="cursor-pointer md:hidden"
					onClick={() => setDropdownMenu(!dropdownMenu)}
				/>

				{dropdownMenu && (
					<div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.url}
								className="flex items-center gap-4 text-body-medium"
							>
								{link.icon}
								<p>{link.label}</p>
							</Link>
						))}
					</div>
				)}

				<UserButton />
			</div>
		</div>
	);
}
