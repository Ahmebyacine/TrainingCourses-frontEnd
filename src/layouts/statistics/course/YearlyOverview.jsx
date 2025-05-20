import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueBarChart, PaymentStatusPieChart } from '../Charts';
import { StatisticsTable } from './StatisticsTable';
import { COLORS } from '@/assets/Data';

export const YearlyOverview = ({ selectedYear, yearlyData, loading }) => {

  if (loading) return <div className="text-center py-4">جاري تحميل البيانات السنوية...</div>;

  // Handle error or empty data state
  if (!yearlyData || !yearlyData.statistics) {
    return <div className="text-center py-4 text-destructive">لا توجد بيانات متاحة لسنة {selectedYear}</div>;
  }
  
  const yearlyChartData = yearlyData?.statistics.map((stat) => ({
    name: stat.course.name,
    totalAmount: stat.yearlyTotal.totalAmount,
    totalPaid: stat.yearlyTotal.totalPaid,
    totalUnpaid: stat.yearlyTotal.totalUnpaid,
  }));


  return (
    <div className="space-y-6">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-right">نظرة عامة على الإيرادات لسنة {selectedYear}</CardTitle>
            <CardDescription className="text-right">الإيرادات الكاملة وحالة المدفوعات</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <RevenueBarChart data={yearlyChartData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">إحصائيات الدورات لسنة {selectedYear}</CardTitle>
          <CardDescription className="text-right">تفصيل حسب كل دورة</CardDescription>
        </CardHeader>
        <CardContent>
          <StatisticsTable statistics={yearlyData.statistics} showTotal={true} />
        </CardContent>
      </Card>
    </div>
  );
};