import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/env";
import { IconSparkles } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";

export const PromptInputNode = () => {
	const [prompt, setPrompt] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			const res = await fetch(`${config.BASE_API_URL}/conversation`, {
				
			})
		}
	};

	return (
		<div>
			<Card className="w-md">
				<CardHeader className="hidden" aria-hidden>
					<CardTitle></CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="w-full space-y-4">
						<Textarea
							placeholder="Hello, how can I help?"
							className="w-full resize-y"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
						/>
						<div className="flex items-center justify-end">
							<Button type="submit" variant="outline" size="icon" className="cursor-pointer">
								<IconSparkles />
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
