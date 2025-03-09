import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from './ui/skeleton';
import api from '@/services/api';

const StatisticsCard = ({ title, apiEndpoint }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(apiEndpoint);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Payment statistics and trends</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalPaid" fill="#4CAF50" name="Paid Amount" />
                  <Bar dataKey="totalUnpaid" fill="#FF5722" name="Unpaid Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{title.slice(0, -1)} Name</TableHead>
                  <TableHead className="text-right">Trainees</TableHead>
                  <TableHead className="text-right">Total (₹)</TableHead>
                  <TableHead className="text-right">Paid (₹)</TableHead>
                  <TableHead className="text-right">Unpaid (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.statistics.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.trainees}</TableCell>
                    <TableCell className="text-right">{item.total.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.paid.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.unpaid.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;