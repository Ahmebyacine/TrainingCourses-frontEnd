import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const expenseSchema = z.object({
  title: z.string().min(2, { message: "يجب أن يتكون العنوان من حرفين على الأقل" }),
  institution: z.string(),
  amount: z.number().min(1, { message: "يجب أن يكون المبلغ أكبر من الصفر" }),
  note: z.string().optional(),
})

export default function AddExpenseModal({ open, onOpenChange, onAddExpense, institutions }) {
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      institution:"",
      note: "",
    }
  })

  const handleSubmit = (data) => {
    onAddExpense(data)
    form.reset()
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة مصاريف
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة مصاريف جديدة</DialogTitle>
          <DialogDescription>قم بملء التفاصيل لإضافة مصاريف جديدة.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
             <FormField
               control={form.control}
               name="institution"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>مؤسسة *</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value[0]}>
                     <FormControl>
                       <SelectTrigger>
                       <SelectValue
                         placeholder={
                           institutions.length === 0 
                             ? "جاري تحميل مؤسساسات..." 
                             : "اختر مؤسسة"
                         } 
                       />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       {institutions.map((institution) => (
                         <SelectItem key={institution._id} value={institution._id} className="py-3">
                          {institution.name}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان *</FormLabel>
                  <FormControl>
                    <Input placeholder="عنوان المصاريف" {...field} />
                  </FormControl>
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
                      placeholder="المبلغ"
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
                    <Input placeholder="ملاحظات إضافية" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">إضافة مصاريف</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}