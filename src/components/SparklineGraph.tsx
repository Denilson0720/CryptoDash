// PriceChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import CoinProps from '../interfaces/CoinProps';
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


interface chartProps{
    index:number;
    data:{
        market_data:{
            sparkline_7d:{
                price:number[]
            }
        }
    }
}
// const PriceChart = (props:graphProps) => {
function SparklineGraph(props:CoinProps){
  

    const change_hr = props.data.market_data.price_change_percentage_1h_in_currency.usd
    // const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, change_hr > 0 ? '#59ff00' : '#ff1100');
    // gradient.addColorStop(1, 'transparent');
    const data = {
        labels: props.data.market_data.sparkline_7d.price.map((price, index) => index), // Use the index as the label
        // labels:dataTicks.map((price,index)=>index),
        datasets: [{
            label: 'Price',
            // data: props.pricesData,
            data:props.data.market_data.sparkline_7d.price,
            // data:{dataTicks},
            borderColor: change_hr>0?'#59ff00':'ff1100',
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
                    label: function(tooltipItem) {
                        return `Price: $${tooltipItem.raw.toFixed(2)}`;
                    },
                    title: function(tooltipItems) {
                        return `Hour: ${tooltipItems[0].label}`;
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
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad',
        }
        // responsive: true,
        // maintainAspectRatio: false,
        // aspectRatio: 2,
    };

    return (
        <div className = 'graph-ctn'>
            {/* <h2>Price Trend Over Time</h2> */}
            <h4>7 DAY OVERVIEW (Hourly)</h4>
            <Line data={data} options={options} />
        </div>
    );
};

export default SparklineGraph;
