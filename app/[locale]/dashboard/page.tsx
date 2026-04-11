// app/dashboard/page.tsx
import UserDashboard from '@/components/website/dashboard/UserDashboard'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-[calc(100vh-140px)] bg-gray-50'>
      <UserDashboard />
    </div>
  )
}

export default page
