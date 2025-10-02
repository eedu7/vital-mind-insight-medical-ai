import { envConfig } from "@/env";

type ConversationCreateRequest = {
	title: string;
};

type ConversationCreateResponse = {
	title: string;
	uuid: string;
};

export async function createConversationApi(data: ConversationCreateRequest): Promise<ConversationCreateResponse> {
	const res = await fetch(`${envConfig.BASE_API_URL}/conversation/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});
	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`Failed: ${res.status} - ${errorText}`);
	}

	return await res.json();
}
