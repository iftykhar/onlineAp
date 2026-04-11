//app/admin/dashboard/page.tsx
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-[calc(100vh-140px)] bg-gray-50'>
      <AdminDashboard />
    </div>
  )
}

export default page
