"use client";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

export default function ConversationLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen w-screen">
			<ReactFlowProvider>{children}</ReactFlowProvider>
		</div>
	);
}
