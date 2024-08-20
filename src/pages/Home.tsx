// import { Outlet,NavLink,Link } from "react-router-dom"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TrendingCoinShort from '../components/TrendingCoinShort';
import TrendingNFTShort from '../components/TrendingNFTShort';
import SmCoinCard from '../components/SmCoinCard';
import CustomTabPanel from '../components/CustomTabPanel'
import SparklineGraph from '../components/SparklineGraph'
import LoadingSmCard from '../components/LoadingSmCard';
import {getTrending,getBitcoin,getEthereum} from '../api.js'
import {trendingReturn,error,bitcoin,ethereum} from '../interfaces/interfaces'
// MATERIAL UI functional component
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function Home(){
    const [value, setValue] = React.useState(0);
    const [currencyValue,setCurrencyValue] = React.useState(0);
    const [trendingCoins, setTrendingCoins] = React.useState([]);
    const [trendingNFTS, setTrendingNFTS] = React.useState([]);
    const [bitcoinData,setBitcoinData] = React.useState();
    const [ethereumData,setEthereumData] = React.useState();
    const [selectedCurrency, setCurrency] = React.useState('btc');

    function handleCurrencyChange(currency:string):void{
        setCurrency(currency)
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const handleBitcoinChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrencyValue(newValue);
    };
    async function loadEthereum(){
        getEthereum()
            .then((data:ethereum) => {
                if (data){
                // console.log('coin',data.coin)
                setEthereumData(data)
                console.log('eth state', ethereumData)
                }
            })
            .catch((error:error)=>{
                console.log(error)
            })
    } 
    async function loadBitcoin(){
        getBitcoin()
            .then((data:bitcoin) => {
                if (data){
                // console.log('coin',data.coin)
                setBitcoinData(data)
                console.log('btc state: ', bitcoinData )
                }
            })
            .catch((error:error)=>{
                console.log(error)
            })
    }
    async function loadTrending(){
        getTrending()
            .then((data:trendingReturn) => {
                console.log('coins', data.coins)
                console.log('nfts', data.nfts)
                setTrendingCoins(data.coins)
                setTrendingNFTS(data.nfts)
            })
            .catch((error:error)=>{
                console.log(error)
            })
    } 
    const coinElements = trendingCoins ?( 
        trendingCoins.map((coin,index) =>(
            <TrendingCoinShort
                key={index}
                score={index}
                coin = {coin}
                currency={selectedCurrency}
            />
    ))): null
    const nftElements = trendingNFTS ?(
        trendingNFTS.map((nft,index)=>(
            <TrendingNFTShort
                key = {index}
                score = {index}
                nft={nft}
            />
        ))
    ):null
    const bitcoinGraph = bitcoinData?(
        <SparklineGraph
            data = {bitcoinData}
            index = {1}
        />
    ):null
    const bitcoinCard = bitcoinData?(
        <SmCoinCard
            data = {bitcoinData}
            index = {1}
        />
    ):<LoadingSmCard/>
    const ethereumGraph = ethereumData?(
        <SparklineGraph
            data = {ethereumData}
            index = {1}
        />
    ):null
    const ethereumCard = ethereumData?(
        <SmCoinCard
            data = {ethereumData}
            index ={1}
        />
    ):<LoadingSmCard/>
    const selectedStyle = {
        color:'#9cd37c'
    }
    React.useEffect(()=>{
        const loadAllData = async () => {
            await loadTrending();
            await loadBitcoin();
            await loadEthereum();
        };
        loadAllData();
    },[])
    return(
        // HOME LEFT
        <div className ='home'>
            <div className = 'home-left'>
                <h3>🔥TRENDING🔥</h3>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{border:'none'}}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="basic tabs example" 
                            centered 
                        >
                            <Tab 
                                label="COINS" 
                                {...a11yProps(0)}/>
                            <Tab 
                                label="NFTS" 
                                {...a11yProps(1)}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <div className ='currency-button-ctn'>
                            <nav 
                                style={selectedCurrency=='btc'?selectedStyle:{}}
                                onClick={()=>(handleCurrencyChange('btc'))}
                                className = 'currency-selectors'
                            >₿ BTC</nav>
                            <nav 
                                style={selectedCurrency=='usd'?selectedStyle:{}}
                                onClick = {()=>(handleCurrencyChange('usd'))}
                                className = 'currency-selectors'
                            >$ USD</nav>

                        </div>
                        <div className ='short-coin-label'>
                            <p className ='score'>Score</p>
                            <p className ='img'>Coin</p>
                            <p className ='name'>Name</p>
                            <p className = 'price'>Price</p>
                            <p className = 'change'>24HR% Change</p>
                            <p className = 'graph'>7 Day Overview</p>                          
                        </div>
                        <div className='scroll-area'>
                            {coinElements}

                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div className ='short-nft-label'>
                            <p className ='score'>Score</p>
                            <p className ='img'>NFT</p>
                            <p className ='name'>Name</p>
                            <p className = 'price'>Price</p>
                            <p className = 'change'>24HR% Change</p>
                            <p className = 'graph'>1 Day Overview</p>
                        </div>
                        <div className='scroll-area'>
                            {nftElements}
                        </div>
                    </CustomTabPanel>
                </Box>

            </div>

            {/* HOME RIGHT */}
            <div className = 'home-right'>
                <div className = 'coin-card-ctn'>
                    <Box sx={{width:'100%'}}>
                         <Box sx={{border:'none'}}>
                            <Tabs
                                value={currencyValue}
                                onChange={handleBitcoinChange}
                                aria-label="secondary tabs example"
                                indicatorColor="primary"
                                centered
                            >
                                <Tab label="BITCOIN" {...a11yProps(0)}/>
                                <Tab label="ETHEREUM" {...a11yProps(0)}/>
                            </Tabs>
                        </Box>
                        <CustomTabPanel value = {currencyValue} index={0}>
                            {bitcoinCard}
                            {bitcoinGraph}
                        </CustomTabPanel>
                        <CustomTabPanel value = {currencyValue} index={1}>
                            {ethereumCard}
                            {ethereumGraph}
                        </CustomTabPanel>
                    </Box>
                 </div>
            </div>
        </div>
    )
}