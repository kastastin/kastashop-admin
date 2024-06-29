"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Delete from "@/components/custom-ui/Delete";
import ImageUpload from "@/components/custom-ui/ImageUpload";

const formSchema = z.object({
	title: z.string().min(2).max(20),
	description: z.string().min(2).max(500).trim(),
	image: z.string(),
});

export default function CollectionForm({
	initialData,
}: {
	initialData?: CollectionType | null;
}) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? initialData
			: {
					title: "",
					description: "",
					image: "",
			  },
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true);

			const url = initialData
				? `/api/collections/${initialData._id}`
				: "/api/collections";

			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(values),
			});

			if (response.ok) {
				setIsLoading(false);
				toast.success(`Collection ${initialData ? "updated" : "created"}!`);
				window.location.href = "/collections";
				router.push("/collections");
			}
		} catch (err) {
			console.log("[POST CollectionForm] error:", err);
			toast.error("Something went wrong!");
		}
	}

	function handleKeyPress(
		e:
			| React.KeyboardEvent<HTMLInputElement>
			| React.KeyboardEvent<HTMLTextAreaElement>
	) {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	}

	return (
		<div className="p-10">
			{initialData ? (
				<div className="flex justify-between items-center">
					<p className="text-heading2-bold">Edit Collection</p>
					<Delete id={initialData._id} item="collection" />
				</div>
			) : (
				<p className="text-heading2-bold">Create Collection</p>
			)}

			<Separator className="mt-4 mb-7 bg-grey-1" />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Title */}
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										onKeyDown={handleKeyPress}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Description"
										rows={5}
										onKeyDown={handleKeyPress}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Image */}
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange("")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex gap-10">
						<Button type="submit" className="bg-blue-1 text-white">
							Submit
						</Button>

						<Button
							type="button"
							className="bg-blue-1 text-white"
							onClick={() => router.push("/collections")}
						>
							Discard
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
