import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil, Trash2, X, Check, User, BookOpen, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

const expenseSchema = z.object({
  title: z.string().min(2, { message: "يجب أن يتكون العنوان من حرفين على الأقل" }),
  program: z.string().min(1, { message: "البرنامج مطلوب" }),
  amount: z.number().min(1, { message: "يجب أن يكون المبلغ أكبر من الصفر" }),
  note: z.string().optional(),
})

export default function ExpenseCard({ expense, editingId, onStartEditing, onUpdateExpense, onDeleteExpense, programs }) {
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: expense.title,
      amount: expense.amount,
      program: expense.program?._id || "",
      note: expense.note || "",
    }
  })

  useEffect(() => {
    if (editingId === expense._id) {
      form.reset({
        title: expense.title,
        amount: expense.amount,
        program: expense.program?._id || "",
        note: expense.note || "",
      })
    }
  }, [editingId])

  const handleSubmit = (data) => {
    onUpdateExpense(data)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>
          {editingId === expense._id ? (
            <Form {...form}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          ) : (
            expense.title
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        {editingId === expense._id ? (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البرنامج *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر برنامجًا" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program._id} value={program._id} className="py-3">
                            <div className="flex flex-col gap-1">
                              <div className="font-medium">{program.course.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {program.institution?.name} • {format(new Date(program.start_date), "MMM d, yyyy")} -{" "}
                                {format(new Date(program.end_date), "MMM d, yyyy")} • {program.trainer?.name}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المبلغ *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملاحظات</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start">
              <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{expense.amount} د.ج</span>
            </div>
            <div className="flex items-start">
              <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{expense.employee?.name || "غير معروف"}</span>
            </div>
            <div className="flex items-start">
              <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{expense.program?.course?.name || "غير محدد"}</span>
            </div>
            {expense.note && (
              <p className="text-sm text-muted-foreground mt-2">{expense.note}</p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {editingId === expense._id ? (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => onStartEditing(null)}>
              <X className="h-4 w-4 mr-1" />
              إلغاء
            </Button>
            <Button size="sm" onClick={form.handleSubmit(handleSubmit)}>
              <Check className="h-4 w-4 mr-1" />
              حفظ
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => onStartEditing(expense._id)}>
              <Pencil className="h-4 w-4 mr-1" />
              تعديل
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  حذف
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                  <AlertDialogDescription>
                    سيتم حذف هذه المصاريف نهائيًا. لا يمكن التراجع عن هذا الإجراء.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteExpense(expense._id)}>
                    حذف
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}