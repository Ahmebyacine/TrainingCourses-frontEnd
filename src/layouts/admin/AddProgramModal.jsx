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
  course: z.string({ required_error: "Course is required" }),
  institution: z.string({ required_error: "Institution is required" }),
  start_date: z.string({ required_error: "Start date is required" }),
  end_date: z.string({ required_error: "End date is required" }),
})

export default function AddProgramModal({
  open,
  onOpenChange,
  courses,
  institutions,
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
        start_date: formatDateForInput(initialData.start_date),
        end_date: formatDateForInput(initialData.end_date),
      })
    } else if (mode === "add") {
      form.reset({
        course: "",
        institution: "",
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
          <DialogTitle>{mode === "add" ? "Add New Program" : "Edit Program"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Fill in the details to add a new program." : "Update the program details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
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
                  <FormLabel>Institution *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an institution" />
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
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
                    <FormLabel>End Date *</FormLabel>
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
                Cancel
              </Button>
              <Button type="submit">{mode === "add" ? "Add Program" : "Update Program"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}