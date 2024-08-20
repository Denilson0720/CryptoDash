
import CoinProps from '../interfaces/CoinProps';

function SmCoinCard(props:CoinProps){
    return(

        <div className='coin-card'>
            <div className = 'left'>
                <img className = 'img' src={props.data.image.large} alt="" />
                <p>{props.data.name} | {props.data.web_slug} | {props.data.symbol} </p>
                {/* <p>{props.data.name}</p> */}
                {/* <p>{props.data.web_slug}</p> */}
                <a href={props.data.links.homepage[0]}>{props.data.links.homepage[0]}</a>
                {/* <a href={props.data.links.homepage[0]}>here</a> */}
            </div>
            <div className = 'right'>
                <p>Price: ${props.data.market_data.current_price.usd}</p>
                <p>Market Cap: {props.data.market_data.market_cap.usd}</p>
                <p>24hr % Change: {props.data.market_data.price_change_percentage_24h_in_currency.usd}</p>
                <p>1hr % Change: {props.data.market_data.price_change_percentage_1h_in_currency.usd}%</p>
                <p>7d % Change: {props.data.market_data.price_change_percentage_7d_in_currency.usd}</p>
                <p>24Hr Low: ${props.data.market_data.low_24h.usd} 24hr High: ${props.data.market_data.high_24h.usd}</p>
            </div>

            
        </div>
    )
}

export default SmCoinCard;
