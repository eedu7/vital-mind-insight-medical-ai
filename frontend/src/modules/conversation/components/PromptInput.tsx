"use client";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconMicrophone, IconPlus, IconSparkles } from "@tabler/icons-react";
import { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface PromptInputProps {
	value: string;
	onChange: (value: string) => void;
	onClick: () => void;
	isPending: boolean;
}

export const PromptInput = ({ value, onChange, onClick, isPending }: PromptInputProps) => {
	return (
		<div className="mx-auto flex max-w-3xl flex-col items-center gap-x-4 gap-y-2 rounded-2xl p-2 shadow">
			<div className="flex w-full items-center">
				<TextareaAutosize
					value={value}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
					minRows={1}
					maxRows={10}
					className="w-full resize-none border-none p-2 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none"
					placeholder="Ask anything"
				/>
			</div>
			<div className="flex w-full items-center justify-between px-1">
				<div>
					<Button variant="outline" size="icon" disabled>
						<IconPlus />
					</Button>
				</div>
				<div className="space-x-2">
					<Button variant="outline" size="icon" disabled>
						<IconMicrophone />
					</Button>
					<Button variant="outline" size="icon" onClick={onClick} disabled={isPending}>
						{isPending ? <IconLoader2 className="repeat-infinite animate-spin" /> : <IconSparkles />}
					</Button>
				</div>
			</div>
		</div>
	);
};
