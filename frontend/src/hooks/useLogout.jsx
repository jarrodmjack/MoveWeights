import { useRouter } from "next/router"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const router = useRouter()


    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem('user')

        // dispatch logout to auth context
        dispatch({type: 'LOGOUT'})
        router.push('/login')
    }

    return { logout }

}