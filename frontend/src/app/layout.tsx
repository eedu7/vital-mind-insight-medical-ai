import { Toaster } from "@/components/ui/sonner";
import { TanstackReactQueryProvider } from "@/lib/api";
import { AuthProvider } from "@/modules/auth/providers";
import type { Metadata } from "next";
import { Dancing_Script, Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});
const dancingScript = Dancing_Script({
	variable: "--font-dancing-script",
	subsets: ["latin"],
	weight: ["400"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "VitalMind Insight",
	description: "VitalMind Insight Health AI",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = cookies();
	const access_token = (await cookieStore).get("access_token")?.value;

	const isAuthenticated = !!access_token;

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}>
				<TanstackReactQueryProvider>
					<AuthProvider initialAuth={isAuthenticated}>{children}</AuthProvider>
				</TanstackReactQueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
