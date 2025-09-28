interface ConversationIdPageProps {
	params: Promise<{ conversationId: string }>;
}
export default async function ConversationIdPage({ params }: ConversationIdPageProps) {
	const { conversationId } = await params;
	return <div>Page: {conversationId}</div>;
}
