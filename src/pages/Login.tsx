import { useContext,useState } from "react"
import { LoggedInContext } from "../components/Layout"
import { LoginFormDataStructure,logInError } from "../interfaces/interfaces"
import { loginUser,logOut } from "../api"
import { useNavigate,useLocation } from "react-router-dom"
export default function Login(){
    const [loginFormData,setLoginFormData] = useState<LoginFormDataStructure>({email:'',password:''}) 
    const [status,setStatus] = useState<string>('idle')
    const [error,setError] = useState<logInError|null>()
    // const {isLoggedIn,setIsLoggedIn} = useContext<boolean>(LoggedInContext)
    const loggedInContext  = useContext(LoggedInContext)
    // const {isLoggedIn,updateIsLoggedIn} = loggedInContext;
    const navigate = useNavigate()

    // location to figure out where user is coming from
    const location = useLocation()
    const from = location.state?.from||'/favorites'

    function handleChange(e:any){
        const {name,value} = e.target
        setLoginFormData(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(name,':',value)
        // console.log(loginFormData.password)
    }
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setStatus('submitting')
        // login user
        loginUser(loginFormData)
            .then(data=>{
                setError(null)
                // set localstorage itme to be id
                localStorage.setItem('userId',data[0].id)
                // navigate from here
                navigate('/favorites')
                loggedInContext?.updateIsLoggedIn(true)
                // isLoggedInState.updateIsLoggedIn(isLoggedInState.isLoggedIn)
                console.log('succesfully logged in')
            })
            .catch(err=>{
                setError(err)
                console.log(err)
                console.log('login failed')
            })
            .finally(()=>{
                setStatus('idle')
            })
    }
    return(
        <div className="home login">
            {/* <h1>Log In Page In Construction...</h1> */}
            {
                location.state?.message && 
                <h3 className='login-error'>{location.state.message}</h3>
            }
            <h2>Sign in to your account</h2>
            {  
                error?.message && 
                <h3 className="login-error">
                    {error.message}
                </h3>

            }
            
            <form className="form-ctn login" onSubmit = {handleSubmit}>
                <input 
                    type="email" 
                    placeholder = 'Email Address'
                    name = 'email'
                    value = {loginFormData.email}
                    onChange = {handleChange}
                />
                <input 
                    type="password" 
                    placeholder = 'Password'
                    name = 'password'
                    value = {loginFormData.password}
                    onChange = {handleChange}
                />
                <button 
                    disabled={status ==='submitted'}
                    >
                    {status ==='submitting'?'Logging In...':'Log In'}
                </button>
                {/* <p>{loggedInContext?.isLoggedIn?'logged in':'not logged in'}</p> */}
            </form>
            {/*
            <button onClick = {()=>console.log(loginFormData)}>Log In Creds Input</button>
            <button onClick={()=>
                {
                    console.log(loggedInContext)
                    console.log(loggedInContext?.isLoggedIn)
                    console.log(loggedInContext?.updateIsLoggedIn)
                }
            }>Click for state function and state</button>
            <button onClick={()=>{
                logOut()
                loggedInContext?.updateIsLoggedIn(false)
            }}>
                Log out
            </button>
            */}
        </div>
    )
}