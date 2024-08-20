export default interface CoinProps{
    index:number;
    data:{
        id:string;
        symbol:string;
        name:string;
        web_slug:string;
        categories:string[];
        description:{
            en:string;
            de:string;
        };
        links:{
            homepage:string[]
        }

        image:{
            thumb:string,
            small:string,
            large:string

        }
        market_data:{
            current_price:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            },
            ath_change_percentage:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            },
            market_cap:{
                // aed:number,
                // aud:number,
                // btc:number,
                // eth:number,
                usd:number
            },
            total_volume:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            },
            high_24h:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            },
            low_24h:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            },
            price_change_percentage_1h_in_currency:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            }
            price_change_percentage_24h_in_currency:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            },
            price_change_percentage_7d_in_currency:{
                aed:number,
                aud:number,
                btc:number,
                eth:number,
                usd:number
            }
        

            sparkline_7d:{
                price:number[]
            }

        }
    }
}