import Button from "@/components/ui/Button"
import { authOptions } from "@/lib/auth"
import { getServerSession } from 'next-auth'

async function page() {

  const session = await getServerSession(authOptions)

  if (!session) {
    // Render different HTML when there is no login session
    return (
      <div>
        <p>You are not logged in.</p>
        <Button>Login</Button>
      </div>
    )
  }

  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default page