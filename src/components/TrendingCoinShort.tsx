import TrendingCoinProps from '../interfaces/TrendingCoinProps'
import { Link } from 'react-router-dom';
// import TrendingCoin form '../interfaces/interfaces'
// {key:number;score:number:coin:TrendingCoin;currency:string
// }
// export default function TrendingCoinShort({score:number,coin:TrendingCoin,currency:string})
export default function TrendingCoinShort(props:TrendingCoinProps){

    const price_in_currency = props.currency === 'usd'? props.coin.item.data.price:props.coin.item.price_btc;
    const price=(coin:number)=>{
        return coin.toString().substring(0,6)
    }
    const percentChangeDay = (coin:number) =>{
        // let str= coinData.item.data.price_change_percentage_24h.usd;
        let str = coin
        return str.toString().substring(0, 5)
    };
    const percent_change_color ={
        color:props.coin.item.data.price_change_percentage_24h.usd>0? '#7efc7e':'#fc7e7e'
    }
    return(
        <>
            <div className = 'trending-coin-short'>
                {/* <p className = 'score'>{seedData.item.score} </p> */}
                <p className = 'score'>{props.coin.item.score} </p>
                {/* <img className = 'short-img' src={seedData.item.small} alt="" /> */}
                <img className = 'short-img' src={props.coin.item.small} alt="" />
                {/* <p className = 'name'>{seedData.item.symbol}</p> */}
                <p className = 'name'><Link to={`/coins/${props.coin.item.id}`} key = {props.coin.item.coin_id}>{props.coin.item.symbol}</Link></p>
                {/* <p className='price'>₿ {price(seedData.item.data.price)}</p> */}
                {/* <p className='price'>₿ {price(props.coin.item.data.price)}</p> */}
                <p className = 'price'>{props.currency==='usd'?'$':'₿'}{price(price_in_currency)}</p>
                {/* <p className = 'change'>{percentChangeDay(seedData.item.data.price_change_percentage_24h.usd)}%</p> */}
                <p style = {percent_change_color} className = 'change'>{percentChangeDay(props.coin.item.data.price_change_percentage_24h.usd)}%</p>
                {/* <img className = 'graph' src={seedData.item.data.sparkline} alt="" />         */}
                <img className = 'graph' src={props.coin.item.data.sparkline} alt="" />  
            </div>
        </>

    )
}