import { AuthResponse, LoginRequest, RegisterRequest } from "@/modules/auth/types";

export async function registerApi(data: RegisterRequest): Promise<AuthResponse> {
	try {
		const response = await fetch("http://localhost:8080/auth/web/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
			cache: "no-cache",
		});

		return response.json();
	} catch {
		throw new Error("Registration failed");
	}
}

export async function loginApi(data: LoginRequest): Promise<AuthResponse> {
	try {
		const response = await fetch("http://localhost:8080/auth/web/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
			cache: "no-cache",
		});

		return response.json();
	} catch {
		throw new Error("Login failed");
	}
}
