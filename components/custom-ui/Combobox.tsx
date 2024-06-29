"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function Combobox({
	collections,
	comboboxValue,
	onChange,
}: {
	collections: CollectionType[];
	comboboxValue: string;
	onChange: (value: string) => void;
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(comboboxValue);
	}, [comboboxValue]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? collections.find((c) => c.title === value)?.title
						: "Select collection..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search collection..." className="h-9" />
					<CommandList>
						<CommandEmpty>No collection found.</CommandEmpty>
						<CommandGroup>
							{collections.map((collection) => (
								<CommandItem
									key={collection._id}
									value={collection.title}
									onSelect={(currentValue) => {
										// setValue(currentValue === value ? "" : currentValue);
										// setOpen(false);
										const newValue = currentValue === value ? "" : currentValue;
										setValue(newValue);
										onChange(newValue);
										setOpen(false);
									}}
								>
									{collection.title}
									<CheckIcon
										className={cn(
											"ml-auto size-4",
											value === collection.title ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
