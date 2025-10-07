import { useState, useEffect } from "react"
import { Coins } from "lucide-react"
import api from "@/services/api"
import ErrorPage from "../common/ErrorPage"
import ProgramExpensesCard from "@/layouts/employee/ProgramExpensesCard"

export default function Expenses() {
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPrograms = async () => {
    try {
      const programsResponse = await api.get("/api/program/employee");
      setPrograms(programsResponse.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchPrograms()
  }, [])


  if (error) return <ErrorPage error={error} />

  return (
    <div className="w-full mx-auto py-8 px-5 md:px-10">
      <div className="flex justify-end items-center mb-6 flex-row-reverse">
        <h1 className="md:text-3xl text-xl font-bold text-right">البرامج</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المصاريف...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Coins className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا توجد مصاريف مسجلة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة مصاريف جديدة</p>
        </div>
      ) : (
        <div className="w-full space-y-6">
          {programs.map(program => (
            <ProgramExpensesCard
              key={programs._id}
              program={program}
            />
          ))}
        </div>
      )}
    </div>
  )
}