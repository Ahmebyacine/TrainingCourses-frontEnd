import StatisticsCard from '@/layouts/statistics/user/StatisticsCard'
import api from '@/services/api'
import { useState, useEffect } from 'react'
import ErrorPage from '../common/ErrorPage'

export default function UserStatistics() {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/user/statistics/employee')
        setUserData(response.data)
      } catch (err) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10" dir="rtl">
        <div className="text-center">جاري تحميل إحصائيات المستخدم...</div>
      </div>
    )
  }

  if (error) return <ErrorPage error={error} />

  return (
    <div className="container mx-auto p-10">
      <div className='space-y-4'>
          <StatisticsCard 
            key={userData.user._id} 
            data={userData} 
          />
      </div>
    </div>
  )
}