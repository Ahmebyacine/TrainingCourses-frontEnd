import { useState, useEffect } from "react"
import { Building2 } from "lucide-react"
import InstitutionCard from "@/layouts/admin/InstitutionCard"
import AddInstitutionModal from "@/layouts/admin/AddInstitutionModal"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

export default function Institutions() {
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchInstitutions = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/institution")
        setInstitutions(response.data)
      } catch (error) {
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false)
      }
    }
    fetchInstitutions()
  }, [])

  const handleAddInstitution = async (data) => {
    try {
      const response = await api.post('/api/institution', data);
      setAddDialogOpen(false)
      setInstitutions([...institutions, response.data])
      toast.success("Institution has been Added", {
        description: `the Institution ${response.data.name} has Added`
      })
    } catch (error) {
      toast.error("Institution has Not been Added")
      setAddDialogOpen(false)
    }
  }

  const handleUpdateInstitution = async (data) => {
    try {
      const response = await api.put(`/api/institution/${editingId}`,data)
      const updatedInstitution = response.data;
      setInstitutions(institutions.map(inst => 
        inst._id === editingId ? updatedInstitution : inst
      ))
      setEditingId(null)
      toast.success("Institution has been Updated", {
        description: `the Institution ${response.data.name} has Updated`
      })
    } catch (error) {
      setInstitutions(institutions.map(inst => 
        inst._id === editingId ? { ...inst, ...data } : inst
      ))
      setEditingId(null)
      toast.error("Institution has Not been Updated")
    }
  }

  const handleDeleteInstitution = async (id) => {
    try {
      await api.delete(`/api/institution/${id}`,)
      setInstitutions(institutions.filter(inst => inst._id !== id))
      toast.success("Institution has been Deleted", {
        description: `the Institution ${response.data.name} has Deleted`
      })
    } catch (error) {
      toast.error("Institution has Not been Deleted")
    }
  }


  if (error) return <ErrorPage error={error} />

  return (
    <div className="w-full mx-auto py-8 px-5 md:px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl text-xl font-bold">Institutions</h1>
        <AddInstitutionModal 
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAddInstitution={handleAddInstitution}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading institutions...</p>
        </div>
      ) : institutions.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No institutions found</h3>
          <p className="text-muted-foreground">Get started by adding a new institution.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map(institution => (
            <InstitutionCard
              key={institution._id}
              institution={institution}
              editingId={editingId}
              onStartEditing={setEditingId}
              onUpdateInstitution={handleUpdateInstitution}
              onDeleteInstitution={handleDeleteInstitution}
            />
          ))}
        </div>
      )}
    </div>
  )
}