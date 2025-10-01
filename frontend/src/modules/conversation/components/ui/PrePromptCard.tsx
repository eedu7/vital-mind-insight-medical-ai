import { Button } from "@/components/ui/button";
import { IconPlus, TablerIcon } from "@tabler/icons-react";

interface PrePromptCardProps {
	label: string;
	icon: TablerIcon;
}

export const PrePromptCard = ({ label, icon: Icon }: PrePromptCardProps) => {
	return (
		<div className="flex cursor-pointer items-center gap-2 rounded-2xl p-4 shadow transition-transform duration-200 hover:scale-105">
			<Icon />
			<div className="flex flex-1 items-center justify-between gap-4">
				<p>{label}</p>
				<Button variant="outline" size="icon" className="cursor-pointer">
					<IconPlus />
				</Button>
			</div>
		</div>
	);
};
