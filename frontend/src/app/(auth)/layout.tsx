import React from "react";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<main className="mx-auto flex h-screen w-full max-w-7xl">
				<div className="mx-auto w-full p-2">{children}</div>
			</main>
		</div>
	);
}
