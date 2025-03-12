import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const StatisticsTableMonthly = ({ statistics, showTotal }) => {
  const totalRow = {
    employee: { name: 'المجموع' },
    totalTrainees: statistics.reduce((sum, stat) => sum + stat.totalTrainees, 0),
    totalAmount: statistics.reduce((sum, stat) => sum + stat.totalAmount, 0),
    totalPaid: statistics.reduce((sum, stat) => sum + stat.totalPaid, 0),
    totalUnpaid: statistics.reduce((sum, stat) => sum + stat.totalUnpaid, 0),
  };

  return (
    <Table dir="rtl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">اسم الموظف</TableHead>
          <TableHead className="text-right">عدد المتدربين</TableHead>
          <TableHead className="text-right">المبلغ الإجمالي (د.ج)</TableHead>
          <TableHead className="text-right">المبلغ المدفوع (د.ج)</TableHead>
          <TableHead className="text-right">المبلغ المتبقي (د.ج)</TableHead>
          <TableHead className="text-right">نسبة الدفع</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statistics.map((stat) => (
          <TableRow key={stat.employee._id}>
            <TableCell className="font-medium text-right">{stat.employee.name}</TableCell>
            <TableCell className="text-right">{stat.totalTrainees}</TableCell>
            <TableCell className="text-right">{stat.totalAmount.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.totalPaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.totalUnpaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {stat.totalAmount > 0 ? 
                `${((stat.totalPaid / stat.totalAmount) * 100).toFixed(0)}%` : 
                "N/A"}
            </TableCell>
          </TableRow>
        ))}
        {showTotal && (
          <TableRow className="font-bold">
            <TableCell className="text-right">المجموع</TableCell>
            <TableCell className="text-right">{totalRow.totalTrainees}</TableCell>
            <TableCell className="text-right">{totalRow.totalAmount.toLocaleString()}</TableCell>
            <TableCell className="text-right">{totalRow.totalPaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">{totalRow.totalUnpaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {totalRow.totalAmount > 0
                ? `${((totalRow.totalPaid / totalRow.totalAmount) * 100).toFixed(0)}%`
                : "N/A"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};