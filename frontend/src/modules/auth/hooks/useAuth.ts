import { loginApi, registerApi } from "@/modules/auth/services";
import { useMutation } from "@tanstack/react-query";

export default function useAuth() {
	const register = useMutation({
		mutationKey: ["register"],
		mutationFn: registerApi,
	});

	const login = useMutation({
		mutationKey: ["login"],
		mutationFn: loginApi,
	});

	return {
		register,
		login,
	};
}
