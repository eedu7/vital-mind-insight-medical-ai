"use client";
import { createConversationApi } from "@/modules/conversation/services/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useConversation() {
	const router = useRouter();
	const create = useMutation({
		mutationKey: ["createConversation"],
		mutationFn: createConversationApi,
		onSuccess: (data) => {
			router.push(`/c/${data.uuid}`);
		},
		onError: (err) => {
			toast(`${err}`);
		},
	});

	return {
		create,
	};
}
