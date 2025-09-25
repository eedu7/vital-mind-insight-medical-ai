"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EmailInput } from "@/modules/auth/components/ui/EmailInput";
import PasswordInput from "@/modules/auth/components/ui/PasswordInput";
import { useAuth } from "@/modules/auth/hooks";
import { RegisterFormSchema, RegisterFormSchemaType } from "@/modules/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoaderQuarter } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
	const form = useForm<RegisterFormSchemaType>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const { signUp } = useAuth();

	const onSubmit = (values: RegisterFormSchemaType) => {
		signUp.mutateAsync(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<EmailInput {...field} />
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
								<PasswordInput autoComplete="new-password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full cursor-pointer"
					disabled={!form.formState.isValid || signUp.isPending}
					aria-disabled={!form.formState.isValid || signUp.isPending}
				>
					{signUp.isPending ? (
						<div className="flex items-center gap-x-2">
							<IconLoaderQuarter className="repeat-infinite animate-spin" />
							<span className="text-gray-200">Registering...</span>
						</div>
					) : (
						<span>Register</span>
					)}
				</Button>
			</form>
		</Form>
	);
};
