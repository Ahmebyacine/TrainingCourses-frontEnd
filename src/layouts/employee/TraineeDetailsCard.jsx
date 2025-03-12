import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { format } from "date-fns"

const TraineeDetailsCard = ({ trainee, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{trainee.name}</h3>
          <p className="text-muted-foreground">{trainee.phone}</p>
          {trainee.email && <p className="text-muted-foreground">{trainee.email}</p>}
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          تعديل
        </Button>
      </div>

      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">تفاصيل البرنامج</h4>
          <p className="font-medium">{trainee.program.course.name}</p>
          {trainee.program.institution && (
            <p className="text-sm text-muted-foreground">{trainee.program.institution.name}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {format(new Date(trainee.program.start_date), "MMM d, yyyy")} -{" "}
            {format(new Date(trainee.program.end_date), "MMM d, yyyy")}
          </p>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">معلومات الدفع</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">القسط الأولي</p>
              <p className="font-medium">{trainee.inialTranche.toFixed(2)}</p>
            </div>
            {trainee.secondTranche !== undefined && (
              <div>
                <p className="text-sm text-muted-foreground">القسط الثاني</p>
                <p className="font-medium">{trainee.secondTranche.toFixed(2)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">المبلغ المتبقي</p>
              <p className="font-medium">{trainee.rest.toFixed(2)}</p>
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
  )
  }

  export default TraineeDetailsCard;