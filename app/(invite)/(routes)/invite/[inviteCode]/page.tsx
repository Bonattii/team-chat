import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

interface InviteCodePageProps {
  params: {
    inviteCode: string
  }
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile()

  // Check if the user is signed in
  if (!profile) {
    return redirectToSignIn()
  }

  // Check if the invite code exists
  if (!params.inviteCode) {
    return redirect('/')
  }

  // Check if the user already is part of the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: { some: { profileId: profile.id } }
    }
  })

  // If the user already is part of the server
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  // Add the user to the server
  const server = await db.server.update({
    where: { inviteCode: params.inviteCode },
    data: {
      members: {
        create: [{ profileId: profile.id }]
      }
    }
  })

  // Redirect to the server
  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null
}

export default InviteCodePage
