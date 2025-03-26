import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CheckCircle, XCircle, Calendar, Download } from "lucide-react"
import { format } from 'date-fns'
import ar from 'date-fns/locale/ar'
import { Button } from "@/components/ui/button"
import api from "@/services/api"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PDFReport from "@/utils/PDF/PDFReport"

export default function StatisticsCard({ data }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const startDate = new Date(data.program.startDate)
  const endDate = new Date(data.program.endDate)

  const fetchReportData = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/api/trainee/program/${data.program.id}`)
      setReportData(response.data)
    } catch (error) {
      console.error("Error fetching report data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl text-right">برنامج {data.program.courseName}</CardTitle>
        <CardDescription className="text-right">{data.program.institutionName}</CardDescription>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (open) fetchReportData()
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline">تقرير البرنامج</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-right">تقرير برنامج {data.program.courseName}</DialogTitle>
              <DialogDescription className="text-right">تفاصيل البرنامج والمدفوعات</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-4">جاري تحميل البيانات...</div>
              ) : reportData ? (
                <Button
                className="w-full flex items-center justify-center gap-2"
                disabled={isLoading || !reportData}
                onClick={()=> setIsDialogOpen(false)}>
                <Download className="h-4 w-4" />
                 <PDFReport data={reportData}/>
              </Button>
              ) : (
                <div className="text-center py-4">لا توجد بيانات متاحة</div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-end space-x-2 text-muted-foreground">
              <span className="text-sm font-medium">المتدربين</span>
              <Users className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-left">{data.totalTrainees}</div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-end space-x-2 text-muted-foreground">
              <span className="text-sm font-medium">المبلغ الإجمالي</span>
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-left">{formatCurrency(data.totalAmount)}</div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-end space-x-2 text-green-600">
              <span className="text-sm font-medium">المدفوع</span>
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-left">{formatCurrency(data.totalPaid)}</div>
            <div className="text-sm text-muted-foreground text-left">
              {Math.round((data.totalPaid / data.totalAmount) * 100)}% من الإجمالي
            </div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-end space-x-2 text-red-600">
              <span className="text-sm font-medium">غير المدفوع</span>
              <XCircle className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-left">{formatCurrency(data.totalUnpaid)}</div>
            <div className="text-sm text-muted-foreground text-left">
              {Math.round((data.totalUnpaid / data.totalAmount) * 100)}% من الإجمالي
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <div className="flex items-center justify-end space-x-2 text-muted-foreground mb-2">
            <span className="text-sm font-medium">مدة البرنامج</span>
            <Calendar className="h-4 w-4" />
          </div>
          <div className="text-sm text-right">
            {format(startDate, "MMMM d, yyyy", { locale: ar })} - {format(endDate, "MMMM d, yyyy", { locale: ar })}
            <span className="ml-2 text-muted-foreground">
              ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} يوم)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}