import { AuthCard } from "@/modules/auth/components/AuthCard";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login - VitalMind Insight",
	description: "Login - VitalMind Insight Health AI",
};

export default function LoginPage() {
	return (
		<AuthCard
			description="Welcome back,"
			title="Continue where you left"
			form={<LoginForm />}
			bottomText="New user?"
			bottomLinkText="Sign up"
			bottomLinkHref="/register"
		/>
	);
}
