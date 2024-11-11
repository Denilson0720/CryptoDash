import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import ResponsiveHeader from './ResponsiveHeader';
import { createContext,useState } from 'react';

// context to be used by children components
// interface LoggedInContextStructure{
//     isLoggedIn:boolean;
//     setItLoggedIn:any
// }
interface LoggedInContextStructure {
    isLoggedIn: boolean;
    // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    updateIsLoggedIn:(isLoggedIn:boolean)=>(void);
  }
const LoggedInContext = createContext<LoggedInContextStructure|null>(null);
// const LoggedInContext = createContext<any>();

export default function Layout(){
    // loggedIn state that is based off a users local storage item called 'userId'
    // const [isLoggedIn,setIsLoggedIn] = useState<boolean>(localStorage.getItem('userId')?true:false)
    // const [isLoggedInState,setIsLoggedIn] = useState<LoggedInContextStructure>({
    //     isLoggedIn:localStorage.getItem('userId')?true:false,
    //     updateIsLoggedIn:(isLoggedIn:boolean)=>setIsLoggedIn((prevState) => ({
    //         ...prevState,
    //         isLoggedIn
    //     }))
    // })
    const [isLoggedInState, setIsLoggedIn] = useState<LoggedInContextStructure>({
        isLoggedIn: localStorage.getItem('userId') ? true : false,
        updateIsLoggedIn: (isLoggedIn: boolean) => setIsLoggedIn((prevState) => ({
            ...prevState,
            isLoggedIn
        }))
    });

    return(
        <LoggedInContext.Provider value = {isLoggedInState}>
             <div className='main-ctn'>
                <ResponsiveHeader/>
                <Outlet/>
                <Footer/>
            </div>
        </LoggedInContext.Provider>
       
    )
}
export {LoggedInContext}