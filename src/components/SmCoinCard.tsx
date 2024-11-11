
import { CoinStructure,CoinFromList } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';
// receives 2 different structures dependent on different api requests
function SmCoinCard({coin}:{coin:CoinStructure|CoinFromList}){
    // typeguard function
    // Use of TypeGuard is imperitive as we will be expecting data as either normal CoinStrucutre or CoinFromList

    const isCoinStructure = (data:CoinStructure|CoinFromList):data is CoinStructure =>{

        return (data &&
        (data as CoinStructure).market_data?.current_price !== undefined && 
        (data as CoinStructure).links !== undefined
        )
    }
    // IF coin data comes in as CoinStructure, render this...
    if(isCoinStructure(coin)){
        return(
            
            <div className='coin-card'>
                <div className = 'left'>
                    <img className = 'img' src={coin.image.large} alt={`${coin.name} logo`} />
                    <p className='reference'>{coin.name} | {coin.web_slug} | {coin.symbol} </p>
                    <a className='homepage' href={coin.links.homepage[0]}>{coin.links.homepage[0]}</a>
                    <p><Link to={`/coins/${coin.id}`} key = {coin.id} className ='link'>View More</Link></p>
                </div>
                <div className = 'right'>
                    <p>Price: <span className = 'data'>${coin.market_data.current_price.usd}</span></p>
                    <p>Market Cap: <span className='data'>{coin.market_data.market_cap.usd}</span></p>
                    <p>24hr % Change: <span className='data'>{coin.market_data.price_change_percentage_24h_in_currency.usd}</span></p>
                    <p>1hr % Change: <span className='data'>{coin.market_data.price_change_percentage_1h_in_currency.usd}%</span></p>
                    <p>7d % Change: <span className='data'>{coin.market_data.price_change_percentage_7d_in_currency.usd}</span></p>
                    {/* 24hr High: <span className = 'data'>${coin.market_data.high_24h.usd}</span> */}
                    {/* -- */}
                    <p>24Hr Low: <span className='data'>${coin.market_data.low_24h.usd}</span></p>
                    <p>24HR High: <span className='data'>${coin.market_data.high_24h.usd}</span></p>
                </div>
            </div>
        )
    }
    // ELSE, if coin data comes as CoinFromList structure, render this...
    else{
        return(
            <div className='coin-card'>
            <div className = 'left'>
                <img className = 'img' src={coin.image} alt={`${coin.name} logo`} />
                <p className='reference'>{coin.name} | {coin.symbol} </p>
                {/* <a className='homepage' href={coin.}>{coin.links.homepage[0]}</a> */}
                <p><Link to={`/coins/${coin.id}`} key = {coin.id} className ='link'>View More</Link></p>
            </div>
            <div className = 'right'>
                <p>Price: <span className = 'data'>${coin.current_price}</span></p>
                <p>Market Cap: <span className='data'>{coin.market_cap}</span></p>
                <p>24hr % Change: <span className='data'>{coin.price_change_percentage_24h}</span></p>
                {/* <p>1hr % Change: <span className='data'>{coin.market_data.price_change_percentage_1h_in_currency.usd}%</span></p> */}
                {/* <p>7d % Change: <span className='data'>{coin.market_data.price_change_percentage_7d_in_currency.usd}</span></p> */}
                {/* 24hr High: <span className = 'data'>${coin.market_data.high_24h.usd}</span> */}
                {/* -- */}
                <p>24Hr Low: <span className='data'>${coin.low_24h}</span></p>
                <p>24HR High: <span className='data'>${coin.high_24h}</span></p>
            </div>

            
        </div>
        )
    }
}

export default SmCoinCard;
