import { useState, useEffect } from "react"
import { Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProgramCard from "@/layouts/admin/ProgramCard"
import AddProgramModal from "@/layouts/admin/AddProgramModal"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [courses, setCourses] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [expandedPrograms, setExpandedPrograms] = useState([])

  // Fetch programs, courses, and institutions data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API endpoints
        const [programsResponse, coursesResponse, institutionsResponse] = await Promise.all([
          api.get("/api/program"),
          api.get("/api/course"),
          api.get("/api/institution"),
        ])
        setPrograms(programsResponse.data)
        setCourses(coursesResponse.data)
        setInstitutions(institutionsResponse.data)
      } catch (error) {
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle adding a new program
  const handleAddProgram = async (data) => {
    try {
      // Format dates for API
      const formattedData = {
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
      }

      // Replace with your actual API endpoint
      const response = await api.post("/api/program",formattedData)
      setPrograms([...programs, response.data[0]])
      setAddDialogOpen(false)
      toast.success("Program has been Added", {
        description: `the Program ${response.data[0].name} has Added`
      })
    } catch (error) {
      toast.error("Program has been Not Added")
      setAddDialogOpen(false)
    }
  }

  // Handle updating a program
  const handleUpdateProgram = async (data) => {
    try {
      // Format dates for API
      const formattedData = {
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
      }

      // Replace with your actual API endpoint
      const response = await api.put(`/api/program/${editingId}`,formattedData)
      setEditingId(null)
      setPrograms(programs.map((program) => (program._id === editingId ? response.data[0] : program)))
      toast.success("Program has been Updated", {
        description: `the Program ${response.data[0].name} has Updated`
      })
    } catch (error) {
      toast.error("Program has been Not Updated")
      setEditingId(null)
    }
  }

  // Handle deleting a program
  const handleDeleteProgram = async (id) => {
    try {
      // Replace with your actual API endpoint
      await api.delete(`/api/program/${id}`)
      setPrograms(programs.filter((program) => program._id !== id))
      if (expandedPrograms.includes(id)) {
        setExpandedPrograms(expandedPrograms.filter((progId) => progId !== id))
      }
      toast.success("Program has been Deleted")
    } catch (error) {
      toast.error("Program has been Not Deleted")
    }
  }

  // Start editing a program
  const startEditing = (program) => {
    setEditingId(program._id)
  }
  if (error) return <ErrorPage error={error} />

  return (
    <div className="container mx-auto py-8 px-5 md:px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold">Programs</h1>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading programs...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No programs found</h3>
          <p className="text-muted-foreground">Get started by adding a new program.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {programs.map((program) => (
            <ProgramCard
              key={program._id}
              program={program}
              onStartEditing={() => startEditing(program)}
              onDeleteProgram={handleDeleteProgram}
            />
          ))}
        </div>
      )}

      <AddProgramModal
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        courses={courses}
        institutions={institutions}
        onSubmit={handleAddProgram}
        mode="add"
      />

      {editingId && (
        <AddProgramModal
          open={!!editingId}
          onOpenChange={(open) => !open && setEditingId(null)}
          courses={courses}
          institutions={institutions}
          onSubmit={handleUpdateProgram}
          mode="edit"
          initialData={programs.find((p) => p._id === editingId)}
        />
      )}
    </div>
  )
}