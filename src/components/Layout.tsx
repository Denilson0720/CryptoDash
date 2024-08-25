import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
export default function Layout(){
    const [position, setPosition] = React.useState({ x: 50, y: 50 });

    const handleMouseMove = (e:any) => {
        const posX = (e.clientX / window.innerWidth) * 100;
        const posY = (e.clientY / window.innerHeight) * 100;
        setPosition({ x: posX, y: posY });
    };
    return(
        <div className='main-ctn'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}