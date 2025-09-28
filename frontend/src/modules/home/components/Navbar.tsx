import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavbarItem = {
	title: string;
	href: string;
};

const navbarItems: NavbarItem[] = [
	{
		title: "Home",
		href: "#hero",
	},
	{
		title: "Pricing",
		href: "#pricing",
	},
	{
		title: "Contact",
		href: "#contact-us",
	},

	{
		title: "FAQ",
		href: "#faq",
	},
];

export const Navbar = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navbarItems.map(({ title, href }, index) => (
					<NavigationMenuItem key={index}>
						<NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
							{title}
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
