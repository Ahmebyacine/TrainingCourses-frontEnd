import React from "react";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  CartesianGrid,
  Cell,
  AreaChart,
  Area,
  YAxis,
  LabelList,
  Legend,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function RevenueBarChart({ data }) {
  console.log("data", data);
  return (
    <ChartContainer
      config={{
        totalPaid: {
          label: "المبلغ المدفوع",
          color: "var(--chart-2)",
        },
        totalUnpaid: {
          label: "المبلغ غير المدفوع",
          color: "var(--chart-1)",
        },
      }}
      className="h-full w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 10,
        }}
        barGap={0}
        height={600}
      >
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
          width={90}
          tick={{ fontSize: 11, padding: 8 }}
        />
        <XAxis type="number" />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(value) =>
                `د.ج ${Number(value).toLocaleString("ar-DZ")}`
              }
            />
          }
        />
        <Bar dataKey="totalPaid" fill="var(--color-totalPaid)" radius={4}>
          <LabelList
            dataKey="totalPaid"
            position="right"
            className="fill-foreground"
            fontSize={10}
            formatter={(value) => `د.ج ${value.toLocaleString("ar-DZ")}`}
          />
        </Bar>
        <Bar dataKey="totalUnpaid" fill="var(--color-totalUnpaid)" radius={4}>
          <LabelList
            dataKey="totalUnpaid"
            position="right"
            className="fill-foreground"
            fontSize={10}
            formatter={(value) => `د.ج ${value.toLocaleString("ar-DZ")}`}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function PaymentStatusPieChart({ data, colors }) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "القيمة",
        },
      }}
      className="aspect-square h-full w-full"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `%${name}: ${(percent * 100).toFixed(0)}`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) =>
                `د.ج ${Number(value).toLocaleString("ar-DZ")}`
              }
            />
          }
        />
      </PieChart>
    </ChartContainer>
  );
}

export function MonthlyTrendChart({ data }) {
  return (
    <ChartContainer
      config={{
        totalTrainees: {
          label: "إجمالي المتدربين",
          color: "var(--chart-3)",
        },
        totalAmount: {
          label: "إجمالي المبلغ (آلاف د.ج)",
          color: "var(--chart-1)",
        },
      }}
      className="h-full w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillTrainees" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalTrainees)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalTrainees)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalAmount)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalAmount)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
        />
        <ChartTooltip cursor={false} />
        <Area
          dataKey="totalTrainees"
          type="natural"
          fill="url(#fillTrainees)"
          stroke="var(--color-totalTrainees)"
          stackId="a"
        />
        <Area
          dataKey="totalAmount"
          type="natural"
          fill="url(#fillAmount)"
          stroke="var(--color-totalAmount)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
