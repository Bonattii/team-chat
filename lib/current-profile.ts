import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

export const currentProfile = async () => {
  // Verify that the user is authenticated
  const { userId } = auth()

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
