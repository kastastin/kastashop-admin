import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function Delete() {
	return (
		<Button className="bg-red-1 text-white">
			<Trash className="size-4" />
		</Button>
	);
}
