import { useState, useEffect } from "react"
import { User } from "lucide-react"
import UserCard from "@/layouts/admin/UserCard"
import AddUserModal from "@/layouts/admin/AddUserModel"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

export default function Users() {
  const [users, setUsers] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [usersResponse, institutionsResponse] = await Promise.all([
          api.get("/api/user"),
          api.get("/api/institution"),
        ])
        setUsers(usersResponse.data)
        setInstitutions(institutionsResponse.data)
      } catch (error) {
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddUser = async (data) => {
    try {
      const response = await api.post("/api/user",data)
        setUsers([...users, response.data])
        setAddDialogOpen(false)
        toast.success("تمت إضافة المستخدم", {
          description: `قام المستخدم ${response.data.name} بإضافة`
        })
    } catch (error) {
      toast.error("لم تتم إضافة المستخدم")
      setAddDialogOpen(false)
    }
  }

  const handleUpdateUser = async (id, data) => {
    const updateData = { ...data }
    if (!updateData.password) delete updateData.password

    try {
      const response = await api.put(`/api/user/${id}`,updateData)
      setUsers(users.map(user => user._id === id ? response.data : user))
      setEditingId(null)
      toast.success("تم تحديث المستخدم", {
        description: `قام المستخدم ${response.data.name} بالتحديث`
      })
    } catch (error) {
      setEditingId(null)
      toast.error("لم يتم تحديث المستخدم")
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/api/user/${id}`)
      setUsers(users.filter(user => user._id !== id))
      toast.success("تم حذف المستخدم")
    } catch (error) {
      toast.error("تم حذف المستخدم")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  if (error) return <ErrorPage error={error} />

  return (
    <div className="container mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <h1 className="md:text-3xl text-xl font-bold text-right">المستخدمين</h1>
        <AddUserModal
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          institutions={institutions}
          onAddUser={handleAddUser}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المستخدمين...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد مستخدمين متاحين</h3>
          <p className="text-muted-foreground">ابدأ بإضافة مستخدم جديد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard
              key={user._id}
              user={user}
              institutions={institutions}
              editingId={editingId}
              formatDate={formatDate}
              onStartEditing={setEditingId}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          ))}
        </div>
      )}
    </div>
  )
}