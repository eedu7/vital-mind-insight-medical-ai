"use client";

import { createContext, useEffect, useState } from "react";

import { loginApi, registerApi } from "@/modules/auth/services";
import { AuthResponse } from "@/modules/auth/types";
import setToken from "@/modules/auth/utils/set-tokens";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
	isAuthenticated: boolean;
	signUp: ReturnType<typeof useMutation<AuthResponse, unknown, Parameters<typeof registerApi>[0]>>;
	signIn: ReturnType<typeof useMutation<AuthResponse, unknown, Parameters<typeof loginApi>[0]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("access_token");
		setIsAuthenticated(!!token);
	}, []);

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
