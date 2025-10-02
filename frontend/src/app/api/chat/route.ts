
import { UIMessage, generateText } from "ai";
export async function Post(req:Request) {
  const {messages}: {messages: UIMessage[]} = await req.json();
}