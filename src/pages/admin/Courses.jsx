import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import CourseCard from "@/layouts/admin/CourseCard"
import AddCourseModal from "@/layouts/admin/AddCourseModal"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)


  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/course")
        setCourses(response.data)
      } catch (error) {
        console.log(error)
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handleAddCourse = async (data) => {
    try {
      const response = await api.post("/api/course", data)
      setCourses([...courses, response.data])
      setAddDialogOpen(false)
      toast.success("تمت إضافة الدورة", {
        description: `تمت إضافة الدورة ${response.data.name}`
      })
    } catch (error) {
      toast.error("لم تتم إضافة الدورة")
      setAddDialogOpen(false)
    }
  }

  const handleUpdateCourse = async (data) => {
    try {
      const response = await api.put(`/api/course/${editingId}`,data)
      setCourses(courses.map(course => 
        course._id === editingId ? response.data : course
      ))
      setEditingId(null)
      toast.success("تم تحديث الدورة", {
        description: `تم تحديث الدورة ${response.data.name}`
      })
    } catch (error) {
      toast.error("لم يتم تحديث الدورة")
      setEditingId(null)
    }
  }

  const handleDeleteCourse = async (id) => {
    try {
      await api.delete(`/api/course/${id}`)
      setCourses(courses.filter(course => course._id !== id))
      toast.success("تم حذف الدورة")
    } catch (error) {
      toast.error("لم يتم حذف الدورة")
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "dzd",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }
  if (error) return <ErrorPage error={error} />
  return (
    <div className="container mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <h1 className="md:text-3xl text-xl font-bold text-right">الدورات التدريبية</h1>
        <AddCourseModal 
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAddCourse={handleAddCourse}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل الدورات...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد دورات متاحة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة دورة جديدة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              editingId={editingId}
              formatPrice={formatPrice}
              onStartEditing={setEditingId}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          ))}
        </div>
      )}
    </div>
 )
}