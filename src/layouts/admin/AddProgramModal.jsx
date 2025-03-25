import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the form schema with validation
const programSchema = z.object({
  course: z.string({ required_error: "الدورة مطلوبة" }),
  institution: z.string({ required_error: "المؤسسة مطلوبة" }),
  trainer: z.string({ required_error: "المدرب مطلوب" }),
  start_date: z.string({ required_error: "تاريخ البدء مطلوب" }),
  end_date: z.string({ required_error: "تاريخ الانتهاء مطلوب" }),
})

export default function AddProgramModal({
  open,
  onOpenChange,
  courses,
  institutions,
  trainers,
  onSubmit,
  mode = "add",
  initialData = null,
}) {
  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      course: "",
      institution: "",
      trainer: "",
      start_date: "",
      end_date: "",
    },
  })

  // Set form values when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.reset({
        course: initialData.course._id,
        institution: initialData.institution._id,
        trainer: initialData.trainer._id,
        start_date: formatDateForInput(initialData.start_date),
        end_date: formatDateForInput(initialData.end_date),
      })
    } else if (mode === "add") {
      form.reset({
        course: "",
        institution: "",
        trainer: "",
        start_date: "",
        end_date: "",
      })
    }
  }, [mode, initialData, form])

  // Handle form submission
  const handleFormSubmit = (data) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "إضافة برنامج جديد" : "تعديل البرنامج"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "قم بملء التفاصيل لإضافة برنامج جديد." : "تحديث تفاصيل البرنامج."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الدورة *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدورة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course._id} value={course._id}>
                          {course.name}
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
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المؤسسة *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مؤسسة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {institutions.map((institution) => (
                        <SelectItem key={institution._id} value={institution._id}>
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
              name="trainer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدرب *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدرب" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer._id} value={trainer._id}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-colos-1 md:grid-cols-2  gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ البدء *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ النهاية *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4 mr-1" />
                إلغاء
              </Button>
              <Button type="submit">{mode === "add" ? "إضافة برنامج" : "تحديث البرنامج"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}