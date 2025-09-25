"use client";

import { useState } from "react";

import { AuthContext } from "@/modules/auth/context/AuthContext";
import { loginApi, registerApi } from "@/modules/auth/services";
import { AuthResponse } from "@/modules/auth/types";
import setToken from "@/modules/auth/utils/set-tokens";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
	children: React.ReactNode;
	initialAuth: boolean;
}

export const AuthProvider = ({ children, initialAuth }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
	const router = useRouter();

	const handleSuccess = (response: AuthResponse) => {
		setToken(response);
		setIsAuthenticated(true);
		router.push("/");
	};

	const signUp = useMutation({
		mutationKey: ["register"],
		mutationFn: registerApi,
		onSuccess: handleSuccess,
	});

	const signIn = useMutation({
		mutationKey: ["login"],
		mutationFn: loginApi,
		onSuccess: handleSuccess,
	});

	return <AuthContext.Provider value={{ isAuthenticated, signIn, signUp }}>{children}</AuthContext.Provider>;
};
