import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";

export const PromptInputCard = () => {
	const handleOnClock = () => {
		alert("Button clicked");
	};
	return (
		<div className="prompt-input-card-node">
			<Card className="w-full max-w-lg min-w-[350px]">
				<CardHeader>
					<CardTitle className="nodrag select-text">Prompt</CardTitle>
					<CardDescription className="nodrag select-text">Enter your prompt</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex w-full flex-col gap-y-2">
						<textarea placeholder="How moon orbit cycle affect the oceans?" className="hello p-2" rows={4} cols={500} />
						<Button type="button" onClick={() => handleOnClock()} className="cursor-pointer">
							Prompt
						</Button>
					</div>
				</CardContent>
				<Handle type="target" position={Position.Top} />
				<Handle type="source" position={Position.Bottom} />
			</Card>
		</div>
	);
};
