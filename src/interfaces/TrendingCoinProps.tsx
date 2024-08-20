export default interface TrendingCoinProps{
    currency:string;
    score:number;
    coin:{
        item:{
            coin_id:number;
            data:{
                // price in usd
                price:number;
                price_change_percentage_24h:{
                    usd:number
                };
                sparkline:string;
                market_cap:string
                market_cap_btc:string;
            };
            id:string;
            large:string;
            market_cap_rank:number;
            name:string;
            // bitcoin price
            price_btc:number;
            score:number;
            slug:string;
            small:string;
            symbol:string;
            thumb:string;


        }
    }
}