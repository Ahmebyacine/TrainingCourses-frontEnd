import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const StatisticsTableMonthly = ({ statistics, showTotal }) => {
  const totalRow = {
    employee: { name: 'Total' },
    totalTrainees: statistics.reduce((sum, stat) => sum + stat.totalTrainees, 0),
    totalAmount: statistics.reduce((sum, stat) => sum + stat.totalAmount, 0),
    totalPaid: statistics.reduce((sum, stat) => sum + stat.totalPaid, 0),
    totalUnpaid: statistics.reduce((sum, stat) => sum + stat.totalUnpaid, 0),
  };
console.log(statistics)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Name</TableHead>
          <TableHead className="text-right">Total Trainees</TableHead>
          <TableHead className="text-right">Total Amount (DZD)</TableHead>
          <TableHead className="text-right">Paid Amount (DZD)</TableHead>
          <TableHead className="text-right">Unpaid Amount (DZD)</TableHead>
          <TableHead className="text-right">Payment Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statistics.map((stat) => (
          <TableRow key={stat.empolyee._id}>
            <TableCell className="font-medium">{stat.empolyee.name}</TableCell>
            <TableCell className="text-right">{stat.totalTrainees}</TableCell>
            <TableCell className="text-right">{stat.totalAmount.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.totalPaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.totalUnpaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {stat.totalAmount > 0 ? `${((stat.totalPaid / stat.totalAmount) * 100).toFixed(0)}%` : "N/A"}
            </TableCell>
          </TableRow>
        ))}
        {showTotal && (
          <TableRow className="font-bold">
            <TableCell>Total</TableCell>
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