import { useState, useEffect } from "react"
import { Building2 } from "lucide-react"
import InstitutionCard from "@/layouts/admin/InstitutionCard"
import AddInstitutionModal from "@/layouts/admin/AddInstitutionModal"

export default function Institutions() {
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchInstitutions = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/institutions")
        const data = await response.json()
        setInstitutions(data)
      } catch (error) {
        console.error("Error fetching institutions:", error)
        setInstitutions([
          { _id: "1", name: "City University", address: "123 Main St, City", phone: "123-456-7890" },
          { _id: "2", name: "Tech Institute", address: "456 Tech Blvd, Town", phone: "987-654-3210" },
          { _id: "3", name: "Business School", address: "789 Commerce Ave, Metro", phone: "555-123-4567" },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchInstitutions()
  }, [])

  const handleAddInstitution = async (data) => {
    try {
      const response = await fetch("/api/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const newInstitution = await response.json()
        setInstitutions([...institutions, newInstitution])
        setAddDialogOpen(false)
      }
    } catch (error) {
      const newInstitution = { _id: Date.now().toString(), ...data }
      setInstitutions([...institutions, newInstitution])
      setAddDialogOpen(false)
    }
  }

  const handleUpdateInstitution = async (data) => {
    try {
      const response = await fetch(`/api/institutions/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedInstitution = await response.json()
        setInstitutions(institutions.map(inst => 
          inst._id === editingId ? updatedInstitution : inst
        ))
        setEditingId(null)
      }
    } catch (error) {
      setInstitutions(institutions.map(inst => 
        inst._id === editingId ? { ...inst, ...data } : inst
      ))
      setEditingId(null)
    }
  }

  const handleDeleteInstitution = async (id) => {
    try {
      await fetch(`/api/institutions/${id}`, { method: "DELETE" })
      setInstitutions(institutions.filter(inst => inst._id !== id))
    } catch (error) {
      setInstitutions(institutions.filter(inst => inst._id !== id))
    }
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Institutions</h1>
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