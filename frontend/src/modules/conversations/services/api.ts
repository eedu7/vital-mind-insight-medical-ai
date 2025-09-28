import { envConfig } from "@/env";
import { ConversationCreate, ConversationResponse } from "@/modules/conversations/types";

export async function createConversationAPI(data: ConversationCreate): Promise<ConversationResponse> {
	try {
		const res = await fetch(`${envConfig.BASE_API_URL}/conversation`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!res.ok) throw new Error("Failed to create conversation");
		return (await res.json()) as ConversationResponse;
	} catch (err) {
		console.log(err);
	}
}
