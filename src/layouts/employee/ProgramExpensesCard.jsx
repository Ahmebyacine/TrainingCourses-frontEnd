import { useState } from "react";
import { Calendar, Wallet, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services/api";
import { toast } from "sonner";
import { calculateDuration, formatDate } from "@/utils/formatSafeDate";
import AddExpenseModal from "./AddExpenseModal";

export default function ProgramExpensesCard({ program }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  // Program status logic
  const getProgramStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start)
      return { label: "قادم", color: "bg-blue-100 text-blue-800" };
    if (now > end)
      return { label: "اكتمل", color: "bg-green-100 text-green-800" };
    return { label: "قيد التنفيذ", color: "bg-yellow-100 text-yellow-800" };
  };

  const handleToggle = async () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    if (!newState) return;

    try {
      setIsLoading(true);
      const response = await api.get(`/api/expense/program/${program._id}`);
      setExpenses(response.data);
    } catch {
      toast.error("حدث خطأ أثناء جلب المصاريف");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExpense = async (data) => {
    try {
      const response = await api.post("/api/expense", {
        ...data,
      });
      setAddDialogOpen(false);
      setExpenses([...expenses, response.data]);
      toast.success("تمت إضافة المصاريف", {
        description: `تمت إضافة المصاريف "${response.data.title}"`,
      });
    } catch {
      toast.error("لم تتم إضافة المصاريف");
      setAddDialogOpen(false);
    }
  };
  const status = getProgramStatus(program.start_date, program.end_date);

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={handleToggle}
      className="border rounded-lg overflow-hidden"
    >
      <Card className="border-0 rounded-none">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle>
                  {program.course?.name || "دورة غير معروفة"}
                </CardTitle>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
              <CardDescription className="mt-1">
                في {program.institution?.name || "مؤسسة غير معروفة"}
              </CardDescription>
              <CardDescription className="mt-1">
                {program.trainer?.name || "مدرب غير معروف"}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 w-full sm:w-auto"
                >
                  <Wallet className="h-4 w-4" />
                  المصاريف
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CardAction>
              <AddExpenseModal
                open={addDialogOpen}
                programs={[program]}
                onOpenChange={setAddDialogOpen}
                onAddExpense={handleAddExpense}
              />
            </CardAction>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">المدة</div>
                  <div>
                    {calculateDuration(program.start_date, program.end_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">التواريخ</div>
                  <div>
                    {formatDate(program.start_date)} -{" "}
                    {formatDate(program.end_date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Content for Expenses */}
      <CollapsibleContent>
        <Separator />
        <div className="p-4">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <Wallet className="h-5 w-5 mr-2" />
            المصاريف المرتبطة بالبرنامج
          </h3>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>جاري تحميل المصاريف...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground my-4">
                لا توجد مصاريف لهذا البرنامج
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الموظف</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead>التاريخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense._id}>
                      <TableCell className="font-medium">
                        {expense.title}
                      </TableCell>
                      <TableCell>
                        {expense.employee?.name || "غير محدد"}
                      </TableCell>
                      <TableCell>{expense.amount} دج</TableCell>
                      <TableCell>{expense.note || "-"}</TableCell>
                      <TableCell>{formatDate(expense.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
