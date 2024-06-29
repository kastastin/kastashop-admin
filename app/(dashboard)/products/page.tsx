"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";

export default function ProductsPage() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		try {
			const response = await fetch("/api/products", {
				method: "GET",
			});
			const data = await response.json();

			setProducts(data);
			setIsLoading(false);
		} catch (err) {
			console.log("[dashboard: fetchProducts] error:", err);
		}
	}

	return isLoading ? (
		<Loader />
	) : (
		<div className="px-10 py-5">
			<div className="flex justify-between items-center">
				<p className="text-heading2-bold">Products</p>
				<Button
					className="bg-blue-1 text-white"
					onClick={() => router.push("/products/new")}
				>
					<Plus className="size-4 mr-2" />
					Create Product
				</Button>
			</div>

			<Separator className="my-4 bg-grey-1" />
			<DataTable data={products} columns={columns} searchKey="title" />
		</div>
	);
}
