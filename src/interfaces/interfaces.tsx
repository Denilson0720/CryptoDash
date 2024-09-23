// export interface trendingReturn{
//     coins:{}
//     nfts:{}
// }
export interface error{
    error:{}
}
export interface bitcoin{
    coin:{}
}
export interface ethereum{
    coin:{}
}
interface Roi{
    times: number;
    currency: string;
    percentage: number;
}
export interface CoinListProps {
    key:number,
    coin:{
        id: string;
        symbol: string;
        name: string;
        image: string;
        current_price: number;
        market_cap: number;
        market_cap_rank: number;
        fully_diluted_valuation: number;
        total_volume: number;
        high_24h: number;
        low_24h: number;
        price_change_24h: number;
        price_change_percentage_24h: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
        ath: number;
        ath_change_percentage: number;
        ath_date: string;
        atl: number;
        atl_change_percentage: number;
        atl_date: string;
        roi?: Roi; // `roi` is optional since not all cryptocurrencies have this data
        last_updated: string;
    }
}
export interface CoinStructure {
    additional_notices: any[]; // Array of any type, replace `any` with specific type if known
    asset_platform_id: string;
    block_time_in_minutes: number;
    categories: string[]; // Array of strings
    community_data: {
        facebook_likes: number | null;
        twitter_followers: number;
        reddit_average_posts_48h: number;
        reddit_average_comments_48h: number;
        reddit_subscribers: number;
        [key: string]: any; // Additional properties if any
    };
    contract_address: string;
    country_origin: string;
    description: {
        en: string;
        de: string;
        es: string;
        fr: string;
        it: string;
        [key: string]: string; // Support for other languages
    };
    detail_platforms: {
        [platform: string]: {
            decimal_place: number;
            contract_address: string;
        };
    };
    developer_data: {
        forks: number;
        stars: number;
        subscribers: number;
        total_issues: number;
        closed_issues: number;
        [key: string]: any; // Additional developer data properties
    };
    genesis_date: string | null;
    hashing_algorithm: string | null;
    id: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    last_updated: string;
    links: {
        homepage: string[];
        whitepaper: string;
        blockchain_site: string[];
        official_forum_url: string[];
        chat_url: string[];
        [key: string]: any; // Additional link properties
    };
    localization: {
        en: string;
        de: string;
        es: string;
        fr: string;
        it: string;
        [key: string]: string; // Support for other languages
    };
    market_cap_rank: number;
    market_data: {
        current_price: Record<string, number>;
        total_value_locked: {
            btc: number;
            usd: number;
        };
        mcap_to_tvl_ratio: number;
        fdv_to_tvl_ratio: number;
        roi: number | null;
        [key: string]: any; // Additional market data properties
        ath:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        ath_change_percentage:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        ath_date:{
            usd:string;
        };
        atl:{
            btc:number;
            usd:number;
        };
        atl_change_percentage:{
            btc:number;
            usd:number;
        };
        atl_date:{
            usd:string;
        };
        market_cap:{
            usd:number;
            btc:number;
            eth:number;
        };
        market_cap_rank:number;
        fully_diluted_valuation:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        market_cap_fdv_ratio:number;
        total_volume:{
            usd:number;
            btc:number;
            eth:number;
        };
        high_24h:{
            usd:number;
            btc:number;
            eth:number;
        };
        low_24h:{
            usd:number;
            btc:number;
            eth:number;
        };
        price_change_24h:number;
        price_change_percentage_24h:number;
        price_change_percentage_7d:number;
        price_change_percentage_14d:number;
        price_change_percentage_30d:number;
        price_change_percentage_60d:number;
        price_change_percentage_200d:number;
        price_change_percentage_1y:number;
        market_cap_change_24h:number;
        market_cap_change_percentage_24h:number;
        price_change_24h_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_1h_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_24h_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_7d_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_14d_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_30d_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_60d_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_200d_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        price_change_percentage_1y_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        market_cap_change_24h_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        market_cap_change_percentage_24h_in_currency:{
            usd:number;
            btc:number;
            eth:number;
            eur:number;
        };
        total_supply:number;
        max_supply:number;
        circulating_supply:number;
        sparkline_7d:{
            price:number[];
        }
        last_updated:string
    };
    name: string;
    platforms: {
        [platform: string]: string;
    };
    preview_listing: boolean;
    public_notice: string | null;
    sentiment_votes_down_percentage: number;
    sentiment_votes_up_percentage: number;
    status_updates: any[]; // Array of any type, replace `any` with specific type if known
    symbol: string;
    tickers: any[]; // Array of any type, replace `any` with specific type if known
    watchlist_portfolio_users: number;
    web_slug: string;
}
// make interface dummy/TrendingReturn
// make coins section to be an array of TrendingCoin
export interface TrendingCoin{
    item:{
        id:string,
        coin_id:number,
        name:string,
        symbol:string,
        market_cap_rank:number,
        thumb:string,
        small:string,
        large:string,
        price_btc:number,
        score:number,
        data:{
            price:number,
            price_btc:string,
            price_change_percentage_24h:{
                usd:number,
                eur:number,
                btc:number
            },
            market_cap:string,
            market_cap_btc:string,
            total_volume:string,
            total_volume_btc:string,
            sparkline:string,
            content:{
                title:string,
                description:string
            }
        }
    }
}
export interface TrendingNFT{
    id:string,
    name:string,
    symbol:string,
    thumb:string,
    nft_contract_id:number,
    native_currency_symbol:string,
    floor_price_in_native_currency:number,
    floor_price_24h_percentage_change:number,
    data:{
        floor_price:string,
        floor_price_in_usd_24h_percentage_change:string,
        h24_volume:string,
        h24_average_sale_price:string,
        sparkline:string,
        content:any
    }
}
export interface TrendingReturn{
    coins:TrendingCoin[],
    nfts:TrendingNFT[]
}
export interface CoinFromList{
    ath:number,
    ath_change_percentage:number,
    ath_date:string,
    atl:number,
    atl_change_percentage:number,
    atl_date:string,
    circulating_supply:number,
    current_price:number,
    fully_diluted_valuation:number,
    high_24h:number,
    id:string,
    image:string,
    last_updated:string,
    low_24h:number,
    market_cap:number,
    market_cap_change_24h:number,
    market_cap_change_percentage_24h:number,
    market_cap_rank:number,
    max_supply:number,
    name:string,
    price_change_24h:number,
    price_change_percentage_24h:number,
    roi:any,
    symbol:string,
    total_supply:number,
    total_volume:number
}
export interface CoinListItem{
    id:string,
    symbol:string,
    name:string
}