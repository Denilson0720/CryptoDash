import TrendingCoinProps from '../interfaces/TrendingCoinProps'
export default function TrendingCoinShort(props:TrendingCoinProps){
    /*
    name:string,
    symbol:string,
    24hr%:number,
    sparkline:string
    price:number
     */
    const price_in_currency = props.currency === 'btc'? props.coin.item.data.price:props.coin.item.price_btc;
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
                <p className = 'name'>{props.coin.item.symbol}</p>
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