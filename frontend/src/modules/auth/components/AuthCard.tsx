import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle, ReactNode } from "@tabler/icons-react";
import Link from "next/link";

interface AuthCardProps {
	description: string;
	title: string;
	form: ReactNode;
	bottomText: string;
	bottomLinkText: string;
	bottomLinkHref: string;
}

export const AuthCard = ({ description, title, form, bottomText, bottomLinkText, bottomLinkHref }: AuthCardProps) => {
	return (
		<div className="mx-auto flex h-full flex-col justify-between">
			<div>
				<h1>VitalMind Insight Health AI</h1>
			</div>

			<div className="flex w-full items-center justify-center">
				<Card className="w-full max-w-lg">
					<CardHeader>
						<CardDescription>{description}</CardDescription>
						<CardTitle>{title}</CardTitle>
					</CardHeader>

					<CardContent>{form}</CardContent>

					<CardFooter className="flex flex-col gap-y-4">
						<div className="flex w-full items-center gap-4">
							<Separator className="flex-1" />
							<span className="text-muted-foreground text-sm">
								{description.includes("Welcome") ? "or sign in with" : "or sign up with"}
							</span>
							<Separator className="flex-1" />
						</div>

						<div className="space-x-4">
							<Button variant="outline" size="icon" className="cursor-pointer">
								<IconBrandGoogle />
							</Button>
							<Button variant="outline" size="icon" className="cursor-pointer">
								<IconBrandFacebook />
							</Button>
							<Button variant="outline" size="icon" className="cursor-pointer">
								<IconBrandApple />
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>

			<div className="flex gap-x-1">
				<p className="text-sm">{bottomText}</p>
				<Link href={bottomLinkHref} className="text-sm text-blue-500 hover:underline">
					{bottomLinkText}
				</Link>
			</div>
		</div>
	);
};
