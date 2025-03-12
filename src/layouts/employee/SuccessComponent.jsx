import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PDFDownload from "@/utils/PDF/PDFDownload"

export const SuccessComponent = ({ onReset, trainee }) => (
  <Card className="w-full max-w-3xl mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">تم التسجيل بنجاح!</CardTitle>
    </CardHeader>
    <CardContent className="text-center space-y-4">
      <div className="text-green-500 text-4xl">✓</div>
      <p className="text-muted-foreground">
        تم تسجيل المتدرب بنجاح
      </p>
      <div className="flex flex-col align-center">
      <Button className="mt-4">
        <PDFDownload trainee={trainee}>
          تنزيل الوصل
        </PDFDownload>
      </Button>
      <Button onClick={onReset} className="mt-4">
        إضافة متدرب آخر
      </Button>
      </div>
    </CardContent>
  </Card>
)