"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "@/components/custom-ui/Delete";

export const columns: ColumnDef<CollectionType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => <p>{row.original.title}</p>,
	},
	{
		accessorKey: "products",
		header: "Products",
		cell: ({ row }) => <p>{row.original.products.length}</p>,
	},
	{
		id: "actions",
		cell: ({ row }) => <Delete id={row.original._id} />,
	},
];
