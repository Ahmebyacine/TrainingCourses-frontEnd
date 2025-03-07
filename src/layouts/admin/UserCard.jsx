import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil, Trash2, X, Check, Mail, Phone, BadgeIcon as IdCard, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const editUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  phone: z.string().min(10),
  nationalId: z.string().min(1),
  institutions: z.array(z.string()).optional(),
})

export default function UserCard({ user, institutions, editingId, formatDate, onStartEditing, onUpdateUser, onDeleteUser }) {
  const [selectedInstitutions, setSelectedInstitutions] = useState([])
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      phone: user.phone,
      nationalId: user.nationalId,
      institutions: user.institutions || [],
    }
  })

  useEffect(() => {
    if (editingId === user._id) {
      setSelectedInstitutions(user.institutions || [])
      form.reset({
        name: user.name,
        email: user.email,
        password: "",
        phone: user.phone,
        nationalId: user.nationalId,
        institutions: user.institutions || [],
      })
    }
  }, [editingId])

  const toggleInstitution = (institutionId) => {
    setSelectedInstitutions(prev => {
      const newValue = prev.includes(institutionId)
        ? prev.filter(id => id !== institutionId)
        : [...prev, institutionId]
      form.setValue("institutions", newValue)
      return newValue
    })
  }

  const getInstitutionName = (id) => {
    return institutions.find(inst => inst._id === id)?.name || "Unknown Institution"
  }

  const handleSubmit = (data) => {
    onUpdateUser(user._id, data)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle>
            {editingId === user._id ? (
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
              user.name
            )}
          </CardTitle>
          <div className="text-xs text-muted-foreground">{formatDate(user.createdAt)}</div>
        </div>
        {!editingId && (
          <CardDescription className="flex items-center mt-1">
            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            {user.email}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-2">
        {editingId === user._id ? (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (leave empty to keep current)</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institutions"
                render={() => (
                  <FormItem>
                    <FormLabel>Institutions</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {institutions.map(institution => (
                              <div key={institution._id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`edit-inst-${institution._id}`}
                                  checked={selectedInstitutions.includes(institution._id)}
                                  onChange={() => toggleInstitution(institution._id)}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor={`edit-inst-${institution._id}`} className="text-sm">
                                  {institution.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Form>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start">
              <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-start">
              <IdCard className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{user.nationalId}</span>
            </div>
            <div className="flex items-start">
              <Building2 className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {user.institutions?.length > 0 ? (
                  user.institutions.map(instId => (
                    <Badge key={instId} variant="outline" className="text-xs">
                      {getInstitutionName(instId)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">No institutions assigned</span>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {editingId === user._id ? (
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
            <Button variant="outline" size="sm" onClick={() => onStartEditing(user._id)}>
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
                    This will permanently delete the user "{user.name}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteUser(user._id)}>
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