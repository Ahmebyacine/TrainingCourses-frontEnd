import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CheckCircle, XCircle, Calendar } from "lucide-react"

export default function StatisticsCard({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(amount)
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.user.name}</CardTitle>
        <CardDescription>{data.user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Total Amount</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(data.statistics.totalAmount)}</div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Paid</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(data.statistics.totalPaid)}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round((data.statistics.totalPaid / data.statistics.totalAmount) * 100)}% of total
            </div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Unpaid</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(data.statistics.totalUnpaid)}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round((data.statistics.totalUnpaid / data.statistics.totalAmount) * 100)}% of total
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <div className="flex items-center space-x-2 text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Statistics Duration</span>
          </div>
          <div className="text-sm">
            {data.year} {data.monthName}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}