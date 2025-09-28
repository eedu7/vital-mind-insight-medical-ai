"use client";

import { nodeTypes } from "@/app/flow/node-types";
import {
	Background,
	BackgroundVariant,
	Controls,
	Panel,
	ReactFlow,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";

import { Button } from "@/components/ui/button";
import Dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";

export const initialNodes = [
	{
		id: "1",
		type: "ResponseCard",
		data: { label: "input" },
		position: { x: 0, y: 0 },
	},
	{
		id: "2",
		type: "ResponseCard",
		data: { label: "node 2" },
		position: { x: -400, y: 300 },
	},
	{
		id: "2a",
		type: "ResponseCard",

		data: { label: "node 2a" },
		position: { x: -800, y: 600 },
	},
	{
		id: "2b",
		type: "ResponseCard",

		data: { label: "node 2b" },
		position: { x: 0, y: 600 },
	},
	{
		id: "2c",
		type: "ResponseCard",

		data: { label: "node 2c" },
		position: { x: 800, y: 600 },
	},
	{
		id: "2d",
		type: "ResponseCard",

		data: { label: "node 2d" },
		position: { x: 800, y: 900 },
	},
	{
		id: "3",
		type: "ResponseCard",

		data: { label: "node 3" },
		position: { x: 400, y: 300 },
	},
];

export const initialEdges = [
	{ id: "e12", source: "1", target: "2", animated: true },
	{ id: "e13", source: "1", target: "3", animated: true },
	{ id: "e22a", source: "2", target: "2a", animated: true },
	{ id: "e22b", source: "2", target: "2b", animated: true },
	{ id: "e22c", source: "2", target: "2c", animated: true },
	{ id: "e2c2d", source: "2c", target: "2d", animated: true },
];

const getLayoutedElements = (nodes, edges, options) => {
	const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
	g.setGraph({ rankdir: options.direction });

	edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	nodes.forEach((node) =>
		g.setNode(node.id, {
			...node,
			width: node.measured?.width ?? 0,
			height: node.measured?.height ?? 0,
		})
	);

	Dagre.layout(g);

	return {
		nodes: nodes.map((node) => {
			const position = g.node(node.id);
			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			const x = position.x - (node.measured?.width ?? 0) / 2;
			const y = position.y - (node.measured?.height ?? 0) / 2;

			return { ...node, position: { x, y } };
		}),
		edges,
	};
};

export function Flow() {
	const { fitView } = useReactFlow();

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onLayout = useCallback(
		(direction: "TB" | "LR") => {
			console.log(nodes);
			const layouted = getLayoutedElements(nodes, edges, { direction });

			setNodes([...layouted.nodes]);
			setEdges([...layouted.edges]);
			fitView();
		},
		[nodes, edges]
	);

	return (
		<div className="h-screen w-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				fitView
			>
				<Panel position="top-right">
					<div className="space-x-2">
						<Button className="cursor-pointer" onClick={() => onLayout("TB")}>
							Vertical Layout
						</Button>
						<Button className="cursor-pointer" onClick={() => onLayout("LR")}>
							Horizontal Layout
						</Button>
					</div>
				</Panel>
				<Controls />
				<Background variant={BackgroundVariant.Cross} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}

export default function Page() {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}
