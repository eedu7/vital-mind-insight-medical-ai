"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCloud, IconCloudRain, IconDroplet, IconTemperature, IconWind } from "@tabler/icons-react";
import { Handle, Position } from "@xyflow/react";

export const ResponseCard = () => {
	return (
		<Card className="response-card-node">
			<CardHeader className="nodrag select-text hover:cursor-text">
				<CardTitle>What&nbsp;s the weather like in London today?</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<p className="nodrag flex gap-1 select-text hover:cursor-text">
						The current weather in London is mostly cloudy with occasional light rain. <IconCloudRain />
					</p>
					<ul className="pl-4">
						<li>
							<p className="nodrag flex w-fit gap-1 select-text hover:cursor-text">
								<strong className="flex items-center">
									<IconTemperature className="size-4" /> Temperature:{" "}
								</strong>{" "}
								Around 17°C (63°F)
							</p>
						</li>
						<li>
							<p className="nodrag flex w-fit select-text hover:cursor-text">
								<strong className="flex items-center gap-1">
									<IconDroplet className="size-4" /> Humidity:{" "}
								</strong>
								72%
							</p>
						</li>
						<li>
							<p className="nodrag flex w-fit select-text hover:cursor-text">
								<strong className="flex items-center gap-1">
									<IconWind className="size-4" /> Wind:{" "}
								</strong>{" "}
								Gentle breeze from the southwest at 11 km/h
							</p>
						</li>
						<li>
							<p className="nodrag flex w-fit select-text hover:cursor-text">
								<strong className="flex items-center gap-1">
									<IconCloud className="size-4" /> Forecast:{" "}
								</strong>{" "}
								Expect more cloud cover through the evening, with chances of light showers.
							</p>
						</li>
					</ul>
				</div>
			</CardContent>
			<Handle type="target" position={Position.Top} />
			<Handle type="source" position={Position.Bottom} />
		</Card>
	);
};
