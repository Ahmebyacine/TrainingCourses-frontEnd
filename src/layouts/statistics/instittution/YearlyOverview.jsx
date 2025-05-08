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
    name: stat.institution.name,
    totalAmount: stat.yearlyTotal.totalAmount,
    totalPaid: stat.yearlyTotal.totalPaid,
    totalUnpaid: stat.yearlyTotal.totalUnpaid,
  }));

  const paymentStatusData = [
    { name: "المدفوع", value: yearlyData?.statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalPaid, 0) },
    { name: "غير المدفوع", value: yearlyData?.statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalUnpaid, 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-right">نظرة عامة على الإيرادات لسنة {selectedYear}</CardTitle>
            <CardDescription className="text-right">الإيرادات الكاملة وحالة المدفوعات</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <RevenueBarChart data={yearlyChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-right">حالة المدفوعات لسنة {selectedYear}</CardTitle>
            <CardDescription className="text-right">المبالغ المدفوعة وغير المدفوعة</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <PaymentStatusPieChart data={paymentStatusData} colors={COLORS} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">إحصائيات المؤسسات لسنة {selectedYear}</CardTitle>
          <CardDescription className="text-right">تفصيل حسب المؤسسة</CardDescription>
        </CardHeader>
        <CardContent>
          <StatisticsTable statistics={yearlyData.statistics} showTotal={true} />
        </CardContent>
      </Card>
    </div>
  );
};