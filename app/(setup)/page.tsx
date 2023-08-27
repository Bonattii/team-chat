import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'

const SetupPage = async () => {
  const profile = await initialProfile()

  // Try to find the first server that the user is a member of
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  // Redirect to the server
  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <div>Create a Server</div>
}

export default SetupPage
