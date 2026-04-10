// app/dashboard/page.tsx
import UserDashboard from '@/components/website/dashboard/UserDashboard'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen'>
      <UserDashboard />
    </div>
  )
}

export default page
