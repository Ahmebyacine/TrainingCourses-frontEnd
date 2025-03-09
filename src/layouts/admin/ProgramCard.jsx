import { useState } from "react"
import { Pencil, Trash2, Calendar, Users, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import api from "@/services/api"

export default function ProgramCard({
  program,
  onStartEditing,
  onDeleteProgram,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [trainees, setTrainees] = useState([])
  const [isLoadingTrainees, setIsLoadingTrainees] = useState(false)

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate program duration in weeks
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.ceil(diffDays / 7)
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""}`
  }

  // Get program status based on dates
  const getProgramStatus = (startDate, endDate) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now < start) {
      return { label: "Upcoming", color: "bg-blue-100 text-blue-800" }
    } else if (now > end) {
      return { label: "Completed", color: "bg-green-100 text-green-800" }
    } else {
      return { label: "In Progress", color: "bg-yellow-100 text-yellow-800" }
    }
  }

  const handleToggle = async () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    
      try {
        setIsLoadingTrainees(true)
        const response = await api.get(`/api/trainee/program/${program._id}`)
        setTrainees(response.data)
      } catch (error) {
        console.error("Error fetching trainees:", error)
      } finally {
        setIsLoadingTrainees(false)
      }
  }

  const status = getProgramStatus(program.start_date, program.end_date)

  return (
    <Collapsible open={isExpanded} onOpenChange={handleToggle} className="border rounded-lg overflow-hidden">
      <Card className="border-0 rounded-none">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{program.course?.name || 'Unknown Course'}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>{status.label}</span>
              </div>
              <CardDescription className="mt-1">at {program.institution?.name || 'Unknown Institution'}</CardDescription>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Users className="h-4 w-4" />
                Trainees
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Duration</div>
                  <div>{calculateDuration(program.start_date, program.end_date)}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Dates</div>
                  <div>
                    {formatDate(program.start_date)} - {formatDate(program.end_date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => onStartEditing(program)}>
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
                    This will permanently delete the program "{program.course?.name}" at "
                    {program.institution?.name}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteProgram(program._id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>

      <CollapsibleContent>
        <Separator />
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Trainees for {program.course?.name}
            </h3>
          </div>

          {isLoadingTrainees ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading trainees...</p>
            </div>
          ) : trainees.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No trainees found for this program.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainees.map((trainee) => (
                    <TableRow key={trainee._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{trainee?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {trainee?.name}
                        </div>
                      </TableCell>
                      <TableCell>{trainee.email}</TableCell>
                      <TableCell>{trainee.phone}</TableCell>
                      <TableCell>{formatDate(trainee.registrationDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}