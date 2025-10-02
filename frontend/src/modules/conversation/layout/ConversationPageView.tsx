"use client";
import { PromptInput } from "@/modules/conversation/components/PromptInput";
import { PrePromptCard } from "@/modules/conversation/components/ui/PrePromptCard";
import { useConversation } from "@/modules/conversation/hooks/useConversation";
import { IconChecklist, IconCode, IconSparkles, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export const ConversationPageView = () => {
	const [prompt, setPrompt] = useState("");
	const { create } = useConversation();

	const onSubmit = () => {
		create.mutateAsync({
			title: prompt,
		});
	};

	return (
		<div className="mx-auto flex h-screen w-full max-w-4xl flex-col justify-between gap-y-12 py-12">
			<div className="flex flex-1 flex-col items-center justify-center gap-y-12">
				<div className="space-y-2">
					<h1 className="--font-dancing-script text-center text-4xl font-bold">Welcome to VitalMind Insight</h1>
					<p className="text-center text-sm text-gray-400">
						Get started by Script a task and Chat to do the rest. Not Sure where to start?
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<PrePromptCard icon={IconChecklist} label="Write a copy" />
					<PrePromptCard icon={IconSparkles} label="Image Generation" />
					<PrePromptCard icon={IconUser} label="Create avatar" />
					<PrePromptCard icon={IconCode} label="Write code" />
				</div>
			</div>
			<div>
				<PromptInput value={prompt} onChange={setPrompt} onClick={onSubmit} isPending={create.isPending} />
			</div>
		</div>
	);
};
