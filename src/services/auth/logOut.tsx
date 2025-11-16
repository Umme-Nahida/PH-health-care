
import { deleteCookie } from './tokenHandler'
import { redirect } from 'next/navigation'

export const logOut = async() => {
    // Clear user session data
   await deleteCookie('accessToken')
   await deleteCookie('refreshToken')

    redirect('/login?loggedOut=true')
}

