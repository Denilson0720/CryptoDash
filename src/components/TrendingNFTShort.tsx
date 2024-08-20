import TrendingNFTProps from '../interfaces/TrendingNFTProps'

export default function TrendingNFTShort(props:TrendingNFTProps){
    // const [seedNFTdata, setSeedNFTdata] = React.useState(nftData);
    const price=(coin:number)=>{
        return coin.toString().substring(0,8)
    }
    const percentChangeDay = (coin:string) =>{
        // let str= coinData.item.data.price_change_percentage_24h.usd;
        let str:string = coin;
        return str.substring(0, 5)
    };
    return(
        <>
            <div className = 'trending-nft-short'>
                {/* score will be based on index passed in as prop from Home */}
                <p className = 'score'>{props.score}</p>
                {/* props.nft.thumb */}
                <img className ='short-img' src={props.nft.thumb} alt="" />
                <p className = 'name'>{props.nft.symbol}</p>
                <p className = 'price'>{props.nft.data.floor_price}</p>
                <p className = 'change'>{percentChangeDay(props.nft.data.floor_price_in_usd_24h_percentage_change)}</p>
                <img className = 'graph' src={props.nft.data.sparkline} alt="" />
                {/* <p>{seedNFTdata.data.floor_price_in_used_24h_percentage_change}</p> */}
            </div>
            {/* <hr className = 'short-hr'/> */}
        </>

    )
}