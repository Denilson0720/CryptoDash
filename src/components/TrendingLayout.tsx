import { Outlet,NavLink } from "react-router-dom"
export default function TrendingLayout(){
    return(
        <>
            {/* <p>Coins | NFTS</p> */}
            {/* Trending Coins and Trending NFTS render from Outlet */}
            <NavLink 
                to="trending/coins"
                end
            ><h3>COINS</h3>  
            </NavLink>

            <NavLink 
                to="trending/nfts"
            ><h3>NFTS</h3>
            </NavLink>
            <NavLink to="cats">Cats</NavLink>
            <Outlet/>
        </>
    )
}