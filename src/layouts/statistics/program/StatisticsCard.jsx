import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { calculateDuration, formatDate } from "@/utils/formatSafeDate";
import { getTokenData } from "@/services/auth";

export default function StatisticsCard({ data }) {
  const { role } = getTokenData();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const startDate = new Date(data.program.startDate);
  const endDate = new Date(data.program.endDate);

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl text-right">
          برنامج {data.program.courseName}
        </CardTitle>
        <CardDescription className="text-right">
          {data.program.institutionName}
        </CardDescription>
        <Button variant="outline">
          <Link
            to={
              role === "employee"
                ? `/program-report-employee/${data.program.id}`
                : `/program-report/${data.program.id}`
            }
            onClick={(e) => {
              e.preventDefault();
              window.open(e.currentTarget.href, "_blank");
            }}
            className="w-full h-full"
          >
            تقرير البرنامج
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-start space-x-2 text-muted-foreground">
              <span className="text-sm font-medium">المتدربين</span>
              <Users className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-right">
              {data.totalTrainees}
            </div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-start space-x-2 text-muted-foreground">
              <span className="text-sm font-medium">المبلغ الإجمالي</span>
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-right">
              {formatCurrency(data.totalAmount)}
            </div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-start space-x-2 text-green-600">
              <span className="text-sm font-medium">المدفوع</span>
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-right">
              {formatCurrency(data.totalPaid)}
            </div>
            <div className="text-sm text-muted-foreground text-right">
              {Math.round((data.totalPaid / data.totalAmount) * 100)}% من
              الإجمالي
            </div>
          </div>

          <div className="flex flex-col space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-start space-x-2 text-red-600">
              <span className="text-sm font-medium">غير المدفوع</span>
              <XCircle className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-right">
              {formatCurrency(data.totalUnpaid)}
            </div>
            <div className="text-sm text-muted-foreground text-right">
              {Math.round((data.totalUnpaid / data.totalAmount) * 100)}% من
              الإجمالي
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <div className="flex items-center justify-start space-x-2 text-muted-foreground mb-2">
            <span className="text-sm font-medium">مدة البرنامج</span>
            <Calendar className="h-4 w-4" />
          </div>
          <div className="text-sm text-right">
            {formatDate(startDate)} - {formatDate(endDate)}
            <span className="ml-2 text-muted-foreground">
              ({calculateDuration(startDate, endDate)})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
