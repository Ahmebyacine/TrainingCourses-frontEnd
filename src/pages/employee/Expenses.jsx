import { useState, useEffect } from "react"
import { Coins } from "lucide-react"
import ExpenseCard from "@/layouts/employee/ExpenseCard"
import AddExpenseModal from "@/layouts/employee/AddExpenseModal"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/expense")
        setExpenses(response.data)
      } catch (err) {
        setError(err.response?.data?.message)
      } finally {
        setIsLoading(false)
      }
    }
    const fetchData = async () => {
      try {
        const programsResponse = await api.get("/api/program/employee")
        setPrograms(programsResponse.data)
      } catch (error) {
        setError(err.response?.data?.message);
      }
    }
    fetchData()
    fetchExpenses()
  }, [])

  const handleAddExpense = async (data) => {
    try {
      const response = await api.post('/api/expense', {
        ...data
      })
      setAddDialogOpen(false)
      setExpenses([...expenses, response.data])
      toast.success("تمت إضافة المصاريف", {
        description: `تمت إضافة المصاريف "${response.data.title}"`
      })
    } catch (error) {
      toast.error("لم تتم إضافة المصاريف")
      setAddDialogOpen(false)
    }
  }

  const handleUpdateExpense = async (data) => {
    try {
      const response = await api.put(`/api/expense/${editingId}`, data)
      const updatedExpense = response.data
      setExpenses(expenses.map(e => 
        e._id === editingId ? updatedExpense : e
      ))
      setEditingId(null)
      toast.success("تم تحديث المصاريف", {
        description: `تم تحديث المصاريف "${response.data.title}"`
      })
    } catch (error) {
      setExpenses(expenses.map(e => 
        e._id === editingId ? { ...e, ...data } : e
      ))
      setEditingId(null)
      toast.error("لم يتم تحديث المصاريف")
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/api/expense/${id}`)
      setExpenses(expenses.filter(e => e._id !== id))
      toast.success("تم حذف المصاريف", {
        description: "تمت إزالة المصاريف بنجاح"
      })
    } catch (error) {
      toast.error("لم يتم حذف المصاريف")
      console.error(error)
    }
  }

  if (error) return <ErrorPage error={error} />

  return (
    <div className="w-full mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <h1 className="md:text-3xl text-xl font-bold text-right">المصاريف</h1>
        <AddExpenseModal 
          open={addDialogOpen}
          programs={programs}
          onOpenChange={setAddDialogOpen}
          onAddExpense={handleAddExpense}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المصاريف...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Coins className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد مصاريف مسجلة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة مصاريف جديدة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map(expense => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              programs={programs}
              editingId={editingId}
              onStartEditing={setEditingId}
              onUpdateExpense={handleUpdateExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          ))}
        </div>
      )}
    </div>
  )
}