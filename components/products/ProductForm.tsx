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
import MultiText from "@/components/custom-ui/MultiText";

const formSchema = z.object({
	title: z.string().min(2).max(20),
	description: z.string().min(2).max(500).trim(),
	media: z.array(z.string()),
	category: z.string(),
	collections: z.array(z.string()),
	tags: z.array(z.string()),
	sizes: z.array(z.string()),
	colors: z.array(z.string()),
	price: z.coerce.number().min(0.1),
	expense: z.coerce.number().min(0.1),
});

export default function ProductForm({
	initialData,
}: {
	initialData?: ProductType | null;
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
					media: [],
					category: "",
					collections: [],
					tags: [],
					sizes: [],
					colors: [],
					price: 0.1,
					expense: 0.1,
			  },
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true);

			const url = initialData
				? `/api/products/${initialData._id}`
				: "/api/products";

			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(values),
			});

			if (response.ok) {
				setIsLoading(false);
				toast.success(`Product ${initialData ? "updated" : "created"}!`);
				window.location.href = "/products";
				router.push("/products");
			}
		} catch (err) {
			console.log("[POST ProductForm] error:", err);
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
					<p className="text-heading2-bold">Edit Product</p>
					<Delete id={initialData._id} />
				</div>
			) : (
				<p className="text-heading2-bold">Create Product</p>
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
								<FormMessage className="text-red-1" />
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
								<FormMessage className="text-red-1" />
							</FormItem>
						)}
					/>

					{/* Media */}
					<FormField
						control={form.control}
						name="media"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value}
										onChange={(url) => field.onChange([...field.value, url])}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter(
													(image: string | []) => image !== url
												),
											])
										}
									/>
								</FormControl>
								<FormMessage className="text-red-1" />
							</FormItem>
						)}
					/>

					<div className="gap-8 md:grid md:grid-cols-3">
						{/* Price */}
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price ($)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Price"
											onKeyDown={handleKeyPress}
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-1" />
								</FormItem>
							)}
						/>

						{/* Expense */}
						<FormField
							control={form.control}
							name="expense"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Expense ($)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Expense"
											onKeyDown={handleKeyPress}
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-1" />
								</FormItem>
							)}
						/>

						{/* Category */}
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Input
											placeholder="Category"
											onKeyDown={handleKeyPress}
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-1" />
								</FormItem>
							)}
						/>

						{/* Tags */}
						<FormField
							control={form.control}
							name="tags"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tags</FormLabel>
									<FormControl>
										<MultiText
											placeholder="Tags"
											value={field.value}
											onChange={(tag) => field.onChange([...field.value, tag])}
											onRemove={(tagToRemove) =>
												field.onChange([
													...field.value.filter((tag) => tag !== tagToRemove),
												])
											}
										/>
									</FormControl>
									<FormMessage className="text-red-1" />
								</FormItem>
							)}
						/>
					</div>

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
