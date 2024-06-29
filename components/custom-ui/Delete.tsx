"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function Delete({ id, item }: { id: string; item: string }) {
	const [isLoading, setIsLoading] = useState(false);

	async function onDelete() {
		try {
			setIsLoading(true);
			const itemType = item === "product" ? "products" : "collections";

			const response = await fetch(`/api/${itemType}/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setIsLoading(false);
				window.location.href = `/${itemType}`;
				toast.success(`${item} is deleted!`);
			}
		} catch (err) {
			console.log(err);
			toast.error("Something went wrong!");
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<div className="h-10 px-4 inline-flex items-center justify-center bg-red-1 text-white rounded-md">
					<Trash className="size-4" />
				</div>
			</AlertDialogTrigger>

			<AlertDialogContent className="bg-white text-grey-1">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-red-1">
						Are you absolutely sure?
					</AlertDialogTitle>

					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your{" "}
						{item}.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
