import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const courseSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل" }),
  price: z.coerce.number().min(0, { message: "يجب أن يكون السعر رقمًا موجبًا" }),
  duree: z.string().optional(),
})

export default function AddCourseModal({ open, onOpenChange, onAddCourse }) {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      price: 0,
      duree: "",
    }
  })

  const handleSubmit = (data) => {
    onAddCourse(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة دورة
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة دورة جديدة</DialogTitle>
          <DialogDescription>قم بملء التفاصيل لإضافة دورة جديدة.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم *</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم الدورة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر *</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="سعر الدورة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدة</FormLabel>
                  <FormControl>
                    <Input placeholder="مدة الدورة (على سبيل المثال، 3 أشهر)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">إضافة دورة</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}