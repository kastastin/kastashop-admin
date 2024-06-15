import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
	value: string[];
	onChange: (value: string[]) => void;
	onRemove: (value: string[]) => void;
}

export default function ImageUpload({
	value,
	onChange,
	onRemove,
}: ImageUploadProps) {
	function onUpload(result: any) {
		onChange(result.info.secure_url);
	}

	return (
		<div>
			<div className="mb-4 flex flex-wrap items-center gap-4">
				{value.map((url) => (
					<div key={url} className="relative size-[200px]">
						<div className="absolute top-0 right-0 z-10">
							<Button
								size="sm"
								className="bg-red-1 text-white"
								onClick={() => onRemove([url])}
							>
								<Trash className="size-4" />
							</Button>
						</div>

						<Image
							src={url}
							alt="Collection"
							fill
							className="object-cover rounded-lg"
						/>
					</div>
				))}
			</div>

			<CldUploadWidget uploadPreset="kastashop_admin" onUpload={onUpload}>
				{({ open }) => {
					return (
						<Button className="bg-grey-1 text-white" onClick={() => open()}>
							<Plus className="size-4 mr-2" />
							Upload Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
}
