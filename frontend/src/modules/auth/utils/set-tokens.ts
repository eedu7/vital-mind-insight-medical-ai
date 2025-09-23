import { AuthResponse } from "@/modules/auth/types";
import Cookies from "js-cookie";

export default function setToken(response: AuthResponse) {
	Cookies.set("access_token", response.token.access_token, {
		sameSite: "strict",
		secure: true,
	});
	Cookies.set("refresh_token", response.token.refresh_token, {
		sameSite: "strict",
		secure: true,
	});
}
