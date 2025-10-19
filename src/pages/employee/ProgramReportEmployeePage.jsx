import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Users, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import api from "@/services/api";
import PDFReport from "@/utils/PDF/PDFReport";
import { Button } from "@/components/ui/button";
import ErrorPage from "../common/ErrorPage";
import { toast } from "sonner";
import { getPaymentMethodLabel } from "@/utils/getPaymentMethodLabel";

export default function ProgramReportEmployeePage() {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEmployee, setActiveEmployee] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/program/${id}/report/employees`);
        setReportData(response.data);
        setActiveEmployee(response.data?.employees[0]?.employee.id);
      } catch (error) {
        setError(error.response?.data?.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  // Format date with Arabic locale
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
    } catch {
      return dateString;
    }
  };
  const confirmPayment = async (id) => {
    try {
      const response = await api.patch(
        `/api/trainee/confirm-second-tranche/${id}`
      );
      const updated = response.data;
      const updatedTrainee = {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        inialTranche: updated.inialTranche,
        secondTranche: updated.secondTranche,
        methodePaiement1: updated.methodePaiement1,
        methodePaiement2: updated.methodePaiement2,
        totalPrice: updated.totalPrice,
        paidAmount: (updated.inialTranche || 0) + (updated.secondTranche || 0),
        unpaidAmount:
          updated.rest ??
          updated.totalPrice -
            ((updated.inialTranche || 0) + (updated.secondTranche || 0)),
        note: updated.note || "",
      };

      setReportData((prevData) => {
        if (!prevData) return prevData;

        const newEmployees = prevData.employees.map((emp) => {
          return {
            ...emp,
            trainees: emp.trainees.map((t) =>
              t.id === updatedTrainee.id ? updatedTrainee : t
            ),
          };
        });

        return { ...prevData, employees: newEmployees };
      });
      toast.success("تم تحديث بنجاح");
    } catch (error) {
      toast.error("حدث خطاء اثناء التحديث");
      console.log(error);
    }
  };

  // Calculate payment percentage
  const calculatePaymentPercentage = (paid, total) => {
    return (paid / total) * 100;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10" dir="rtl">
        <div className="text-center">جاري تحميل تقرير البرنامج...</div>
      </div>
    );
  }

  if (error) return <ErrorPage error={error} />;
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 rtl" dir="rtl">
      {/* Program Header */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-2xl md:text-3xl">
            {reportData?.program?.name}
          </CardTitle>
          <CardDescription className="text-lg">
            {reportData?.program?.institution}
          </CardDescription>
          <Dialog>
            <DialogTrigger asChild>
              <Button>تقرير البرنامج</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-right">
                  تقرير برنامج {reportData?.program?.courseName}
                </DialogTitle>
                <DialogDescription className="text-right">
                  تفاصيل البرنامج والمدفوعات
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {reportData ? (
                  <PDFReport data={reportData} />
                ) : (
                  <div className="text-center py-4">لا توجد بيانات متاحة</div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                <p className="font-medium">
                  {formatDate(reportData.program.start_date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">تاريخ النهاية</p>
                <p className="font-medium">
                  {formatDate(reportData.program.end_date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">عدد المتدربين</p>
                <p className="font-medium">
                  {reportData.summary.totalTrainees}
                </p>
              </div>
            </div>
          </div>

          {/* Program Summary */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-medium mb-4">ملخص البرنامج</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                <p className="text-xl font-bold text-green-600">
                  {reportData.summary.totalPaid.toLocaleString()} دج
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">المبلغ المتبقي</p>
                <p className="text-xl font-bold text-red-600">
                  {reportData.summary.totalUnpaid.toLocaleString()} دج
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
                <p className="text-xl font-bold">
                  {reportData.summary.totalPrice.toLocaleString()} دج
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">نسبة التحصيل</span>
                <span className="text-sm font-medium">
                  {Math.round(
                    calculatePaymentPercentage(
                      reportData.summary.totalPaid,
                      reportData.summary.totalPrice
                    )
                  )}
                  %
                </span>
              </div>
              <Progress
                value={calculatePaymentPercentage(
                  reportData.summary.totalPaid,
                  reportData.summary.totalPrice
                )}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees and Trainees */}
      <Tabs
        defaultValue={activeEmployee}
        onValueChange={setActiveEmployee}
        className="mt-6"
      >
        <TabsList className="mb-4 w-full flex overflow-x-auto">
          {reportData.employees.map((emp) => (
            <TabsTrigger
              key={emp.employee.id}
              value={emp.employee.id}
              className="flex-1 min-w-[150px]"
            >
              {emp.employee.name}
              <Badge variant="outline" className="mr-2 bg-primary/10">
                {emp.summary.totalTrainees}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {reportData.employees.map((emp) => (
          <TabsContent key={emp.employee.id} value={emp.employee.id}>
            <Card>
              <CardHeader>
                <div
                  className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                  dir="rtl"
                >
                  <div>
                    <CardTitle>{emp.employee.name}</CardTitle>
                    <CardDescription>{emp.employee.email}</CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">المتدربين</p>
                      <p className="text-xl font-bold">
                        {emp.summary.totalTrainees}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        المبلغ المحصل
                      </p>
                      <p className="text-xl font-bold text-green-600">
                        {emp.summary.totalPaid.toLocaleString()} دج
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ملاحظات</TableHead>
                        <TableHead>الإجراءات</TableHead>
                        <TableHead>المبلغ الإجمالي</TableHead>
                        <TableHead>المبلغ المتبقي</TableHead>
                        <TableHead>القسط الثاني</TableHead>
                        <TableHead>القسط الاول</TableHead>
                        <TableHead>الهاتف</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead className="w-[50px]">#</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emp.trainees.map((trainee, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {trainee.note ? (
                              <div className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{trainee.note}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                -
                              </span>
                            )}
                          </TableCell>

                          <TableCell>
                            <Button
                              onClick={() => confirmPayment(trainee.id)}
                              disabled={!trainee.unpaidAmount}
                              className="bg-green-700"
                              size="sm"
                            >
                              تاكيد الدفعة الثانية
                            </Button>
                          </TableCell>
                          <TableCell>
                            {trainee.totalPrice.toLocaleString()} دج
                          </TableCell>
                          <TableCell className="text-red-600">
                            {trainee.unpaidAmount.toLocaleString()} دج
                          </TableCell>
                          <TableCell className="text-green-600">
                            {trainee.secondTranche.toLocaleString()} دج
                           <br/> <span className="text-xs">{getPaymentMethodLabel(trainee.methodePaiement2)}</span>
                          </TableCell>
                          <TableCell className="text-green-600">
                            {trainee.inialTranche.toLocaleString()} دج
                           <br/> <span className="text-xs">{getPaymentMethodLabel(trainee.methodePaiement1)}</span>
                          </TableCell>
                          <TableCell dir="ltr">{trainee.phone}</TableCell>
                          <TableCell>{trainee.email}</TableCell>
                          <TableCell className="font-medium">
                            {trainee.name}
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Employee Summary */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg" dir="rtl">
                  <h3 className="text-lg font-medium mb-4">ملخص المشرف</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">
                        المبلغ المدفوع
                      </p>
                      <p className="text-xl font-bold text-green-600">
                        {emp.summary.totalPaid.toLocaleString()} دج
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">
                        المبلغ المتبقي
                      </p>
                      <p className="text-xl font-bold text-red-600">
                        {emp.summary.totalUnpaid.toLocaleString()} دج
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">
                        المبلغ الإجمالي
                      </p>
                      <p className="text-xl font-bold">
                        {emp.summary.totalPrice.toLocaleString()} دج
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">نسبة التحصيل</span>
                      <span className="text-sm font-medium">
                        {Math.round(
                          calculatePaymentPercentage(
                            emp.summary.totalPaid,
                            emp.summary.totalPrice
                          )
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={calculatePaymentPercentage(
                        emp.summary.totalPaid,
                        emp.summary.totalPrice
                      )}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
