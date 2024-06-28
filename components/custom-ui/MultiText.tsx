"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

	function addValue(item: string) {
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
						addValue(inputValue);
					}
				}}
			/>

			<div className="flex flex-wrap gap-1 mt-4">
				{value.map((item, i) => (
					<Badge key={i} className="bg-grey-1 text-white">
						{item}
						<button
							className="ml-1 rounded-full outline-none hover:bg-red-1"
							onClick={() => onRemove(item)}
						>
							<X className="size-3" />
						</button>
					</Badge>
				))}
			</div>
		</>
	);
}
