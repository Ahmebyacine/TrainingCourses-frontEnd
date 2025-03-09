import StatisticsCard from '@/layouts/statistics/user/StatisticsCard'
import api from '@/services/api'
import { useState, useEffect } from 'react'

export default function UserStatistics() {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/user/statistics/employee')
        setUserData(response.data)
        console.log(response.data)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading User statistics...</div>
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
      <div className='space-y-4'>
          <StatisticsCard 
            key={userData.user.id} 
            data={userData} 
          />
      </div>
    </div>
  )
}