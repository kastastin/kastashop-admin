"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { navLinks } from "@/lib/constants";

export default function LeftSidebar() {
	const pathname = usePathname();

	return (
		<div className="min-h-dvh sticky top-0 left-0 p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
			<Image src="/logo.svg" alt="Logo" width={150} height={70} />

			<div className="flex flex-col gap-12">
				{navLinks.map((link) => (
					<Link
						key={link.label}
						href={link.url}
						className={`flex items-center gap-4 text-body-medium ${
							pathname === link.url ? "text-blue-1" : ""
						}`}
					>
						{link.icon}
						<p>{link.label}</p>
					</Link>
				))}
			</div>

			<div className="flex items-center gap-4 text-body-medium">
				<UserButton />
				<p>Edit Profile</p>
			</div>
		</div>
	);
}
