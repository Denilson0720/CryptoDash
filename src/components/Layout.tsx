import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import ResponsiveHeader from './ResponsiveHeader';
export default function Layout(){
    return(
        <div className='main-ctn'>
            {/* <Header/> */}
            {/* <ResponsiveAppBar/> */}
            <ResponsiveHeader/>
            <Outlet/>
            <Footer/>
        </div>
    )
}