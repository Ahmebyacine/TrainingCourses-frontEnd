import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { YearlyOverview } from '@/layouts/statistics/course/YearlyOverview';
import { MonthlyBreakdown } from '@/layouts/statistics/course/MonthlyBreakdown';
import { availableYears } from '@/assets/Data';
import api from '@/services/api';

export const CourseStatistics = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/course/statistics/monthly?year${selectedYear}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className="container mx-auto py-6 px-10">
      <h1 className="text-3xl font-bold mb-6">Course Statistics Dashboard</h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="yearly" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="yearly">Yearly Overview</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="yearly">
          <YearlyOverview selectedYear={selectedYear} yearlyData={data} loading={loading} />
        </TabsContent>

        <TabsContent value="monthly">
          <MonthlyBreakdown selectedYear={selectedYear} monthlyData={data} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};