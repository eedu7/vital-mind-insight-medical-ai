"use client";

import { useAuth } from "@/modules/auth/hooks";
import React from "react";

interface HomeLayoutProps {
	home: React.ReactNode;
	conversations: React.ReactNode;
}

export default function HomeLayout({ conversations: ConversationsPage, home: HomePage }: HomeLayoutProps) {
	const { isAuthenticated } = useAuth();
	return <div>{isAuthenticated ? ConversationsPage : HomePage}</div>;
}
