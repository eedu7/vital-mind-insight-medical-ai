"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/modules/auth/hooks/useAuth";
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

	const { register } = useAuth();

	const onSubmit = (values: RegisterFormSchemaType) => {
		register.mutateAsync(values);
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
					disabled={!form.formState.isValid || register.isPending}
					aria-disabled={!form.formState.isValid || register.isPending}
				>
					{register.isPending ? (
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
