import { useState, useEffect } from "react"
import { Building2 } from "lucide-react"
import InstitutionCard from "@/layouts/admin/InstitutionCard"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

export default function InstitutionsManager() {
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const fetchInstitutions = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/institution/user")
        setInstitutions(response.data)
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false)
      }
    }
    fetchInstitutions()
  }, [])


  const handleUpdateInstitution = async (data) => {
    try {
      const response = await api.put(`/api/institution/${editingId}`,data)
      const updatedInstitution = response.data;
      setInstitutions(institutions.map(inst => 
        inst._id === editingId ? updatedInstitution : inst
      ))
      setEditingId(null)
      toast.success("تم تحديث المؤسسة", {
        description: `قامت المؤسسة ${response.data.name} بالتحديث`
      })
    } catch {
      setInstitutions(institutions.map(inst => 
        inst._id === editingId ? { ...inst, ...data } : inst
      ))
      setEditingId(null)
      toast.error("لم يتم تحديث المؤسسة")
    }
  }


  if (error) return <ErrorPage error={error} />

  return (
    <div className="w-full mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex mb-6 flex-row">
        <h1 className="md:text-3xl text-xl font-bold text-right">المؤسسات</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المؤسسات...</p>
        </div>
      ) : institutions.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد مؤسسات متاحة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة مؤسسة جديدة</p>
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
              isManager
            />
          ))}
        </div>
      )}
    </div>
 )
}