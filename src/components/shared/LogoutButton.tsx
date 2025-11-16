"use client"
import { Button } from '../ui/button'
import { logOut } from '@/services/auth/logOut'

const LogoutButton = () => {

  const handleLogout = async()=>{
     await logOut()
  }
  return (
  <Button  onClick={handleLogout}>Logout</Button>
)
}

export default LogoutButton