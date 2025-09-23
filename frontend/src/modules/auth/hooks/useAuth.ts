import { AuthContext } from "@/modules/auth/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuthContext must be used within AuthProvider");
	return context;
};
