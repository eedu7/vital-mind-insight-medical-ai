"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createConversationAPI } from "@/modules/conversations/services/api";
import { ConversationResponse } from "@/modules/conversations/types";
import { IconSparkles } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ConversationPageView() {
	const router = useRouter();
	const [prompt, setPrompt] = useState("");

	const createConversation = useMutation({
		mutationKey: ["conversationPageView"],
		mutationFn: createConversationAPI,
		onSuccess: (data: ConversationResponse) => {
			alert(JSON.stringify(data, null, 2));
			router.push(`/c/${data?.uuid}`);
		},
	});

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		createConversation.mutateAsync({ title: prompt });
	};

	return (
		<div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center py-14">
			<div className="space-y-4">
				<h1 className="font-dancing-script text-shadow-xl text-center text-2xl font-bold">What is on your mind</h1>
				<form onSubmit={onSubmit} className="space-y-2">
					<Textarea
						className="max-h-44 w-xl max-w-xl resize-y"
						placeholder="Add some prompt"
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
					/>
					<div className="text-end">
						<Button type="submit" variant="outline" size="icon" className="cursor-pointer">
							<IconSparkles />
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
