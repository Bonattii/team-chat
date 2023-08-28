import { NextApiRequest } from 'next'
import { getAuth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

export const currentProfilePages = async (req: NextApiRequest) => {
  // Verify that the user is authenticated
  const { userId } = getAuth(req)

  // If no user -> return null
  if (!userId) {
    return null
  }

  // Try to get the profile of the user
  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  })

  return profile
}
