//component responsivle for restricting user routes and components
import {Outlet,Navigate,useLocation} from 'react-router-dom'
export default function AuthGuard(){
    const isLoggedIn  = localStorage.getItem('userId')
    const location = useLocation()
    if(!isLoggedIn){
        return(
            <Navigate
                to='/login'
                state={{
                    message:'You must log in first!',
                    from:location.pathname
                }}
                replace
            />
        )
    }
    // if logged in continue with outlet,nested routes
    return <Outlet/>
}