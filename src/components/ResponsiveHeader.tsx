import {NavLink,Link} from 'react-router-dom'
import * as React from 'react'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }
  
export default function ResponsiveAppBar(props:Props){
    const drawerWidth = '50%'
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  
    const container = window !== undefined ? () => window().document.body : undefined;
    const activeStyles={
      textDecoration:'underline',
      color:'#244031'
  
    }
  
    return(
        <div className="header">
            <h1> <Link className='title' to={'/'} key = {1}>CRYPTODASH</Link></h1>
             {/* <h1>CryptoDash</h1> */}
            <NavLink 
                to='/'
                style={({isActive})=>isActive?activeStyles:undefined}
            >
                HOME
            </NavLink>
            <NavLink 
                to='/coins'
                style={({isActive})=>isActive?activeStyles:undefined}
            >
                COINS</NavLink>
            {/* // change search to magnifying glass icon */}
            <NavLink 
                to='/nfts'
                style={({isActive})=>isActive?activeStyles:undefined}
            >
                NFTS</NavLink>
            <NavLink 
                to='/search'
                style={({isActive})=>isActive?activeStyles:undefined}
            >
            SEARCH</NavLink>

            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                //  after sm--600px
                // deleted media query
                sx={{ mr: 2,  }}
                className='menu-icon'
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    // after 600px
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
            <div className='drawer'>
                <h1>CryptoDash</h1>
            <NavLink 
                to='/'
                style={({isActive})=>isActive?activeStyles:undefined}
                // dont make an anonymous function on every render, run func directly
                // onClick = {()=>handleDrawerToggle}
                onClick = {handleDrawerToggle}
            >
                HOME
            </NavLink>
            <NavLink 
                to='/coins'
                style={({isActive})=>isActive?activeStyles:undefined}
                onClick = {handleDrawerToggle}
            >
                COINS</NavLink>
            {/* // change search to magnifying glass icon */}
            <NavLink 
                to='/nfts'
                style={({isActive})=>isActive?activeStyles:undefined}
                onClick = {handleDrawerToggle}
            >
                NFTS</NavLink>
            <NavLink 
                to='/search'
                style={({isActive})=>isActive?activeStyles:undefined}
                onClick = {handleDrawerToggle}
            >
            SEARCH</NavLink>
            </div>
                
            </Drawer>
        </div>
    )
}