import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CheckCircle, XCircle, Calendar } from "lucide-react"
import { format } from "date-fns"

export default function StatisticsCard({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const startDate = new Date(data.program.startDate)
  const endDate = new Date(data.program.endDate)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.program.courseName} Program</CardTitle>
        <CardDescription>{data.program.institutionName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Trainees</span>
            </div>
            <div className="text-2xl font-bold">{data.totalTrainees}</div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Total Amount</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(data.totalAmount)}</div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Paid</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(data.totalPaid)}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round((data.totalPaid / data.totalAmount) * 100)}% of total
            </div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Unpaid</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(data.totalUnpaid)}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round((data.totalUnpaid / data.totalAmount) * 100)}% of total
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <div className="flex items-center space-x-2 text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Program Duration</span>
          </div>
          <div className="text-sm">
            {format(startDate, "MMMM d, yyyy")} - {format(endDate, "MMMM d, yyyy")}
            <span className="ml-2 text-muted-foreground">
              ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}