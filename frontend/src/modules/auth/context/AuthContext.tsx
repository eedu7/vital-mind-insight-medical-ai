"use client";

import { createContext } from "react";

import { loginApi, registerApi } from "@/modules/auth/services";
import { AuthResponse } from "@/modules/auth/types";
import { useMutation } from "@tanstack/react-query";

interface AuthContextType {
	isAuthenticated: boolean;
	signUp: ReturnType<typeof useMutation<AuthResponse, unknown, Parameters<typeof registerApi>[0]>>;
	signIn: ReturnType<typeof useMutation<AuthResponse, unknown, Parameters<typeof loginApi>[0]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

