interface ConversationIdPage {
	params: Promise<{
		conversationId: string;
	}>;
}

export default async function ConversationIdPage({ params }: ConversationIdPage) {
	const { conversationId } = await params;
	return <div>ConversationIdPage: {conversationId}</div>;
}
