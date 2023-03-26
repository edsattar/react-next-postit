import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { UserPosts } from "../components/UserPosts"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }
  return (
    <main>
      <h1 className="test-2xl font-bold">Welcome back {session?.user?.name} </h1>
      <UserPosts/>
    </main>
  )
}