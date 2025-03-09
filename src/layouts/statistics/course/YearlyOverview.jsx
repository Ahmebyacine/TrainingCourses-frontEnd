import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueBarChart, PaymentStatusPieChart } from './Charts';
import { StatisticsTable } from './StatisticsTable';
import { COLORS } from '@/assets/Data';

export const YearlyOverview = ({ selectedYear,yearlyData,loading }) => {

  if (loading) return <div className="text-center py-4">Loading yearly data...</div>;

  // Handle error or empty data state
  if (!yearlyData || !yearlyData.statistics) {
    return <div className="text-center py-4 text-destructive">No data available for {selectedYear}</div>;
  }
  
  const yearlyChartData = yearlyData?.statistics.map((stat) => ({
    name: stat.course.name,
    totalAmount: stat.yearlyTotal.totalAmount,
    totalPaid: stat.yearlyTotal.totalPaid,
    totalUnpaid: stat.yearlyTotal.totalUnpaid,
  }));

  const paymentStatusData = [
    { name: "Paid", value: yearlyData?.statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalPaid, 0) },
    { name: "Unpaid", value: yearlyData?.statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalUnpaid, 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview {selectedYear}</CardTitle>
            <CardDescription>Total revenue and payment status</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <RevenueBarChart data={yearlyChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status {selectedYear}</CardTitle>
            <CardDescription>Paid vs Unpaid amounts</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <PaymentStatusPieChart data={paymentStatusData} colors={COLORS} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Statistics {selectedYear}</CardTitle>
          <CardDescription>Detailed breakdown by course</CardDescription>
        </CardHeader>
        <CardContent>
          <StatisticsTable statistics={yearlyData.statistics} showTotal={true} />
        </CardContent>
      </Card>
    </div>
  );
};