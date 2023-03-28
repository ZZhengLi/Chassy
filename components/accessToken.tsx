// TODO do we use this file?
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data } = useSession()
  // @ts-ignore
  const { accessToken } = data

  return <div>Access Token: {accessToken}</div>
}