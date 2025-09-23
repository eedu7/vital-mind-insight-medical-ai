import { useMutation } from "@tanstack/react-query";

export default function useAuth() {
	const register = useMutation({
		mutationKey: ["register"],
		mutationFn: async (data) => {
			const res = await fetch("http://localhost:8080/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Registration failed");
			return res.json();
		},
	});

	return {
		register,
	};
}
