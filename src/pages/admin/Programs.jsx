import { useState, useEffect } from "react"
import { Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProgramCard from "@/layouts/admin/ProgramCard"
import AddProgramModal from "@/layouts/admin/AddProgramModal"

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [courses, setCourses] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [expandedPrograms, setExpandedPrograms] = useState([])
  const [trainees, setTrainees] = useState([])
  const [isLoadingTrainees, setIsLoadingTrainees] = useState(false)

  // Fetch programs, courses, and institutions data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API endpoints
        const [programsResponse, coursesResponse, institutionsResponse] = await Promise.all([
          fetch("/api/programs"),
          fetch("/api/courses"),
          fetch("/api/institutions"),
        ])

        const programsData = await programsResponse.json()
        const coursesData = await coursesResponse.json()
        const institutionsData = await institutionsResponse.json()

        setPrograms(programsData)
        setCourses(coursesData)
        setInstitutions(institutionsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        // For demo purposes, set some sample data
        setCourses([
          { _id: "1", name: "Web Development", price: 1200 },
          { _id: "2", name: "Data Science", price: 1500 },
          { _id: "3", name: "UX/UI Design", price: 900 },
        ])

        setInstitutions([
          { _id: "1", name: "City University" },
          { _id: "2", name: "Tech Institute" },
          { _id: "3", name: "Business School" },
        ])

        setPrograms([
          {
            _id: "1",
            course: "1",
            institution: "2",
            start_date: "2023-09-01T00:00:00.000Z",
            end_date: "2023-12-15T00:00:00.000Z",
            createdAt: "2023-08-15T00:00:00.000Z",
            updatedAt: "2023-08-15T00:00:00.000Z",
          },
          {
            _id: "2",
            course: "3",
            institution: "1",
            start_date: "2023-10-15T00:00:00.000Z",
            end_date: "2024-01-30T00:00:00.000Z",
            createdAt: "2023-09-20T00:00:00.000Z",
            updatedAt: "2023-09-20T00:00:00.000Z",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fetch trainees for a specific program
  const fetchTrainees = async (programId) => {
    setIsLoadingTrainees(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/trainees?program=${programId}`)
      const data = await response.json()
      setTrainees(data)
    } catch (error) {
      console.error("Error fetching trainees:", error)
      // For demo purposes, set some sample data
      setTrainees([
        {
          _id: "1",
          name: "Alex Johnson",
          email: "alex@example.com",
          phone: "123-456-7890",
          program: programId,
          registrationDate: "2023-08-20T00:00:00.000Z",
        },
        {
          _id: "2",
          name: "Maria Garcia",
          email: "maria@example.com",
          phone: "987-654-3210",
          program: programId,
          registrationDate: "2023-08-22T00:00:00.000Z",
        },
        {
          _id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phone: "555-123-4567",
          program: programId,
          registrationDate: "2023-08-25T00:00:00.000Z",
        },
      ])
    } finally {
      setIsLoadingTrainees(false)
    }
  }

  // Toggle program expansion to show trainees
  const toggleProgramExpansion = (programId) => {
    if (expandedPrograms.includes(programId)) {
      setExpandedPrograms(expandedPrograms.filter((id) => id !== programId))
      setTrainees([])
    } else {
      setExpandedPrograms([...expandedPrograms, programId])
      fetchTrainees(programId)
    }
  }

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
      const response = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })

      if (response.ok) {
        const newProgram = await response.json()
        setPrograms([...programs, newProgram])
        setAddDialogOpen(false)
      } else {
        const errorData = await response.json()
        alert(`Failed to add program: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error adding program:", error)
      // For demo purposes, add locally
      const newProgram = {
        _id: Date.now().toString(),
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPrograms([...programs, newProgram])
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
      const response = await fetch(`/api/programs/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })

      if (response.ok) {
        const updatedProgram = await response.json()
        setPrograms(programs.map((program) => (program._id === editingId ? updatedProgram : program)))
        setEditingId(null)
      } else {
        const errorData = await response.json()
        alert(`Failed to update program: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error updating program:", error)
      // For demo purposes, update locally
      setPrograms(
        programs.map((program) =>
          program._id === editingId
            ? {
                ...program,
                ...data,
                start_date: new Date(data.start_date).toISOString(),
                end_date: new Date(data.end_date).toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : program,
        ),
      )
      setEditingId(null)
    }
  }

  // Handle deleting a program
  const handleDeleteProgram = async (id) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/programs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPrograms(programs.filter((program) => program._id !== id))
        // If the deleted program was expanded, remove it from expanded list
        if (expandedPrograms.includes(id)) {
          setExpandedPrograms(expandedPrograms.filter((progId) => progId !== id))
        }
      } else {
        const errorData = await response.json()
        alert(`Failed to delete program: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error deleting program:", error)
      // For demo purposes, delete locally
      setPrograms(programs.filter((program) => program._id !== id))
      // If the deleted program was expanded, remove it from expanded list
      if (expandedPrograms.includes(id)) {
        setExpandedPrograms(expandedPrograms.filter((progId) => progId !== id))
      }
    }
  }

  // Start editing a program
  const startEditing = (program) => {
    setEditingId(program._id)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null)
  }

  // Helper functions for child components
  const getCourseName = (id) => {
    const course = courses.find((c) => c._id === id)
    return course ? course.name : "Unknown Course"
  }

  const getInstitutionName = (id) => {
    const institution = institutions.find((inst) => inst._id === id)
    return institution ? institution.name : "Unknown Institution"
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Programs</h1>
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
              isEditing={editingId === program._id}
              isExpanded={expandedPrograms.includes(program._id)}
              courses={courses}
              institutions={institutions}
              trainees={trainees}
              isLoadingTrainees={isLoadingTrainees}
              getCourseName={getCourseName}
              getInstitutionName={getInstitutionName}
              onToggleExpand={() => toggleProgramExpansion(program._id)}
              onStartEditing={() => startEditing(program)}
              onCancelEditing={cancelEditing}
              onUpdateProgram={handleUpdateProgram}
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
        <ProgramModal
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