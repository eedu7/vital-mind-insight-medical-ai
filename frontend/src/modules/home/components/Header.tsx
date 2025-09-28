import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/home/components/Navbar";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="fixed top-0 w-full bg-slate-50 p-4 shadow">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<div>
					<Link href="/" prefetch={false}>
						<h1 className="text-bold font-dancing-script text-2xl">VitalMind Insight</h1>
					</Link>
				</div>
				<Navbar />
				<div className="space-x-1">
					<Button variant="outline" className="cursor-pointer" asChild>
						<Link href="/login">Login</Link>
					</Button>
					<Button className="cursor-pointer" asChild>
						<Link href="/register">Get started</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};
