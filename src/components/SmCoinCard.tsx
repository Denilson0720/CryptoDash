
import { CoinStructure } from '../interfaces/interfaces';
// use CoinStrucutre interface for this
function SmCoinCard({coin}:{coin:CoinStructure}){
    return(

        <div className='coin-card'>
            <div className = 'left'>
                <img className = 'img' src={coin.image.large} alt="" />
                <p>{coin.name} | {coin.web_slug} | {coin.symbol} </p>
                <a href={coin.links.homepage[0]}>{coin.links.homepage[0]}</a>
            </div>
            <div className = 'right'>
                <p>Price: <span className = 'data'>${coin.market_data.current_price.usd}</span></p>
                <p>Market Cap: <span className='data'>{coin.market_data.market_cap.usd}</span></p>
                <p>24hr % Change: <span className='data'>{coin.market_data.price_change_percentage_24h_in_currency.usd}</span></p>
                <p>1hr % Change: <span className='data'>{coin.market_data.price_change_percentage_1h_in_currency.usd}%</span></p>
                <p>7d % Change: <span className='data'>{coin.market_data.price_change_percentage_7d_in_currency.usd}</span></p>
                <p>24Hr Low: <span className='data'>${coin.market_data.low_24h.usd}</span> 24hr High: <span className = 'data'>${coin.market_data.high_24h.usd}</span></p>
            </div>

            
        </div>
    )
}

export default SmCoinCard;
