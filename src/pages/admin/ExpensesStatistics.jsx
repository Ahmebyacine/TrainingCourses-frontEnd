import { useState, useEffect, useMemo } from "react";
import { Coins } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import api from "@/services/api";
import ErrorPage from "../common/ErrorPage";
import ProgramExpensesCard from "@/layouts/admin/ProgramExpensesCard";

export default function ExpensesStatistics() {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("inprogress");

  const fetchPrograms = async () => {
    try {
      const programsResponse = await api.get("/api/program");
      setPrograms(programsResponse.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const { inProgress, upcoming, completed } = useMemo(() => {
    const now = new Date();
    return {
      inProgress: programs.filter(
        (p) => new Date(p.start_date) <= now && new Date(p.end_date) >= now
      ),
      upcoming: programs.filter((p) => new Date(p.start_date) > now),
      completed: programs.filter((p) => new Date(p.end_date) < now),
    };
  }, [programs]);

  if (error) return <ErrorPage error={error} />;

  const renderContent = (items, emptyMessage) => {
    if (items.length === 0) {
      return (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Coins className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">{emptyMessage}</h3>
          <p className="text-muted-foreground">لا توجد مصاريف في هذا القسم</p>
        </div>
      );
    }

    return (
      <div className="w-full space-y-6">
        {items.map((program) => (
          <ProgramExpensesCard key={program._id} program={program} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex justify-end items-center mb-6 flex-row-reverse">
        <h1 className="md:text-3xl text-xl font-bold text-right">
          إحصائيات المصاريف حسب البرامج
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المصاريف...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Coins className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد مصاريف مسجلة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة مصاريف جديدة</p>
        </div>
      ) : (
        <Tabs value={selectedTab} onValueChange={setSelectedTab} dir="rtl">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">البرامج القادمة</TabsTrigger>
            <TabsTrigger value="inprogress">البرامج الجارية</TabsTrigger>
            <TabsTrigger value="completed">البرامج المكتملة</TabsTrigger>
          </TabsList>

          <TabsContent value="inprogress">
            {renderContent(inProgress, "لا توجد برامج جارية")}
          </TabsContent>

          <TabsContent value="upcoming">
            {renderContent(upcoming, "لا توجد برامج قادمة")}
          </TabsContent>

          <TabsContent value="completed">
            {renderContent(completed, "لا توجد برامج مكتملة")}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
