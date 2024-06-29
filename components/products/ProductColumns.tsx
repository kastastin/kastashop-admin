"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import Delete from "@/components/custom-ui/Delete";

export const columns: ColumnDef<ProductType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<Link href={`/products/${row.original._id}`} className="hover:text-red-1">
				{row.original.title}
			</Link>
		),
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "collection",
		header: "Collection",
		cell: ({ row }) => row.original.collection,
	},
	{
		accessorKey: "price",
		header: "Price ($)",
	},
	{
		accessorKey: "expense",
		header: "Expense ($)",
	},
	{
		id: "actions",
		cell: ({ row }) => <Delete id={row.original._id} item="product" />,
	},
];
