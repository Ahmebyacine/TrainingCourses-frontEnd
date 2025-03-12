import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { YearlyOverview } from '@/layouts/statistics/instittution/YearlyOverview';
import { MonthlyBreakdown } from '@/layouts/statistics/instittution/MonthlyBreakdown';
import { availableYears } from '@/assets/Data';
import api from '@/services/api';
import ErrorPage from '../common/ErrorPage';

export const InstitutionStatistics = () => {
  const [selectedYear, setSelectedYear] = useState(() => {
    const now = new Date();
    return now.getFullYear();
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/institution/statistics?year=${selectedYear}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  if (error) return <ErrorPage error={error} />
  
  return (
    <div className="container mx-auto py-6 px-5 md:px-10" dir="rtl">
      <h1 className="md:text-3xl text-xl font-bold mb-6 text-right">لوحة إحصائيات المؤسسات</h1>

      <div className="flex items-center justify-between mb-6 flex-row-reverse">
        <div className="flex items-center gap-4">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[180px] text-right">
              <SelectValue placeholder="اختر السنة" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()} className="text-right">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="yearly" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 mx-auto">
          <TabsTrigger value="yearly">نظرة سنوية</TabsTrigger>
          <TabsTrigger value="monthly">تفصيل شهري</TabsTrigger>
        </TabsList>

        <TabsContent value="yearly">
          <YearlyOverview selectedYear={selectedYear} yearlyData={data} loading={loading} />
        </TabsContent>

        <TabsContent value="monthly">
          <MonthlyBreakdown selectedYear={selectedYear} monthlyData={data} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
 )
};