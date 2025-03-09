import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const StatisticsTable = ({ statistics, showTotal }) => {
  const totalRow = {
    institution: { name: 'Total' },
    totalTrainees: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalTrainees, 0),
    totalAmount: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalAmount, 0),
    totalPaid: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalPaid, 0),
    totalUnpaid: statistics.reduce((sum, stat) => sum + stat.yearlyTotal.totalUnpaid, 0),
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Institution Name</TableHead>
          <TableHead className="text-right">Total Trainees</TableHead>
          <TableHead className="text-right">Total Amount (DZD)</TableHead>
          <TableHead className="text-right">Paid Amount (DZD)</TableHead>
          <TableHead className="text-right">Unpaid Amount (DZD)</TableHead>
          <TableHead className="text-right">Payment Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statistics.map((stat) => (
          <TableRow key={stat.institution._id}>
            <TableCell className="font-medium">{stat.institution.name}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalTrainees}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalAmount.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalPaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">{stat.yearlyTotal.totalUnpaid.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {stat.totalAmount > 0 ? `${((stat.yearlyTotal.totalPaid / stat.yearlyTotal.totalAmount) * 100).toFixed(0)}%` : "N/A"}
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