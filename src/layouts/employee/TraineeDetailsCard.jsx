import { Button } from "@/components/ui/button";
import { Download, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PDFDownload from "@/utils/PDF/PDFDownload";
import { formatDate } from "@/utils/formatSafeDate";

const TraineeDetailsCard = ({ trainee, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h3 className="text-xl font-bold">{trainee.name}</h3>
          <p className="text-muted-foreground">{trainee.phone}</p>
          {trainee.email && (
            <p className="text-muted-foreground">{trainee.email}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="w-full sm:w-auto"
          >
            <Edit className="h-4 w-4 mr-2" />
            تعديل
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <PDFDownload trainee={trainee} />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                حذف
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
                <AlertDialogDescription>
                  سيتم حذف المتدرب نهائيًا مع جميع البيانات المرتبطة به. لا يمكن
                  التراجع عن هذا الإجراء.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  تأكيد الحذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">تفاصيل البرنامج</h4>
          <p className="font-medium">{trainee.program.course.name}</p>
          {trainee.program.institution && (
            <p className="text-sm text-muted-foreground">
              {trainee.program.institution.name}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {formatDate(trainee.program.start_date)} -{" "}
            {formatDate(trainee.program.end_date)}
          </p>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">معلومات الدفع</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">القسط الأولي</p>
              <p className="font-medium">{trainee.inialTranche.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">طريقة الدفع</p>
              <p className="font-medium">
                {trainee?.methodePaiement1
                  ? trainee.methodePaiement1 === "cash"
                    ? "نقدًا"
                    : trainee.methodePaiement1 === "ccp"
                    ? "تحويل بريدي"
                    : trainee.methodePaiement1 === "baridimob"
                    ? "بريدي موب"
                    : "غير محدد"
                  : "غير محدد"}
              </p>
            </div>
            {trainee.secondTranche !== undefined && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">القسط الثاني</p>
                  <p className="font-medium">
                    {trainee.secondTranche.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                  <p className="font-medium">
                    {trainee?.methodePaiement2
                  ? trainee.methodePaiement2 === "cash"
                    ? "نقدًا"
                    : trainee.methodePaiement2 === "ccp"
                    ? "تحويل بريدي"
                    : trainee.methodePaiement2 === "baridimob"
                    ? "بريدي موب"
                    : "غير محدد"
                  : "غير محدد"}
                  </p>
                </div>
              </>
            )}
            <div>
              <p className="text-sm text-muted-foreground">المبلغ المتبقي</p>
              <p className="font-medium">{trainee.rest.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">التخفيض</p>
              <p className="font-medium">{trainee?.discount?.toFixed(2) || "غير محدد"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
              <p className="font-medium">{trainee.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {trainee.note && (
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">ملاحظات</h4>
            <p className="text-sm">{trainee.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeDetailsCard;
