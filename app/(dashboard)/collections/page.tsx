"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/collections/CollectionColumns";

export default function CollectionsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [collections, setCollections] = useState([]);

	useEffect(() => {
		fetchCollections();
	}, []);

	async function fetchCollections() {
		try {
			const response = await fetch("/api/collections", { method: "GET" });
			const data = await response.json();

			setCollections(data);
			setIsLoading(false);
		} catch (err) {
			console.log("[dashboard: fetchCollections] error:", err);
		}
	}

	return (
		<div className="px-10 py-5">
			<div className="flex justify-between items-center">
				<p className="text-heading2-bold">Collections</p>
				<Button className="bg-blue-1 text-white">
					<Plus className="size-4 mr-2" />
					Create Collection
				</Button>
			</div>

			<Separator className="bg-grey-1 my-4" />

			<DataTable columns={columns} data={collections} />
		</div>
	);
}
