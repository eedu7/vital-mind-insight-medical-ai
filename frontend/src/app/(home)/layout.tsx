"use client";

import { useAuth } from "@/modules/auth/hooks";
import React from "react";

interface HomeLayoutProps {
	home: React.ReactNode;
	conversation: React.ReactNode;
}

export default function HomeLayout({ conversation: ConversationPage, home: HomePage }: HomeLayoutProps) {
	const { isAuthenticated } = useAuth();
	return <div>{isAuthenticated ? ConversationPage : HomePage}</div>;
}
