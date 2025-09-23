"use client";

import { useAuth } from "@/modules/auth/hooks";

export default function Home() {
	const { isAuthenticated } = useAuth();
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="cursor-pointer rounded-xl px-4 py-6 shadow-md shadow-teal-200 transition-all duration-500 hover:scale-105 hover:bg-teal-400 hover:text-white hover:shadow-xl hover:shadow-teal-300">
				{isAuthenticated ? (
					<h1 className="text-2xl font-bold text-shadow-lg">Home Page - Authenticated</h1>
				) : (
					<h1 className="text-2xl font-bold text-shadow-lg">Home Page</h1>
				)}
			</div>
		</div>
	);
}
