"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconSparkles } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ConversationPageView() {
	const router = useRouter();
	const [prompt, setPrompt] = useState("");
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		e.stopPropagation();

		
		
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
						<Button variant="outline" size="icon" className="cursor-pointer">
							<IconSparkles />
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
