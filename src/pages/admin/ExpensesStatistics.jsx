import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import api from "@/services/api";

const getInstitutionColor = (index) => {
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4, 280 80% 50%)",
    "var(--chart-5, 340 80% 50%)",
  ];
  return colors[index % colors.length];
};

const arabicMonths = {
  1: "جانفي",
  2: "فيفري",
  3: "مارس",
  4: "أفريل",
  5: "ماي",
  6: "جوان",
  7: "جويلية",
  8: "أوت",
  9: "سبتمبر",
  10: "أكتوبر",
  11: "نوفمبر",
  12: "ديسمبر",
};

export default function ExpensesStatistics() {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get("/api/expense");
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const uniqueInstitutions = Array.from(
    new Set(expenses.map((expense) => expense.institution._id))
  ).map((id, index) => {
    const institution = expenses.find(
      (expense) => expense.institution._id === id
    )?.institution;
    return {
      id,
      name: institution?.name || "غير معروف",
      color: getInstitutionColor(index),
    };
  });

  const expensesByInstitution = expenses.reduce((acc, expense) => {
    const institutionId = expense.institution._id;
    if (!acc[institutionId]) {
      acc[institutionId] = [];
    }
    acc[institutionId].push(expense);
    return acc;
  }, {});

  const filteredExpenses =
    selectedMonth === "all"
      ? expenses
      : expenses.filter((expense) => {
          const date = new Date(expense.createdAt);
          return date.getMonth() === Number.parseInt(selectedMonth) - 1;
        });

  const filteredExpensesByInstitution = filteredExpenses.reduce(
    (acc, expense) => {
      const institutionId = expense.institution._id;
      if (!acc[institutionId]) {
        acc[institutionId] = [];
      }
      acc[institutionId].push(expense);
      return acc;
    },
    {}
  );

  const yearlyStatisticsData = Object.entries(expensesByInstitution).map(
    ([institutionId, expenses]) => {
      const totalAmount = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      const institutionInfo = uniqueInstitutions.find(
        (inst) => inst.id === institutionId
      );
      return {
        institution: institutionInfo?.name || "غير معروف",
        amount: totalAmount,
        institutionId,
      };
    }
  );

  const chartConfig = uniqueInstitutions.reduce((acc, institution) => {
    acc[institution.id] = {
      label: institution.name,
      color: institution.color,
    };
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-6 rtl">
      <h1 className="text-3xl font-bold mb-6">لوحة المصروفات</h1>
      {loading && <p className="text-center">جاري تحميل البيانات...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <Tabs defaultValue="statistics" className="w-full" dir="rtl">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="statistics">الإحصائيات السنوية</TabsTrigger>
          <TabsTrigger value="expenses">المصروفات حسب المؤسسة</TabsTrigger>
        </TabsList>

        <TabsContent value="statistics">
          <div className="space-y-6 md:flex md:justify-center">
            <div className="grid grid-cols-1 md:max-w-2/3 md:min-w-2/3 gap-6 mb-6">
              <Card dir="ltr">
                <CardHeader>
                  <CardTitle>الإحصائيات السنوية حسب المؤسسة</CardTitle>
                  <CardDescription>
                    إجمالي المصروفات لكل مؤسسة في السنة الحالية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={yearlyStatisticsData}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                      accessibilityLayer
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="institution"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          `${value.toLocaleString("ar-DZ")} د.ج`
                        }
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) =>
                              `${Number(value).toLocaleString("ar-DZ")} د.ج`
                            }
                          />
                        }
                      />
                      <Bar
                        dataKey="amount"
                        fill="var(--color-primary)"                        
                        radius={[4, 4, 0, 0]}
                        name="المبلغ"
                        width={10}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="mb-6 flex justify-start">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="تصفية حسب الشهر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الشهور</SelectItem>
                {Object.entries(arabicMonths).map(([value, month]) => (
                  <SelectItem key={value} value={value}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {Object.entries(filteredExpensesByInstitution).length > 0 ? (
            Object.entries(filteredExpensesByInstitution).map(
              ([institutionId, expenses]) => (
                <Card key={institutionId} className="mb-6">
                  <CardHeader>
                    <CardTitle>
                      {uniqueInstitutions.find(
                        (inst) => inst.id === institutionId
                      )?.name || "مؤسسة غير معروفة"}
                    </CardTitle>
                    <CardDescription>
                      الإجمالي: {" "}
                      {expenses
                        .reduce((sum, expense) => sum + expense.amount, 0)
                        .toLocaleString("ar-DZ")} {" "}
                      د.ج
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expenses.map((expense) => (
                        <div
                          key={expense._id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {expense.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                الموظف: {expense.employee.name || "غير معروف"}
                              </p>
                            </div>
                            <Badge variant="outline" className="mr-2">
                              {expense.amount.toLocaleString("ar-DZ")} د.ج
                            </Badge>
                          </div>
                          {expense.note && (
                            <p className="text-sm mt-2">{expense.note}</p>
                          )}
                          <div className="flex items-center mt-3 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3 ml-1" />
                            {format(new Date(expense.createdAt), "PPP", {
                              locale: ar,
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            )
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                لا توجد مصروفات للشهر المحدد.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}