import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  nationalId: z.string().min(1),
  institutions: z.array(z.string()).optional(),
})

export default function AddUserModal({ open, onOpenChange, institutions, onAddUser }) {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      nationalId: "",
      institutions: [],
    }
  })

  const handleSubmit = (data) => {
    onAddUser(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Fill in the details to add a new user.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email address" {...field} />
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
                  <FormLabel>Password *</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
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
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
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
                  <FormLabel>National ID *</FormLabel>
                  <FormControl>
                    <Input placeholder="National ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institutions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institutions</FormLabel>
                  <FormControl>
                    <div className="border rounded-md p-2">
                      <ScrollArea className="h-32">
                        <div className="space-y-2">
                          {institutions.map((institution) => (
                            <div key={institution._id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`add-inst-${institution._id}`}
                                checked={field.value.includes(institution._id)}
                                onChange={() => {
                                  const newValue = field.value.includes(institution._id)
                                    ? field.value.filter((id) => id !== institution._id)
                                    : [...field.value, institution._id]
                                  field.onChange(newValue)
                                }}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <label htmlFor={`add-inst-${institution._id}`} className="text-sm">
                                {institution.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}