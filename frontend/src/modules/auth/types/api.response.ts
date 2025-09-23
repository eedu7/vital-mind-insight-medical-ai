type Token = {
	accessToken: string;
	refreshToken: string;
};

type User = {
	email: string;
	uuid: string;
};

export type AuthResponse = {
	token: Token;
	user: User;
};
