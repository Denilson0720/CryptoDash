import hourglass from '../assets/time.png'
import RefreshIcon from '@mui/icons-material/Refresh'
export default function LoadingCoin(){
    return(
        <div className="loading-coin-ctn coin-info">
            <img src={hourglass} alt="hourglass" />
            
        </div>
    )
}