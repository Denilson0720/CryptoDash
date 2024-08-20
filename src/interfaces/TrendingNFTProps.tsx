export default interface TrendingNFTProps{
    score:number;
    nft:{
        data:{
            floor_price:string;
            floor_price_in_usd_24h_percentage_change:string;
            sparkline:string;
        }
        floor_price_24h_percentage_change:number;
        floor_price_in_native_currency:number;
        id:string;
        name:string;
        native_currency_symbol:string;
        nft_contract_id:number;
        symbol:string;
        thumb:string;
    }
}