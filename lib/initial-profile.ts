import { currentUser, redirectToSignIn } from '@clerk/nextjs'

import { db } from '@/lib/db'

export const initialProfile = async () => {
  // Try to get user information
  const user = await currentUser()

  // If no user -> redirect to sign in
  if (!user) {
    return redirectToSignIn()
  }

  // Try to get the profile of the user
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  })

  // If profile is found return it
  if (profile) {
    return profile
  }

  // Create a new profile for the user
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile
}
