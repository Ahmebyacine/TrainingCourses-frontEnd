import { useState, useEffect } from "react"
import { SuccessComponent } from "@/layouts/employee/SuccessComponent"
import { AddTraineeCard } from "@/layouts/employee/AddTraineeCard"
import api from "@/services/api"
import { toast } from "sonner"
import ErrorPage from "../common/ErrorPage"

// Define the form schema with validation


export default function AddTrainee() {
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const [trainee, setTrainee] = useState({})
  // Fetch programs and employees data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const programsResponse = await api.get("/api/program/employee")
        setPrograms(programsResponse.data)
      } catch (error) {
        setError(err.response?.data?.message);
      }
    }
    fetchData()
  }, [])
  
  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
        const response = await api.post("/api/trainee",data)
        setTrainee(response.data)
        setSuccess(true)
        toast.success("تمت إضافة متدرب", {
          description: `لقد أضاف المتدرب ${response.data.name}`
        })
    } catch (error) {
      toast.error("لم تتم إضافة المتدرب")
    } finally {
      setIsLoading(false)
    }
  }
  const handleReset = () => {
    setSuccess(false)
  }

  if (error) return <ErrorPage error={error} />
  return (
    <>
      {success ? (
        <SuccessComponent onReset={handleReset} trainee={trainee} />
      ) : (
        <AddTraineeCard
          programs={programs}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  )
}