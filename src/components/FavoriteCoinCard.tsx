import { CoinFromList } from "../interfaces/interfaces"
import { useState} from "react";
import {Link} from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { removeFavorite } from "../api";
import Modal from '@mui/material/Modal';
export default function FavoriteCoinCard({data}:{data:CoinFromList}){
    const shorten_percent = (percent:number)=>(percent.toString().slice(0,4))
    const percent_change_color ={
        color:data.price_change_percentage_24h>0? '#7efc7e':'#fc7e7e'
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = localStorage.getItem('userId')
    const style = {
        position: 'absolute',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#48755d',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const handleRemove = ()=>{
        user && removeFavorite(user,data.id)
        setOpen(x=>!x)
    }
    return(
        // if modal state == True show Modal
        <div className="favorite-coin-card">
            <p>
                <StarIcon fontSize="small" className="favorite-icon" onClick={handleOpen}/>
                <img className = 'favorite-coin-img' src={data.image} alt="" />
            </p>
            <p><Link className='fav-id' to={`/coins/${data.id}`}>{data.id}</Link></p>
            <p>{data.current_price}</p>
            <p>{data.high_24h}</p>
            <p
                style={percent_change_color}
            >
                {shorten_percent(data.price_change_percentage_24h)}%
            </p> 
  
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='remove-coin-modal' sx = {style}>
                    {/* are you sure you want to remove coin? */}
                    <h3>Are you sure you want to remove <img  className='favorite-coin-remove-img' src={data.image} alt="" />{data.name} from your wallet?</h3>
                    <span className="remove-btn" onClick={()=>handleRemove()}>remove</span>
                </Box>
            </Modal>
        </div>
    )
}