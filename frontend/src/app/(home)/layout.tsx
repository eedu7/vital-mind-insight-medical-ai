"use client";

import { useAuth } from "@/modules/auth/hooks";
import React from "react";

interface HomeLayoutProps {
	home: React.ReactNode;
	conversations: React.ReactNode;
}

export default function HomeLayout({ conversations: ConversationPage, home: HomePage }: HomeLayoutProps) {
	const { isAuthenticated } = useAuth();
	return <div>{isAuthenticated ? ConversationPage : HomePage}</div>;
}
