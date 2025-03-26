import StatisticsCard from '@/layouts/statistics/program/StatisticsCard'
import api from '@/services/api'
import PdfViewer from '@/utils/PDF/PDFReport'
import { useState, useEffect } from 'react'
import ErrorPage from '../common/ErrorPage'

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
        setError(err.response?.data?.message);
      } finally {
        setLoading(false)
      }
    }

    fetchProgramData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10" dir="rtl">
        <div className="text-center">جاري تحميل إحصائيات البرنامج...</div>
      </div>
    )
  }
  
  if (error) return <ErrorPage error={error} />
  
  return (
    <div className="container mx-auto p-5 md:p-10" dir="rtl">
      {programData.length > 0 ? (
        <div className='space-y-4 text-right'>
          {programData.map((program) => (
            <StatisticsCard 
              key={program.program._id} 
              data={program} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center">لا توجد بيانات متاحة للبرنامج</div>
      )}
    </div>
  )
}