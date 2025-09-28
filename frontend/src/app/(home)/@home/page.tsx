import { ContactUs } from "@/modules/home/components/ContactUs";
import { FAQ } from "@/modules/home/components/FAQ";
import { Header } from "@/modules/home/components/Header";
import { Hero } from "@/modules/home/components/Hero";
import { Pricing } from "@/modules/home/components/Pricing";

export default function PublicPage() {
	return (
		<div className="scroll-smooth duration-500 ease-in-out">
			<Header />
			<main className="my-4 space-y-12">
				<Hero />
				<Pricing />
				<ContactUs />
				<FAQ />
			</main>
		</div>
	);
}
