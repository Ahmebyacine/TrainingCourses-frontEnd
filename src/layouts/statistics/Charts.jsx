import React from "react";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  CartesianGrid,
  Legend,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function RevenueBarChart({ data }) {
  return (
    <ChartContainer
      config={{
        totalPaid: {
          label: "المبلغ المدفوع",
          color: "var(--chart-1)",
        },
        totalUnpaid: {
          label: "المبلغ غير المدفوع",
          color: "var(--chart-2)",
        },
      }}
      className="h-full w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          type="category"
          width={100}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dashed"
              formatter={(value) =>
                `د.ج ${Number(value).toLocaleString("ar-DZ")}`
              }
            />
          }
        />
        <Legend />
        <Bar dataKey="totalPaid" fill="var(--color-totalPaid)" radius={4} />
        <Bar dataKey="totalUnpaid" fill="var(--color-totalUnpaid)" radius={4} />
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
        <ChartTooltip
          cursor={false}
        />
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
