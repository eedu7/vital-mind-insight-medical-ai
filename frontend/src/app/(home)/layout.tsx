"use client";
import { useAuth } from "@/modules/auth/hooks";
import React from "react";

interface HomeLayoutProps {
	children: React.ReactNode;
	public: React.ReactNode;
	private: React.ReactNode;
}

export default function HomeLayout({ children, private: PrivatePage, public: PublicPage }: HomeLayoutProps) {
	const { isAuthenticated } = useAuth();
	return <div>{isAuthenticated ? PrivatePage : PublicPage}</div>;
}
