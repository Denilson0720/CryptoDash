import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from 'react-router-dom'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = '70%';

export default function ResponsiveAppBar(props: Props) {
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

  return (
    <div className='header'>
        {/* <Box sx={{ display: 'flex' }}> */}
        {/* <CssBaseline /> */}
        <AppBar component="nav" color = 'transparent' sx = {{border:'2px solid red',color:'white'}} className='header'>
            {/* <Toolbar > */}
                {/* menu icon, only visible when mobile pixel display */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                <MenuIcon />
                </IconButton>

                {/* <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block',border:'2px solid white' } }}
                > */}
                    <h1>CryptoDash</h1>
                {/* </Typography> */}
                {/*  */}
                {/* <Box sx={{ display: { xs: 'none', sm: 'block', border:'2px solid white'} }}> */}
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
                        SEARCH
                    </NavLink>
                {/* </Box> */}
            {/* </Toolbar> */}
            

        </AppBar>
        <nav>
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            <div className='drawer'>
                <h1>stuff goes here</h1>
                <h1>stuff goes here</h1>
                <h1>stuff goes here</h1>
                <h1>stuff goes here</h1>
            </div>
                
            </Drawer>
        </nav>
        {/* </Box> */}
    </div>
  );
}
