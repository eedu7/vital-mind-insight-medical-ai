import Image from "next/image";
import React from "react";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<main className="mx-auto flex h-screen w-full max-w-7xl">
				<div className="w-full max-w-md border p-2">{children}</div>
				<div className="relative flex-1 border border-zinc-100 bg-zinc-50">
					<Image src="/images/auth-pages/background_02.jpg" className="object-scale-down" alt="background" fill />
				</div>
			</main>
		</div>
	);
}
