import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({ error }) => {
  const router = useNavigate()

  const errorMessages = {
    400: "طلب غير صحيح",
    401: "غير مصرح",
    403: "ممنوع",
    404: "غير موجود",
    405: "طريقة غير مسموحة",
    408: "انتهت مهلة الطلب",
    409: "تعارض",
    500: "خطأ داخلي في الخادم",
    501: "غير مطبق",
    502: "بوابة خاطئة",
    503: "الخدمة غير متاحة",
    504: "انتهت مهلة البوابة",
    505: "إصدار HTTP غير مدعوم",
  }

  const status = error?.status || 500
  const message = errorMessages[status] || "خطأ غير معروف"

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center">
            <h1 className="text-8xl font-bold text-primary">{status}</h1>
            <h2 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground mt-2">{message}</h2>
          </div>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <p className="text-muted-foreground">
            {error.message || "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button variant="default" onClick={() => router.back()} className="px-6">
            العودة
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ErrorPage