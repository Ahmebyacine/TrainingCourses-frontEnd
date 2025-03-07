import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import CourseCard from "@/layouts/admin/CourseCard"
import AddCourseModal from "@/layouts/admin/AddCourseModal"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/courses")
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setCourses([
          { _id: "1", name: "Web Development", price: 1200, duree: "3 months" },
          { _id: "2", name: "Data Science", price: 1500, duree: "4 months" },
          { _id: "3", name: "UX/UI Design", price: 900, duree: "2 months" },
          { _id: "4", name: "Mobile App Development", price: 1300, duree: "3 months" },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handleAddCourse = async (data) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const newCourse = await response.json()
        setCourses([...courses, newCourse])
        setAddDialogOpen(false)
      }
    } catch (error) {
      const newCourse = { _id: Date.now().toString(), ...data }
      setCourses([...courses, newCourse])
      setAddDialogOpen(false)
    }
  }

  const handleUpdateCourse = async (data) => {
    try {
      const response = await fetch(`/api/courses/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedCourse = await response.json()
        setCourses(courses.map(course => 
          course._id === editingId ? updatedCourse : course
        ))
        setEditingId(null)
      }
    } catch (error) {
      setCourses(courses.map(course => 
        course._id === editingId ? { ...course, ...data } : course
      ))
      setEditingId(null)
    }
  }

  const handleDeleteCourse = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, { method: "DELETE" })
      setCourses(courses.filter(course => course._id !== id))
    } catch (error) {
      setCourses(courses.filter(course => course._id !== id))
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

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <AddCourseModal 
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAddCourse={handleAddCourse}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
          <p className="text-muted-foreground">Get started by adding a new course.</p>
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