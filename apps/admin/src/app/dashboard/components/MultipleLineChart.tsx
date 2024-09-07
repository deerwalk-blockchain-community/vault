"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { day: "Sun", approved: 186, rejected: 80 },
  { day: "Mon", approved: 305, rejected: 200 },
  { day: "Tue", approved: 237, rejected: 120 },
];

const chartConfig = {
  approved: {
    label: "Rejected",
    color: "hsl(var(--chart-1))",
  },
  rejected: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card className="bg-[#1A1B1D] border-none text-white">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Overview</CardTitle>
        <p className="hidden lg:block font-thin text-xs ">
          Data updates every day{" "}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ChartContainer
          className=" w-32  md:w-72 md:max-w-72 lg:max-h-48"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="approved"
              type="monotone"
              stroke="var(--color-approved)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="rejected"
              type="monotone"
              stroke="var(--color-rejected)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
