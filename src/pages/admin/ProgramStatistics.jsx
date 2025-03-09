import StatisticsCard from '@/layouts/statistics/program/StatisticsCard'
import api from '@/services/api'
import { useState, useEffect } from 'react'

export default function ProgramStatistics() {
  const [programData, setProgramData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await api.get('/api/program/statistics/all')
        setProgramData(response.data.statistics)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProgramData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading program statistics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-10">
      {programData.length > 0 ? (
           <div className='space-y-4'>
             {programData.map((program) => (
               <StatisticsCard 
                 key={program.program._id} 
                 data={program} 
               />
             ))}
           </div>
         ) : (
           <div className="text-center">No program data available</div>
         )}
    </div>
  )
}