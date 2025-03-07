import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil, Trash2, X, Check, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const institutionSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  address: z.string().optional(),
  phone: z.string().optional(),
})

export default function InstitutionCard({ institution, editingId, onStartEditing, onUpdateInstitution, onDeleteInstitution }) {
  const form = useForm({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      name: institution.name,
      address: institution.address || "",
      phone: institution.phone || "",
    }
  })

  useEffect(() => {
    if (editingId === institution._id) {
      form.reset({
        name: institution.name,
        address: institution.address || "",
        phone: institution.phone || "",
      })
    }
  }, [editingId])

  const handleSubmit = (data) => {
    onUpdateInstitution(data)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>
          {editingId === institution._id ? (
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
            institution.name
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        {editingId === institution._id ? (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
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
              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{institution.address || "No address provided"}</span>
            </div>
            <div className="flex items-start">
              <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{institution.phone || "No phone provided"}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {editingId === institution._id ? (
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
            <Button variant="outline" size="sm" onClick={() => onStartEditing(institution._id)}>
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
                    This will permanently delete {institution.name}. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteInstitution(institution._id)}>
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