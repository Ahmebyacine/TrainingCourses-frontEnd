import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const StatisticsTable = ({ statistics, showTotal }) => {
  const totalRow = {
    institution: { name: 'المجموع' },
    totalTrainees: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalTrainees, 0),
    totalAmount: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalAmount, 0),
    totalPaid: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalPaid, 0),
    totalUnpaid: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalUnpaid, 0),
  };

  return (
    <Table dir="rtl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">اسم المؤسسة</TableHead>
          <TableHead className="text-right">عدد المتدربين</TableHead>
          <TableHead className="text-right">المبلغ الإجمالي (د.ج)</TableHead>
          <TableHead className="text-right">المبلغ المدفوع (د.ج)</TableHead>
          <TableHead className="text-right">المبلغ المتبقي (د.ج)</TableHead>
          <TableHead className="text-right">نسبة الدفع</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statistics.map((stat) => (
          <TableRow key={stat.institution._id}>
            <TableCell className="font-medium text-right">{stat.institution.name}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalTrainees}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalAmount.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalPaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalUnpaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {stat.yearlyTotal.totalAmount > 0 ? 
                `${((stat.yearlyTotal.totalPaid / stat.yearlyTotal.totalAmount) * 100).toFixed(0)}%` : 
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