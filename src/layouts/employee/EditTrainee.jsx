import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Loader2, Save, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/services/api";
import { toast } from "sonner";

// Define the trainee form schema
const traineeSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal("")),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  program: z.string({ required_error: "Please select a program" }),
  inialTranche: z.coerce.number().min(0),
  secondTranche: z.coerce.number().min(0).optional(),
  rest: z.coerce.number().min(0),
  totalPrice: z.coerce.number().min(0),
  note: z.string().optional().or(z.literal("")),
})

const mockPrograms = [
  {
    _id: "PROG123",
    course: {
      name: "Web Development Bootcamp",
      price: 1500,
    },
    institution: {
      name: "Tech Academy",
    },
    start_date: "2023-09-01",
    end_date: "2023-12-15",
  },
  {
    _id: "PROG456",
    course: {
      name: "Data Science Fundamentals",
      price: 1800,
    },
    institution: {
      name: "Data Institute",
    },
    start_date: "2023-10-15",
    end_date: "2024-02-15",
  },
]

export default function EditTrainee() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [programs, setPrograms] = useState(mockPrograms);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(traineeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      program: "",
      inialTranche: 0,
      secondTranche: 0,
      rest: 0,
      totalPrice: 0,
      note: "",
    },
  })

  // Fetch trainee data when component mounts
  useEffect(() => {
    const fetchTrainee = async () => {
      setIsLoading(true)
      try {
        
       const response = await api.get(`/api/trainee/${id}`)

        // Set form values
        form.reset({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          program: response.data.program._id,
          inialTranche: response.data.inialTranche,
          secondTranche: response.data.secondTranche,
          rest: response.data.rest,
          totalPrice: response.data.totalPrice,
          note: response.data.note,
        })
      } catch (error) {
        console.error("Error fetching trainee:", error)
      } finally {
        setIsLoading(false)
      }
    }

   const fetchPrograms = async () => {
     try {
       const response = await api.get('/api/program/employee')
       setPrograms(response.data)
     } catch (error) {
       console.error("Error fetching programs:", error)
     }
   }

    fetchTrainee()
    fetchPrograms()
  }, [id, form, toast])

  // Update total price when program changes
  useEffect(() => {
    const selectedProgramId = form.watch("program")
    const selectedProgram = programs.find((program) => program._id === selectedProgramId)

    if (selectedProgram) {
      form.setValue("totalPrice", selectedProgram.course.price)
    }
  }, [form.watch("program"), programs, form])

  // Handle form submission
  const onSubmit = async (values) => {
    setIsSaving(true)
    console.log(values)
    try {
      
     await api.put(`/api/trainee/${id}`,values)

      toast.success( "Success",{
        description: "Trainee information updated successfully",
      })

      // Navigate back to search page
      setTimeout(() => {
        navigate(`/search-trainee`)
      }, 1000)
    } catch (error) {
      console.error("Error updating trainee:", error)
      toast.error("the tainee has not updated")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Button variant="outline" size="sm" className="mb-4" onClick={() => navigate(`/search-trainee`)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Trainee</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={programs.length === 0 ? "Loading programs..." : "Select a program"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem key={program._id} value={program._id} className="py-3">
                                <div className="flex flex-col gap-1">
                                  <div className="font-medium">{program.course.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {program.institution?.name} • {format(new Date(program.start_date), "MMM d, yyyy")}{" "}
                                    - {format(new Date(program.end_date), "MMM d, yyyy")}
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
                            <Input type="number" min="0" readOnly disabled={true} {...field} />
                          </FormControl>
                          <FormDescription>Automatically calculated from the selected program</FormDescription>
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
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => (window.location.href = "/trainees/search")}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}