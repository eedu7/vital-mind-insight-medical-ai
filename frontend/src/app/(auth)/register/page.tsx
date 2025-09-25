import { AuthCard } from "@/modules/auth/components/AuthCard";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register - VitalMind Insight",
	description: "Register - VitalMind Insight Health AI",
};
export default function RegisterPage() {
	return (
		<AuthCard
			description="Start you journey"
			title="Sign Up to VitalMind Insight"
			form={<RegisterForm />}
			bottomText="Have an account?"
			bottomLinkText="Sign in"
			bottomLinkHref="/login"
		/>
	);
}
