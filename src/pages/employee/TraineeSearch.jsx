import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { QrCode, Search, Edit, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/useMobile"
import QRScannerComponent from "@/layouts/employee/QRScanner"
import api from "@/services/api"
import TraineeDetailsCard from "@/layouts/employee/TraineeDetailsCard"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


// Search form schema
const searchSchema = z.object({
  searchTerm: z.string().min(1, { message: "Please enter an ID or phone number" }),
})


export default function TraineeSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [trainee, setTrainee] = useState(null)
  const isMobile = useMobile()

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
    },
  })

  const searchTrainee = async (searchTerm) => {
    setIsSearching(true)
    setTrainee(null)

    try {
      const response = await api.post('/api/trainee/search',{id: searchTerm})
      setTrainee(response.data)
      toast.success("Trainee has found", {
        description: `the Trainee ${response.data.name} has found`
      })
    } catch (error) {
      toast.error("Trainee not found", {
        description: `${error.response.data.message}`
      })
    } finally {
      setIsSearching(false)
    }
  }

  const onSubmit = (values) => {
    searchTrainee(values.searchTerm)
  }

  const handleQRScan = (data) => {
    form.setValue("searchTerm", data)
    searchTrainee(data)
  }

  const handleEdit = () => {
    if (!trainee) return
    navigate(`/edit-trainee/${trainee._id}`);
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Trainee Search</CardTitle>
          <CardDescription>Search for a trainee by ID or phone number</CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="search">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="qr">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="mt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="searchTerm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID or Phone Number</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Enter trainee ID or phone number" {...field} />
                            </FormControl>
                            <Button type="submit" disabled={isSearching}>
                              {isSearching ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Searching
                                </>
                              ) : (
                                <>
                                  <Search className="h-4 w-4 mr-2" />
                                  Search
                                </>
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="qr" className="mt-4">
                <QRScannerComponent onScan={handleQRScan} />
              </TabsContent>
            </Tabs>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="searchTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID or Phone Number</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Enter trainee ID or phone number" {...field} />
                        </FormControl>
                        <Button type="submit" disabled={isSearching}>
                          {isSearching ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Searching
                            </>
                          ) : (
                            <>
                              <Search className="h-4 w-4 mr-2" />
                              Search
                            </>
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {trainee && (
            <div className="mt-8 border-t pt-6">
              <TraineeDetailsCard trainee={trainee} onEdit={handleEdit} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">Need to register a new trainee?</p>
          <Button variant="outline" onClick={() => (navigate(`/add-trainee`))}>
            Add New Trainee
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}