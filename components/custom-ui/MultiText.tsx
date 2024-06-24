"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
	placeholder: string;
	value: string[];
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
}

export default function MultiText({
	placeholder,
	value,
	onChange,
	onRemove,
}: MultiTextProps) {
	const [inputValue, setInputValue] = useState("");

	function addTag(item: string) {
		onChange(item);
		setInputValue("");
	}

	return (
		<>
			<Input
				placeholder={placeholder}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						addTag(inputValue);
					}
				}}
			/>

			<div className="flex flex-wrap gap-1 mt-4">
				{value.map((tag, i) => (
					<Badge key={i} className="bg-grey-1 text-white">
						{tag}
						<Button
							size="sm"
							className="ml-1 rounded-full outline-none hover:bg-red-1"
							onClick={() => onRemove(tag)}
						>
							<X className="size-3" />
						</Button>
					</Badge>
				))}
			</div>
		</>
	);
}
