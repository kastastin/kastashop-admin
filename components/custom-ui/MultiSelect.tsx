"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
	Command,
	CommandItem,
	CommandInput,
	CommandGroup,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
	placeholder: string;
	collections: CollectionType[];
	value: string[];
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
}

export default function MultiSelect({
	placeholder,
	collections,
	value,
	onChange,
	onRemove,
}: MultiSelectProps) {
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);

	let selected: CollectionType[] = [];

	if (value.length === 0) {
		selected = [];
	} else {
		selected = value.map((id) =>
			collections.find((c) => c._id === id)
		) as CollectionType[];
	}

	const selectables = collections.filter((c) => !selected.includes(c));

	return (
		<Command className="overflow-visible bg-white">
			<div className="flex flex-wrap gap-1 border rounded-md">
				{selected.map((collection) => (
					<Badge key={collection._id}>
						{collection.title}
						<button
							className="ml-1 hover:text-red-1"
							onClick={() => onRemove(collection._id)}
						>
							<X className="size-3" />
						</button>
					</Badge>
				))}

				<CommandInput
					placeholder={placeholder}
					value={inputValue}
					onValueChange={setInputValue}
					onBlur={() => setOpen(false)}
					onFocus={() => setOpen(true)}
				/>
			</div>

			<div className="relative mt-2">
				{open && (
					<CommandGroup className="w-full absolute top-0 z-10 overflow-auto border rounded-md shadow-md">
						{selectables.map((collection) => (
							<CommandItem
								key={collection._id}
								onMouseDown={(e) => e.preventDefault()}
								onSelect={() => {
									onChange(collection._id);
									setInputValue("");
								}}
								className="hover:bg-grey-2 cursor-pointer"
							>
								{collection.title}
							</CommandItem>
						))}
					</CommandGroup>
				)}
			</div>
		</Command>
	);
}
