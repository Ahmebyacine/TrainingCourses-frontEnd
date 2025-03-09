import { useState, useEffect } from "react"
import { SuccessComponent } from "@/layouts/employee/SuccessComponent"
import { AddTraineeCard } from "@/layouts/employee/AddTraineeCard"
import api from "@/services/api"

// Define the form schema with validation


export default function AddTrainee() {
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [trainee, setTrainee] = useState({})
  // Fetch programs and employees data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const programsResponse = await api.get("/api/program/employee")
        setPrograms(programsResponse.data)
      } catch (error) {
        console.error("Error fetching programs data:", error)
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
        console.log(response.data)
        setTrainee(response.data)
        setSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleReset = () => {
    setSuccess(false)
  }

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