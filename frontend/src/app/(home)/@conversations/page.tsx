import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { IconSparkles } from "@tabler/icons-react";

export default function ConversationPageView() {
	return (
		<div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center py-14">
			<div className="space-y-14">
				<div className="flex flex-wrap gap-4">
					<Card className="min-w-[250px] flex-1">
						<CardHeader>
							<CardTitle>Role - 1</CardTitle>
						</CardHeader>
					</Card>
					<Card className="min-w-[250px] flex-1">
						<CardHeader>
							<CardTitle>Role - 2</CardTitle>
						</CardHeader>
					</Card>
					<Card className="min-w-[250px] flex-1">
						<CardHeader>
							<CardTitle>Role - 3</CardTitle>
						</CardHeader>
					</Card>
					<Card className="min-w-[250px] flex-1">
						<CardHeader>
							<CardTitle>Role - 4</CardTitle>
						</CardHeader>
					</Card>
					<Card className="min-w-[250px] flex-1">
						<CardHeader>
							<CardTitle>Role - 5</CardTitle>
						</CardHeader>
					</Card>
				</div>
				<div>
					<form className="space-y-2">
						<Textarea className="h-44 resize-none" placeholder="Add some prompt" />
						<div className="text-end">
							<Button variant="outline" size="icon" className="cursor-pointer">
								<IconSparkles />
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
