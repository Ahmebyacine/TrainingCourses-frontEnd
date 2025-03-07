import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  employee: z.string().optional(),
  program: z.string({ required_error: "Please select a program" }),
  inialTranche: z.coerce.number().min(0).optional(),
  secondTranche: z.coerce.number().min(0).optional(),
  rest: z.coerce.number().min(0).optional(),
  totalPrice: z.coerce.number().min(0).optional(),
  note: z.string().optional(),
})

export default function AddTrainee() {
  const [programs, setPrograms] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      employee: employees[0],
      program: "",
      inialTranche: 0,
      secondTranche: 0,
      rest: 0,
      totalPrice: 0,
      note: "",
    },
  })

  // Fetch programs and employees data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const programsResponse = await fetch("/api/programs")
        const employeesResponse = await fetch("/api/users")

        const programsData = await programsResponse.json()
        const employeesData = await employeesResponse.json()

        setPrograms(programsData)
        setEmployees(employeesData)
      } catch (error) {
        console.error("Error fetching data:", error)
        // For demo purposes, set some sample data
        setPrograms([
          { _id: "1", name: "Web Development" },
          { _id: "2", name: "Data Science" },
          { _id: "3", name: "UX/UI Design" },
        ])
        setEmployees([
          { _id: "1", name: "John Doe" },
          { _id: "2", name: "Jane Smith" },
        ])
      }
    }

    fetchData()
  }, [])

  // Calculate total price when tranches change
  useEffect(() => {
    const values = form.getValues()
    const inialTranche = values.inialTranche || 0
    const secondTranche = values.secondTranche || 0
    const rest = values.rest || 0

    const total = inialTranche + secondTranche + rest
    form.setValue("totalPrice", total)
  }, [form.watch("inialTranche"), form.watch("secondTranche"), form.watch("rest"), form.getValues, form.setValue])

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert("Registration successful!")
        form.reset()
      } else {
        const errorData = await response.json()
        alert(`Registration failed: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred while submitting the form")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trainee Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Program Field */}
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program._id} value={program._id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Information */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Initial Tranche Field */}
                <FormField
                  control={form.control}
                  name="inialTranche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Tranche</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Second Tranche Field */}
                <FormField
                  control={form.control}
                  name="secondTranche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Second Tranche</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rest Field */}
                <FormField
                  control={form.control}
                  name="rest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rest</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total Price Field */}
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Total Price</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" readOnly {...field} />
                      </FormControl>
                      <FormDescription>Automatically calculated from the sum of all tranches</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Note Field */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional notes here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Register Student"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}