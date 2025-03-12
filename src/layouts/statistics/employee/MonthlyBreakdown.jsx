import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthlyTrendChart } from '../Charts';
import { StatisticsTableMonthly } from './StatisticsTableMonthly';
import { MONTHS_ORDER } from '@/assets/Data';

export const MonthlyBreakdown = ({ selectedYear, monthlyData, loading }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleString('en-US', { month: 'long' });
  });

  if (loading) return <div className="text-center py-4">جاري تحميل البيانات الشهرية...</div>;
  if (!monthlyData?.statistics) return <div className="text-center py-4 text-destructive">لا توجد بيانات متاحة لسنة {selectedYear}</div>;

  // Process monthly trend data
  const processMonthlyTrend = (statistics) => {
    const aggregation = statistics.reduce((acc, employee) => {
      employee.performance.monthlyData.forEach(monthData => {
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
      .sort((a, b) => MONTHS_ORDER.findIndex(m => m.value === a.name) - MONTHS_ORDER.findIndex(m => m.value === b.name))
      .map(month => ({
        ...month,
        totalAmount: month.totalAmount / 1000
      }));
  };

  // Get current month stats
  const getCurrentMonthStats = (statistics, targetMonth) => {
    return statistics.map(employee => {
      const monthlyEntry = employee.performance.monthlyData.find(m => m.month === targetMonth);
      return {
        employee: employee.employee,
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
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-4 mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر الشهر" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS_ORDER.map(month => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">التوجهات الشهرية لسنة {selectedYear}</CardTitle>
          <CardDescription className="text-right">المتدربون والإيرادات حسب الشهر</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <MonthlyTrendChart data={monthlyTrendData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">إحصائيات الموظفين لشهر {selectedMonth} سنة {selectedYear}</CardTitle>
          <CardDescription className="text-right">تفصيل حسب الموظف</CardDescription>
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