import React from 'react';
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';

export const PaymentStatusPieChart = ({ data, colors }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `DZD${value.toLocaleString()}`} />
    </PieChart>
  </ResponsiveContainer>
);

export const RevenueBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalPaid" name="Paid Amount" fill="#4CAF50" />
      <Bar dataKey="totalUnpaid" name="Unpaid Amount" fill="#FF5722" />
    </BarChart>
  </ResponsiveContainer>
);

export const MonthlyTrendChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="totalTrainees" name="Total Trainees" fill="#8884d8" />
      <Bar yAxisId="right" dataKey="totalAmount" name="Total Amount (DZD thousands)" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);