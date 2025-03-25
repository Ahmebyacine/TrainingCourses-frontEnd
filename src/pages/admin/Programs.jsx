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
  const [trainers, setTrainers] = useState([])
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
        const [programsResponse, coursesResponse, institutionsResponse, trainersResponse] = await Promise.all([
          api.get("/api/program"),
          api.get("/api/course"),
          api.get("/api/institution"),
          api.get("/api/trainer"),
        ])
        setPrograms(programsResponse.data)
        setCourses(coursesResponse.data)
        setInstitutions(institutionsResponse.data)
        setTrainers(trainersResponse.data)
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
      toast.success("تمت إضافة البرنامج", {
        description: `تمت إضافة البرنامج ${response.data[0].name}`
      })
    } catch (error) {
      toast.error("لم يتم إضافة البرنامج")
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
      toast.success("تم تحديث البرنامج", {
        description: `تم تحديث البرنامج ${response.data[0].name}`
      })
    } catch (error) {
      toast.error("لم يتم تحديث البرنامج")
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
      toast.success("تم حذف البرنامج")
    } catch (error) {
      toast.error("لم يتم حذف البرنامج")
    }
  }

  // Start editing a program
  const startEditing = (program) => {
    setEditingId(program._id)
  }
  if (error) return <ErrorPage error={error} />

  return (
    <div className="container mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <h1 className="text-xl md:text-3xl font-bold text-right">البرامج التدريبية</h1>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة برنامج
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل البرامج...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد برامج متاحة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة برنامج جديد</p>
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
        trainers={trainers}
        onSubmit={handleAddProgram}
        mode="add"
      />

      {editingId && (
        <AddProgramModal
          open={!!editingId}
          onOpenChange={(open) => !open && setEditingId(null)}
          courses={courses}
          institutions={institutions}
          trainers={trainers}
          onSubmit={handleUpdateProgram}
          mode="edit"
          initialData={programs.find((p) => p._id === editingId)}
        />
      )}
    </div>
  )
}