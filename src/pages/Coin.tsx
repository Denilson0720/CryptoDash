import { useParams } from "react-router-dom"
import {useState,useEffect} from 'react'
import { CoinStructure,error } from "../interfaces/interfaces"
import { Link } from "react-router-dom"
import SparklineGraph from '../components/SparklineGraph'
import { getCoin } from "../api"
import LoadingCoin from "../components/LoadingCoin"
export default function Coin(){
    // gets id from query request parameter
    const { id } = useParams()
    const [coinData,setCoinData] = useState<CoinStructure>()
    // const options = {method: 'GET', headers: {accept: 'application/json'}};
    const orderSymbol = (flag:boolean)=>(flag?'▴':'▾')
    const price_percent_change_percentage = coinData? coinData.market_data.price_change_percentage_24h:0.0
    //for retry mechanism, keep count of how many times weve tried to access data via api
    const [retryCount,setRetryCount] = useState(0);
    // only allow 3 retries before user has to manually retry
    const maxRetries = 3;
    // '#7efc7e':'#fc7e7e'
    const redOrGreen = (value:boolean|undefined|null)=>{
        if(value===undefined||value===null){
            return
        }
        return value?{color:'#7efc7e'}:{color:'#fc7e7e'}
    }
    function addCommas(n:number|undefined|null|any):string{
        if(n===null || n===undefined){return 'N.A.'}
        const numStr = n.toString();

        // Use a regular expression to add commas
        const result = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return result;
    }
    function shortenNumber(n:number|undefined|null):string{
        // return ((n as unknown) as string).slice(0,3) --> only tricks ts compiler
        if(n===undefined|| n===null){
            return 'N/A'
        }
        return n.toString().slice(0,5)
    }
    // add a fallback, if user refreshes from /coin, prop wont be present 
    // add a default coin to request
    /*
    async function loadCoin(){
        getCoin(id)
            .then((data:CoinStructure)=>{
                // if data fetch was succesful, proceed
                if(data){
                    setCoinData(data)
                    console.log(data)
                    console.log(`succesully loaded ${id} coin data`)
                }
                // else increase our retry
    
            })
            .catch((error:error)=>{
                console.log(error)
                setRetryCount(retryCount+1)

            })
    }
    */
    async function loadCoin() {
        const curr_id = id || 'bitcoin'; // Default to 'bitcoin' if no id is provided
        
        try {
            const data = await getCoin(curr_id);
            if (data) {
                setCoinData(data); // Assuming setCoinData updates coinData state
                console.log(`Successfully loaded ${curr_id} coin data`);
            } else {
                throw new Error('No data received');
            }
        } catch (error) {
            console.error(error);
            setRetryCount(prevCount => prevCount + 1); // Update retry count using previous state
        }
    }
    /*
    useEffect(()=>{
        const loadData = async () => {
            // 1 second delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            loadCoin()
        }
        if(!coinData && retryCount <= maxRetries){
            //if coinData is still empty and we have not passed our alloted maxRetries, retry
            loadData() 
        }
        // loadData()   
        console.log(id)
        console.log(retryCount)
    },[retryCount])
    */
    useEffect(() => {
        const loadData = async () => {
            // Add a delay before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
            loadCoin();
        };
    
        // If coinData is still empty and retries are available
        if (!coinData && retryCount <= maxRetries) {
            loadData();
        }
    
        // Logging to debug
        console.log(`Coin ID: ${id}`);
        console.log(`Retry Count: ${retryCount}`);
    
    }, [retryCount, coinData, id]); // Ensure all relevant dependencies are included    
    return(
        <div className = 'home coin'>

            <Link className="back-button" to='/coins'>← Back to Coins</Link>
            {coinData?
            <div className="coin-info">
                {/* // LEFT SIDE DATA */}
                <div className = 'left'>
                    <div className = 'title'>
                        <img src={coinData?.image.large} alt="" />
                        <span className = 'name'>{coinData?.name}</span>
                        <span className='symbol'>{coinData?.symbol}</span>
                        {/* <span className='percent-change' style={redOrGreen(price_percent_change_percentage>0?true:false)}>{orderSymbol(price_percent_change_percentage>0?true:false)}{coinData?.market_data.price_change_percentage_24h}</span> */}
                        <span className='rank'>Market Cap Rank #{coinData?.market_cap_rank}</span>
                    </div>
                    {/* <h1>${coinData?.market_data.current_price.usd} <span className='percent-change' style={redOrGreen(price_percent_change_percentage>0?true:false)}>{orderSymbol(price_percent_change_percentage>0?true:false)}{coinData?.market_data.price_change_percentage_24h}%</span></h1> */}
                    <div className="price-ctn">
                        <span className='price'>${coinData?.market_data.current_price.usd}</span>
                        <span className='percent-change' style={redOrGreen(price_percent_change_percentage>0?true:false)}>{orderSymbol(price_percent_change_percentage>0?true:false)}{coinData?.market_data.price_change_percentage_24h}%</span>
                        {/* <p>{coinData?.description.en}</p> */}
                    </div>
                    <hr />
                    <p className = 'price-change-title'>Price Change Percentage:</p>
                    <div className = 'price-change-percent-ctn'>
                        {/* <p>Price Change Percentage:</p> */}
                        <div>
                            <span>24hr</span>
                            <span>7 day</span>
                            <span>14 day</span>
                            <span>30 day</span>
                            <span> 60 day</span>
                            <span> 200 day</span>
                            <span>1 year</span>
                        </div>
                        <div>
                            <span 
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_24h>0?true:false)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_24h)}%</span>
                            <span
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_7d>0?true:false)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_7d)}%</span>
                            <span
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_14d>0?true:false)}
                                // style = {redOrGreen(false)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_14d)}%</span>
                            <span
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_30d>0?true:false)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_30d)}%</span>
                            <span
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_60d>0?true:false)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_60d)}%</span>
                            <span
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_200d>0?true:false)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_200d)}%</span>
                            <span
                                style = {redOrGreen(coinData?.market_data.price_change_percentage_1y>0?true:false)}
                                // {shortenString(coinData?.market_data.price_change_percentage_1y)}
                            >{shortenNumber(coinData?.market_data.price_change_percentage_1y)}%</span>
                        </div>
                        
                    </div>
                    <div className="high-low">
                        <span className='high'>24HR High: <span style={redOrGreen(true)}>${coinData?.market_data.high_24h.usd}</span></span>
                        <span className='low'>24HR Low: <span style={redOrGreen(false)}>${coinData?.market_data.low_24h.usd}</span></span>
                    </div>
                    <p>All-Time High: <span className='data'>${coinData?.market_data.ath.usd} -- {coinData?.market_data.ath_date.usd}</span></p>
                    <p>All-Time Low: <span className = 'data'>${coinData?.market_data.atl.usd} -- {coinData?.market_data.atl_date.usd}</span></p>
                    <p>Market Cap: <span className='data'>${addCommas(coinData?.market_data.market_cap.usd)}</span></p>
                    <p>Fully Diluated Valuation: <span className='data'>${addCommas(coinData?.market_data.fully_diluted_valuation.usd)}</span></p>
                    <p>Total Volume: <span className = 'data'>{addCommas(coinData?.market_data.total_volume.usd)}</span></p>
                    <p>Total Supply: <span className = 'data'>{addCommas(coinData?.market_data.total_supply)}</span></p>
                    <p>Max Supply: <span className = 'data'>{addCommas(coinData?.market_data.max_supply)}</span></p>
                    <p>Circulating Supply: <span className = 'data'>{addCommas(coinData?.market_data.circulating_supply)}</span></p>
                    <p>Last updated on <span className='data'>{coinData?.market_data.last_updated}</span></p>
                    {/* <button onClick = {()=>console.log(coinData)}>coin</button> */}
                </div>
                {/* RIOGHT SIDE, GRAPH */}
                <div className = 'right'>
                    {coinData?
                    <SparklineGraph
                        coin = {coinData}
                    />
                    :null}
                </div>
               
            </div>
            :
            
            <LoadingCoin/>
            }
        </div>
    )
}