import { CldUploadWidget } from "next-cloudinary";
import { Plus } from "lucide-react";

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
	);
}
