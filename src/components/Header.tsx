import {NavLink} from 'react-router-dom'
export default function Header(){
    const activeStyles={
        textDecoration:'underline',
        color:'#244031'

    }
    return(
        <nav className='header'>
            <h1>CRYPTODASH</h1>
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

        </nav>
    )
}