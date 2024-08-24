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
        <div className='main-ctn spotlight-tracker'
        // onMouseMove={handleMouseMove}
        // style={{
        // backgroundImage: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(161,188,137, 1) 00%, rgba(148,192,123, 0.5) 60%)`,
        // }}
        >
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}