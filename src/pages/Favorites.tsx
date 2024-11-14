// will be navigated to via '/user' route
import { useEffect,useState } from "react"
import { getUserData,getCoinsList} from "../api"
import {error,CoinFromList} from '../interfaces/interfaces'
import FavoriteCoinCard from '../components/FavoriteCoinCard'
import BestCoin from "../components/BestCoin"
export default function Favorites(){
    const user = localStorage.getItem('userId')
    const [favoriteIDs,setFavoriteIDs] = useState<string[]>([])
    // const [coinData,setCoinData] = useState<{}[]>([])
    // const [testCoin,setTestCoin] = useState<any>()
    const [coinsList,setCoinsList] = useState<CoinFromList[]>([])

    const name = (name:string|null)=>{
        if(name){
            const first_letter = name.charAt(0).toUpperCase()
            const capitalized = first_letter + name.slice(1)
            return capitalized
        }
        else{
            return 'User'
        }
      
    }
    const loadCoinsList = async ()=>{
        try{
            // unless we add await,itll return a promise and itll be 
            // an error as its expecting another return structure
            const data = await getCoinsList()
            if(data){
                setCoinsList(data)
                console.log(data)
            }else{
                throw new Error('error retrieving list of coin data')
            }
        }
        catch(error){
            console.log(error)
        }

    }
    const loadUserData=()=>{
        // const userData = getUserData(user)
        // console.log(userData)
        getUserData(user)
            .then(async(data)=>{
                if(data){
                    console.log(data)
                    //Note: state setting is batched and queued, not instant
                    // due to state setting not being synchronous, is only queued the state is not updated in time
                    // instead ill pass in data.favorites into loadData directly
                    // this avoids referring to a state that is yet to be updated
                    setFavoriteIDs(data.favorites)
                    // await loadFakeData(data.favorites)
                    // await loadCoinData(data.favorites)
                    console.log('called fake data load')

                }
            })
            .catch((error:error)=>{
                console.log(error)
            })
        console.log('success user from func')
        // setFavoriteIDs(userData.favorite)
    }
//    array with data only from favorited coins, found through id filtering
   const favoriteCoinData = coinsList?.filter((coin:CoinFromList)=>{
        return favoriteIDs.includes(coin.id)
   })
   const favoriteCoinElements = favoriteCoinData?(
        favoriteCoinData.map((coin,index)=> (
            <FavoriteCoinCard
                data = {coin}
                key = {index}
            />
        ) )
    ):null
    useEffect(()=>{
        loadUserData()
        loadCoinsList()
        
    },[])
    return(
        
        <div className='home favorites'>
            <div className="user-welcome">
                <h1>Welcome {name(user)}...</h1>
                {/* <h3>Check out your favorite coins</h3> */}
            </div>
            <div className="favorite-coins-ctn">
                <h3 className="favorite-title">Check out your favorite coins</h3>
                    <div className="favorite-coins-labels">
                        <p>Symbol</p>
                        <p>ID</p>
                        <p>Price</p>
                        <p>24hr High</p>
                        <p>Price Change</p>
                    </div>
                    <div className="favorite-coins">
                        {favoriteCoinElements}
                    </div>
                <h3 className="best-coin-title">Your best coin:</h3>
                {/* <h3 className="metric">Look at your best coins based on the following metrics</h3> */}
                {/* best coin will be given based off highest 
                    price change,
                    market cap,
                    total circulation,
                    total supply
                 */}

                <div className = 'best-coin-ctn'>
                    <BestCoin
                        fav_coins={favoriteCoinData}
                    />
                </div>
            </div>
        </div>
    )
}