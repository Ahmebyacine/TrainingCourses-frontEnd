import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthlyTrendChart } from './Charts';
import { StatisticsTableMonthly } from './StatisticsTableMonthly';

// Month order for sorting
const MONTHS_ORDER = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

export const MonthlyBreakdown = ({ selectedYear, monthlyData, loading }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleString('en-US', { month: 'long' });
  });

  if (loading) return <div className="text-center py-4">Loading monthly data...</div>;
  if (!monthlyData?.statistics) return <div className="text-center py-4 text-destructive">No data available for {selectedYear}</div>;

  // Process monthly trend data
  const processMonthlyTrend = (statistics) => {
    const aggregation = statistics.reduce((acc, empolyee) => {
      empolyee.performance.monthlyData.forEach(monthData => {
        const month = monthData.month;
        if (!acc[month]) {
          acc[month] = {
            name: month,
            totalTrainees: 0,
            totalAmount: 0,
            totalPaid: 0,
            totalUnpaid: 0
          };
        }
        acc[month].totalTrainees += monthData.totalTrainees;
        acc[month].totalAmount += monthData.totalAmount;
        acc[month].totalPaid += monthData.totalPaid;
        acc[month].totalUnpaid += monthData.totalUnpaid;
      });
      return acc;
    }, {});

    return Object.values(aggregation)
      .sort((a, b) => MONTHS_ORDER.indexOf(a.name) - MONTHS_ORDER.indexOf(b.name))
      .map(month => ({
        ...month,
        totalAmount: month.totalAmount / 1000
      }));
  };

  // Get current month stats
  const getCurrentMonthStats = (statistics, targetMonth) => {
    return statistics.map(empolyee => {
      const monthlyEntry = empolyee.performance.monthlyData.find(m => m.month === targetMonth);
      return {
        empolyee: empolyee.employee,
        totalTrainees: monthlyEntry?.totalTrainees || 0,
        totalAmount: monthlyEntry?.totalAmount || 0,
        totalPaid: monthlyEntry?.totalPaid || 0,
        totalUnpaid: monthlyEntry?.totalUnpaid || 0
      };
    });
  };

  const monthlyTrendData = processMonthlyTrend(monthlyData.statistics);
  const currentMonthStats = getCurrentMonthStats(monthlyData.statistics, selectedMonth);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS_ORDER.map(month => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends {selectedYear}</CardTitle>
          <CardDescription>Trainees and revenue by month</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <MonthlyTrendChart data={monthlyTrendData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Empolyee Statistics for {selectedMonth} {selectedYear}</CardTitle>
          <CardDescription>Detailed breakdown by empolyee</CardDescription>
        </CardHeader>
        <CardContent>
          <StatisticsTableMonthly 
            statistics={currentMonthStats} 
            showTotal={true} 
          />
        </CardContent>
      </Card>
    </div>
  );
};