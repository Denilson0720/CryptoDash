import { CoinStructure,CoinFromList } from "../interfaces/interfaces"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FavoriteCoinGraph from "./FavoriteCoinGraph";
export default function FavoriteCoinCard({data}:{data:CoinFromList}){
    const shorten_percent = (percent:number)=>(percent.toString().slice(0,4))
    const percent_change_color ={
        color:data.price_change_percentage_24h>0? '#7efc7e':'#fc7e7e'
    }
    return(
        <div className="favorite-coin-card">
            <p>
                <img className = 'favorite-coin-img' src={data.image} alt="" />
            </p>
            <p>{data.id}</p>
            <p>{data.current_price}</p>
            <p>{data.high_24h}</p>
            <p
                style={percent_change_color}
            >
                {shorten_percent(data.price_change_percentage_24h)}%
            </p> 
  
        
        </div>
    )
}