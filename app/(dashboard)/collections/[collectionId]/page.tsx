"use client";

import { useState, useEffect } from "react";

import Loader from "@/components/custom-ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";

export default function CollectionDetails({
	params,
}: {
	params: { collectionId: string };
}) {
	const [isLoading, setIsLoading] = useState(true);
	const [collectionDetails, setCollectionDetails] =
		useState<CollectionType | null>(null);

	useEffect(() => {
		fetchCollectionDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchCollectionDetails() {
		try {
			const response = await fetch(`/api/collections/${params.collectionId}`, {
				method: "GET",
			});
			const data = await response.json();

			setCollectionDetails(data);
			setIsLoading(false);
		} catch (err) {
			console.log("[dashboard: fetchCollectionDetails] error:", err);
		}
	}

	return isLoading ? (
		<Loader />
	) : (
		<CollectionForm initialData={collectionDetails} />
	);
}
