"use client"
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { logOut } from '@/services/auth/logOut'

const LogoutButton = () => {

  const handleLogout = async () => {
    await logOut()
  }
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>

      <Button onClick={() => toast.success("data is added here")}>Click me</Button>

    </div>
  )
}

export default LogoutButton