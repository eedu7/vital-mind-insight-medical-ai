"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/modules/auth/hooks";
import { LoginFormSchema, LoginFormSchemaType } from "@/modules/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoaderQuarter } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
	const form = useForm<LoginFormSchemaType>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const { signIn } = useAuth();

	const onSubmit = (values: LoginFormSchemaType) => {
		signIn.mutateAsync(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" autoComplete="email" placeholder="e.g, example@example.example" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" autoComplete="new-password" placeholder="e.g, Password@123" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full cursor-pointer"
					disabled={!form.formState.isValid || signIn.isPending}
					aria-disabled={!form.formState.isValid || signIn.isPending}
				>
					{signIn.isPending ? (
						<div className="flex items-center gap-x-2">
							<IconLoaderQuarter className="repeat-infinite animate-spin" />
							<span className="text-gray-200">Loging...</span>
						</div>
					) : (
						<span>Login</span>
					)}
				</Button>
			</form>
		</Form>
	);
};
