import Link from 'next/link'
import React from 'react'

const OnlinteTestHead = () => {
  return (
    <div>
      <header className="bg-white container mx-auto rounded-md border-b p-4 sticky top-0 z-10 shadow-sm">
          
          {/* Top Row */}
          <div className="flex items-center justify-between px-4">
            
            {/* Left Side */}
            <div>
              <div className="text-lg font-medium">
                Manage Online Test
              </div>

              {/* Steps */}
              <div className="flex items-center gap-4 mt-2 text-sm">
                
                {/* Step 1 */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-600 text-white text-xs">
                    1
                  </div>
                  <span className="text-purple-600 font-medium">
                    Basic Info
                  </span>
                </div>

                {/* Line */}
                <div className="w-16 h-[2px] bg-gray-300"></div>

                {/* Step 2 */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-white text-xs">
                    2
                  </div>
                  <span className="text-gray-500">
                    Questions
                  </span>
                </div>

              </div>
            </div>

            {/* Right Side */}
            <Link href="/admin/dashboard">
            <button className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
              Back to Dashboard
            </button>
            </Link>


          </div>
        </header>
    </div>
  )
}

export default OnlinteTestHead
