"use client";
import { Button } from "@/components/ui/button";
import { IconMicrophone, IconMicrophoneOff, IconPlus, IconSparkles } from "@tabler/icons-react";
import TextareaAutosize from "react-textarea-autosize";

export const PromptInput = () => {
	return (
		<div className="mx-auto flex max-w-3xl flex-col items-center gap-x-4 gap-y-2 rounded-2xl p-2 shadow">
			<div className="flex w-full items-center">
				<TextareaAutosize
					minRows={1}
					maxRows={10}
					className="w-full resize-none border-none p-2 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none"
					placeholder="Ask anything"
				/>
			</div>
			<div className="flex w-full items-center justify-between px-1">
				<div>
					<Button variant="outline" size="icon">
						<IconPlus />
					</Button>
				</div>
				<div className="space-x-2">
					<Button variant="outline" size="icon">
						{true ? <IconMicrophoneOff /> : <IconMicrophone />}
					</Button>
					<Button variant="outline" size="icon">
						<IconSparkles />
					</Button>
				</div>
			</div>
		</div>
	);
};
