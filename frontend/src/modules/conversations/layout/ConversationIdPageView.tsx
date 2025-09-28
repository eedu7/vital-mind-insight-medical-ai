"use client";

import { flowNodeTypes } from "@/modules/conversations/type/flow-node-types";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export const ConversationIdPageView = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			nodeTypes={flowNodeTypes}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			fitView
		>
			<Controls />
			<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
		</ReactFlow>
	);
};
