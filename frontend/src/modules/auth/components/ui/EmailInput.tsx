import { Input } from "@/components/ui/input";
import { IconMail } from "@tabler/icons-react";
import React, { useId } from "react";

type EmailInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const EmailInput = (props: EmailInputProps) => {
	const id = useId();
	return (
		<div className="relative">
			<Input id={id} className="peer pe-9" placeholder="Email" type="email" autoComplete="email" {...props} />
			<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
				<IconMail size={16} aria-hidden="true" />
			</div>
		</div>
	);
};
