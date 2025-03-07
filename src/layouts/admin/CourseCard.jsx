import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil, Trash2, X, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const courseSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
  duree: z.string().optional(),
})

export default function CourseCard({ course, editingId, formatPrice, onStartEditing, onUpdateCourse, onDeleteCourse }) {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: course.name,
      price: course.price,
      duree: course.duree || "",
    }
  })

  useEffect(() => {
    if (editingId === course._id) {
      form.reset({
        name: course.name,
        price: course.price,
        duree: course.duree || "",
      })
    }
  }, [editingId])

  const handleSubmit = (data) => {
    onUpdateCourse(data)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>
          {editingId === course._id ? (
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
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
            <>
              {course.name}
              {!editingId && (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {formatPrice(course.price)}
                </div>
              )}
            </>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        {editingId === course._id ? (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
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
                    <FormLabel>Duration</FormLabel>
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
              <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{course.duree || "Duration not specified"}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {editingId === course._id ? (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => onStartEditing(null)}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={form.handleSubmit(handleSubmit)}>
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => onStartEditing(course._id)}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the course "{course.name}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteCourse(course._id)}>
                    Delete
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