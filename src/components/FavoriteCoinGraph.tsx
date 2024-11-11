// this is a seperate component using graph.js, almost identical to the original 'sparklineGraph.tsx...'
// but will be used with a different expectant data strucutre
// Ive made this seperate component for more simplicity
import { Line } from 'react-chartjs-2';
import { CoinFromList} from '../interfaces/interfaces';
import {useState} from 'react'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);
export default function FavoriteCoinGraph({coin}:{coin:CoinFromList}){
    const selected_style ={
        color:'#c2dfd0',
        borderBottom:'solid 2px #c2dfd0',
        transition:'0.2s'
    }
    const [tickState,setTickState] = useState<String>('7day')

    const tick_range = ()=>{
        switch (tickState){
            case '6hr':
                // coin.sparkline_7d.price
                return coin?.sparkline_in_7d.price.slice(-6)
            case '12hr':
                return coin?.sparkline_in_7d.price.slice(-12)
            case '24hr':
                return coin?.sparkline_in_7d.price.slice(-24)
            case '72hr':
                return coin?.sparkline_in_7d.price.slice(-72)
            default:
                return coin?.sparkline_in_7d.price


        }
    }
    const price_change_hourly_percentage =():number=>{
        // const ticks = coin.sparkline_7d.price
        const ticks = tick_range()

        // latest - earliest / earliest x 100
        // const diff = ((ticks[ticks.length-1]-ticks[0])/ticks[0])*100
        const latest = ticks[ticks.length-1]
        const earliest = ticks[0]
        // const diff = ticks[ticks.length-1]-ticks[0]
        const diff = ((latest-earliest)/earliest)*100
        return diff
    }
    // const price_change_hourly = coin.market_data.price_change_percentage_1h_in_currency.usd;
    const data = {
        // labels: coin.market_data.sparkline_in_7d.price.map((_,index) => index+1), // Use the index as the label
        // labels:props.ticks.map((price,index)=>index+1),
        labels:tick_range().map((_,index)=>index+1),
        datasets: [{
            label: 'Price',
            // data:coin.market_data.sparkline_7d.price,
            data:tick_range(),
            borderColor: price_change_hourly_percentage()>0?'#59ff00':'#ff1100',
            borderWidth: 1,
            fill: false,
            pointBorderWidth:0.9,
            pointHitRadius:0.5,
            pointHoverBorderColor:'red',
            // color:'#FFFFFF'
            

        }]
    };
    const options = {
        // animation,
        title:{
            color:'#FFFFFF'
        },
        scales: {
            x: {
                grid: {
                    color:'transparent'
                },
                title: {
                    display: true,
                    text: 'Hour',
                    color:'#FFFFFF'
                },
                ticks:{
                    color:'#FFFFFF'
                }
            },
            y: {
                grid: {
                    color: 'transparent', // X-axis grid line color
                },
                title: {
                    display: true,
                    text: 'Price $',
                    color:'#FFFFFF'
                },
                ticks:{
                    color:'#FFFFFF'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem:any) {
                        return `Price: $${tooltipItem.raw.toFixed(2)}`;
                    },
                    title: function(tooltipItems:any) {
                        return tooltipItems.length?`Hour: ${tooltipItems[0].label}`:'';
                    }
                },
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                titleFont: { size: 20 },
                bodyFont: { size: 18 },
                borderWidth: 1,
                borderColor: '#fff',
            },
            legend: {
                display: true,
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14
                    }
                }
            }
        }
        // ,
        // animation: {
            // duration: 1500,
            // easing: 'easeInOutQuad',
        // }
    };
    // console.log(coin.sparkline_7d.price)
    return(
        <div className = 'favorite-graph-ctn'>
            <h3>Hourly Overview</h3>
            <div className='tick-selection'>
                <span 
                    style = {tickState=='6hr'?selected_style:{}}
                    onClick = {()=>(setTickState('6hr'))}>6HR</span>
                <span 
                    style = {tickState=='12hr'?selected_style:{}}
                    onClick = {()=>(setTickState('12hr'))}>12HR</span>
                <span 
                    style = {tickState=='24hr'?selected_style:{}}
                    onClick = {()=>(setTickState('24hr'))}>24HR</span>
                <span 
                    style = {tickState=='72hr'?selected_style:{}}
                    onClick = {()=>(setTickState('72hr'))}>72HR</span>
                <span
                    style = {tickState=='7day'?selected_style:{}}
                    onClick = {()=>(setTickState('7day'))}>7 DAY</span>
            </div>
            <Line data={data} options={options} />
        </div>
    )
}
