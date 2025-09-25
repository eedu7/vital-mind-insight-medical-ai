import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Register - VitalMind Insight",
	description: "Register - VitalMind Insight Health AI",
};

export default async function page() {
	return (
		<div className="mx-auto flex h-full flex-col justify-between">
			<div>
				<h1>VitalMind Insight Health AI</h1>
			</div>
			<div className="flex w-full items-center justify-center">
				<Card className="w-full max-w-lg">
					<CardHeader>
						<CardDescription>Start you journey</CardDescription>
						<CardTitle>Sign Up to VitalMind Insight</CardTitle>
					</CardHeader>
					<CardContent>
						<RegisterForm />
					</CardContent>
					<CardFooter className="flex flex-col gap-y-4">
						<div className="flex w-full items-center gap-4">
							<Separator className="flex-1" />
							<span className="text-muted-foreground text-sm">or sign up with</span>
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
				<p className="text-sm">Have an account?</p>
				<Link href="/login" className="text-sm text-blue-500 hover:underline">
					Sign in
				</Link>
			</div>
		</div>
	);
}
