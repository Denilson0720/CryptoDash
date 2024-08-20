import { CoinListProps } from "../interfaces/interfaces"
import { Link } from "react-router-dom"
export default function ListCoinCard(props:CoinListProps){
    // percent_change = {props.coin.pr}
    const percent_change_color ={
        color:props.coin.price_change_percentage_24h>0? '#7efc7e':'#fc7e7e'
    }
    function addCommas(n:number):string{
        const numStr = n.toString();

        // Use a regular expression to add commas
        const result = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return result;
    }
    return(

        <div className = 'list-coin-card'>
            <p className = 'rank'>{props.coin.market_cap_rank}</p>
            <img src={props.coin.image} alt=""/>
            <p className="name">{props.coin.name}</p>
            <p className="symbol">{props.coin.symbol}</p>
            {/* <p className="name">{props.coin.name}</p> */}
            <p className="price">${addCommas(props.coin.current_price)}</p>
            <p className="percent-change" style={percent_change_color}>{props.coin.price_change_percentage_24h}%</p>
            <p className="market-cap">${addCommas(props.coin.market_cap)}</p>
            {/* <p className="symbol">{props.coin.symbol}</p> */}
            <p className="total-volume">${addCommas(props.coin.total_volume)}</p>
            {/* <p className="link">View More</p> */}
            <Link to={props.coin.id} key = {props.coin.id} className ='link'>View More</Link>
            
        </div>
       
    )
}