import { Button } from "@/components/ui/button";
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";

export const OAuthButton = () => {
	return (
		<div className="space-x-4">
			<Button variant="outline" size="icon" className="cursor-pointer" disabled aria-disabled>
				<IconBrandGoogle />
			</Button>
			<Button variant="outline" size="icon" className="cursor-pointer" disabled aria-disabled>
				<IconBrandFacebook />
			</Button>
			<Button variant="outline" size="icon" className="cursor-pointer" disabled aria-disabled>
				<IconBrandApple />
			</Button>
		</div>
	);
};
