import DashboardClient from '@/components/DashboardClient'
import HomeClient from '@/components/HomeClient'
import { getSession } from '@/lib/getSession'
import { Session } from 'inspector/promises'
import React from 'react'

const page =async() => {

  const session = await getSession()



  return (
 <>

  <DashboardClient ownerId={session?.user?.id!} />





    
 </>
  )
}

export default page
