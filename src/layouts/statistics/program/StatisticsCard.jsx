import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CheckCircle, XCircle, Calendar } from "lucide-react"
import { format } from 'date-fns'
import ar from 'date-fns/locale/ar'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function StatisticsCard({ data }) {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const startDate = new Date(data.program.startDate)
  const endDate = new Date(data.program.endDate)

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl text-right">برنامج {data.program.courseName}</CardTitle>
        <CardDescription className="text-right">{data.program.institutionName}</CardDescription>
        <Button variant="outline">
          <Link 
          to={`/program-report/${data.program.id}`}
          onClick={(e) => {
            e.preventDefault();
            window.open(e.currentTarget.href, '_blank');
          }} 
          className='w-full h-full'>
           تقرير البرنامج  
          </Link>
        </Button>
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