import { CoinFromList } from "../interfaces/interfaces"
import {useState,useEffect} from 'react'
import SparklineGraph from "./SparklineGraph"
import {Tooltip} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// pass in favoriteCoinData from Favorites.tsx
export default function BestCoin({fav_coins}:{fav_coins:CoinFromList[]}){
    // user will be able to select what "best" coin they want
    // dependent on price change, market cap, total circulation vs total supply
    // price_change
    // market_cap_change
    // highest_circ_supply_ratio
    // lowest_circ_supply_ratio
   
    const selectedStyle = {
        color:'black',
        borderBottom:'solid 2px black',
        transition:'0.2s'
    }
    const best_by_price_change = ()=>{
        let max = 0
        for(let i = 0;i<fav_coins.length;i++){
            if(fav_coins[i].price_change_percentage_24h>fav_coins[max].price_change_percentage_24h){
                // console.log(`${fav_coins[i].price_change_percentage_24h} from ${fav_coins[i].name} is greater than ${fav_coins[max].price_change_percentage_24h} from ${fav_coins[max].name}`)
                max = i
            }
        }
        // console.log('best price change coin is: ', fav_coins[max])
        return fav_coins[max]
    }
    // lazy rendering
    const [coin,setCoin] = useState<CoinFromList>()
    const [userSelect,setUserSelect] = useState<string>('best coin by price change')
    //dependent on userSelect state, conditionally returns correct summary for user depdening on the coin they chose
    const userSelectionSummary = ()=>{
        let summary =''
        userSelect=='best coin by price change'?summary='displaying the coin with the best performance of price increase within the last 24 hours.':null
        userSelect=='best coin by market cap change'?summary='displaying the coin with the best performance of market cap increase within the last 24 hours.':null
        userSelect=='highest circulating/supply ratio'?summary='displaying the coin whose current circulating supply is closest to its total expected supply. Typical signs of a mature coin who wont have in exponentially large new amount of mined coins in the future.':null
        userSelect=='lowest circulating/supply ratio'?summary = 'displaying the coin whose current circulating supply is farthest from its total expected supply.  Typical signs of a newer coin who is expected to have many new coins mined in the future.':null
        return summary
    }
    const best_by_market_cap_change = ()=>{
        let max = 0
        for(let i = 0;i<fav_coins.length;i++){
            if(fav_coins[i].market_cap_change_percentage_24h>fav_coins[max].market_cap_change_percentage_24h){
                // console.log(`${fav_coins[i].price_change_percentage_24h} from ${fav_coins[i].name} is greater than ${fav_coins[max].price_change_percentage_24h} from ${fav_coins[max].name}`)
                max = i
            }
        }
        // console.log('best market cap cahnge coin is: ', fav_coins[max])
        return fav_coins[max]
    }
    // circulating supply ratio = (circulating supply / total supply) x 100
    const highest_circ_supply_ratio = ()=>{
        let max_ratio = 0
        let max_ratio_coin_index = 0
        for (let i = 0;i<fav_coins.length;i++){
            let curr_coin = fav_coins[i]
            let ratio = (curr_coin.circulating_supply/curr_coin.total_supply)*100
            if (ratio>max_ratio){
                max_ratio = ratio
                // max_ratio_coin_index = fav_coins[i]
                max_ratio_coin_index = i
            }
            // if(fav_coins[])
        }
        // console.log('highest ratio coin is: ', fav_coins[max_ratio_coin_index])
        // return max_ratio_coin
        return fav_coins[max_ratio_coin_index]

    }
    const lowest_circ_supply_ratio = ()=>{
        let min_ratio = 100000
        let min_ratio_coin_index = 0
        for (let i = 0;i<fav_coins.length;i++){
            let curr_coin = fav_coins[i]
            let ratio = (curr_coin.circulating_supply/curr_coin.total_supply)*100
            if (ratio<min_ratio){
                min_ratio = ratio
                min_ratio_coin_index = i
            }
            // if(fav_coins[])
        }
        // console.log('lowest ratio coin is:', fav_coins[min_ratio_coin_index])
        return fav_coins[min_ratio_coin_index]
    }
    const handleSelection =(event:SelectChangeEvent)=>{
        const userSelection = event?.target.value;
        setUserSelect(userSelection)
        // console.log(userSelection)
        // setCoin(highest_circ_supply_ratio())
        userSelection=='best coin by price change'?setCoin(best_by_price_change()):null;
        userSelection=='best coin by market cap change'?setCoin(best_by_market_cap_change()):null;
        userSelection=='highest circulating/supply ratio'?setCoin(highest_circ_supply_ratio()):null;
        userSelection=='lowest circulating/supply ratio'?setCoin(lowest_circ_supply_ratio()):null;
    }

    useEffect(()=>{
        const updateCoin = ()=>{
            const best_coin = best_by_price_change()
            console.log('default coin is:', best_coin)
            setCoin(best_coin)
            setUserSelect('best coin by price change')
        }
        updateCoin()
    //selected coin is set to default value of best_by_price_change
    //because the component can mount before the compoenent receives the data fav_coins,
    // we will update the state of the selected coin as the fav_coins list updates too
    },[fav_coins])
    return(
        <div className="best-coin">
            <div className="best-coin-selection-ctn">
                <h3 className="metric">Look at your best coins based on the following metrics:</h3>
                {/* <select name="coin" onChange ={(event)=>handleSelection(event)}>
                    <option value='best coin by price change'>best price change</option>
                    <option value='best coin by market cap change'>best market cap change</option>
                    <option value='highest circulating/supply ratio'>highest circulating/supply ratio</option>
                    <option value='lowest circulating/supply ratio'>lowest circulating/supply ratio</option>
                </select> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSelect}
                    label="Age"
                    onChange={handleSelection}
                    className="selection"
                    sx={{
                        bgcolor:'#305642 !important',
                        color:'pink',
                        '& .MuiSelect-icon':{
                            color:'black imporant'
                        }

                    }}
                    >
                    <MenuItem 
                        sx={{bgcolor:'#305642 !important',color:'black',border:'2px solid red'}}
                        value={'best coin by price change'}>best price change</MenuItem>
                    <MenuItem value={'best coin by market cap change'}>best market cap change</MenuItem>
                    <MenuItem value={'highest circulating/supply ratio'}>highest circulating/supply ratio</MenuItem>
                    <MenuItem value={'lowest circulating/supply ratio'}>lowest circulating/supply ratio</MenuItem>
                </Select>

            </div>
            {/* <h1>coin is {selectedCoin()}</h1> */}

             {/* <button onClick = {()=>console.log(best_by_price_change())}>best price change</button> */}
            {/* <button onClick = {()=>console.log(highest_circ_supply_ratio())}>highest ratio</button> */}
            {/* <button onClick = {()=>console.log(best_by_market_cap_change())}>market cap change</button> */}
            {/* <button onClick = {()=>console.log(lowest_circ_supply_ratio())}>min ratio</button> */}
            {/* <button onClick = {()=>console.log(coin)}>current coin selection</button>  */}
            {/* <p>best by price change: {best_by_price_change()?.name}</p> */}
            {/* <p>best by circulating/supply ratio: {highest_circ_supply_ratio()?.name}</p> */}
            {/* <p>best by lowest circulating/supply ratio: {lowest_circ_supply_ratio()?.name}</p> */}
            {/* <p>best by market cap change: {best_by_market_cap_change()?.name}</p> */}
            {/* {coin?.name} */}
            <div className = 'coin'>
                <div className="left">
                    {/* run function that conditional renders h2 with title best price change coin...*/}
                     <h4 className='user-selection-summary'>{userSelect}
                         <Tooltip title = {userSelectionSummary()}>
                            <InfoIcon fontSize="small"/>
                        </Tooltip>

                     </h4>
           

                    <img src={coin?.image} alt="" />
                    <h3>{coin?.name}</h3>
                    <p>id: <span className='data'>{coin?.id}</span></p>
                    {/* <p><span className='data'>{coin?.name}</span></p> */}
                    <p>price: <span className='data'>${coin?.current_price}</span></p>
                    <p>circulating supply: <span className='data'>{coin?.circulating_supply}</span></p>
                    <p>total supply: <span className='data'>{coin?.total_supply}</span></p>
                    <p>market cap: <span className='data'>{coin?.market_cap}</span></p>
                    <p>24hr price change %: <span className='data'>{coin?.price_change_percentage_24h}</span></p>
                    <p>24hr market cap change %: <span className='data'>{coin?.market_cap_change_percentage_24h}</span></p>
                </div>
                <div className="right">
                    {/* conditinoal rendering, makes sure we dont try to render our graph without coin being defined yet */}
                    {
                        coin && <SparklineGraph coin = {coin}/> 
                    }
                </div>

            </div>
            {/* <button onClick = {()=>console.log(coin)}>current coin state</button> */}
        </div>
    )
}
