import Loading from "../components/Loading"
import * as React from 'react';
import PageTracker from "../components/PageTracker";
import ListCoinCard from "../components/ListCoinCard";
export default function Coins(){

    const [coinsList,setCoinsList] = React.useState([])
    const [currPage,setCurrPage] = React.useState<number>(1)
    const [loaded,setLoaded] = React.useState<boolean>(false)
    const [descMarketCapSymbol,setDescMarketCapSymbol] = React.useState<boolean|null>(true)
    const [ascPriceSymbol,setAscPriceSymbol] = React.useState<boolean|null>(null)
    const [listOrder, setListOrder] = React.useState<string>('descMarket')
    const changePage = (page:number)=>{
        // currPage = page
        setCurrPage(page)
        console.log(currPage)
    }
    const chosenPage= (page:number)=>{
        // backgroundColor:'#FFFFFF':
        // currPage==page?
        //     return {backgroundColor:'#FFFFFF'}
        // : return null
        if(currPage==page){
            return {backgroundColor:'#244031'}
        }

    }
    async function getCoinsList(){
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-k9VxGCUB49Nni8pSRAfCD6QE'}
          };
        try{
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1', options)
            if (!response.ok){
                throw new Error(`HTTP error! states: ${response.status}`)
            }
            const data = await response.json();
            setCoinsList(data)
            setLoaded(true)
        }catch(err){
            console.log(`Error fetching coins list: ${err}`)
        }
    }
    const paginate = (items: any[], itemsPerPage: number) => {
        const pages = [];
        // adds to pages array by increments of 25 elements found in items array
        for (let i = 0; i < items.length; i += itemsPerPage) {
            pages.push(items.slice(i, i + itemsPerPage));
        }
        return pages;
    };
    
    const itemsPerPage = 25;
    // function ascendingPriceSort(coins:typeof coinsList){
    //     //coin.currentprice
    //     for(let i = 0;i<coins.length;i++){
    //         console.log(coins[i].current_price)
    //     }
    // }
    function ascendingPriceSort(coins:typeof coinsList) {
        const n = coins.length;
    
        // Bubble sort algorithm
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Compare the current coin's price with the next coin's price
                if (coins[j].current_price > coins[j + 1].current_price) {
                    // Swap if the current coin's price is greater than the next coin's price
                    [coins[j], coins[j + 1]] = [coins[j + 1], coins[j]];
                }
            }
        }
        return coins;
    }
    function descendingPriceSort(coins:typeof coinsList) {
        const n = coins.length;
    
        // Bubble sort algorithm for descending order
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Compare the current coin's price with the next coin's price
                if (coins[j].current_price < coins[j + 1].current_price) {
                    // Swap if the current coin's price is less than the next coin's price
                    [coins[j], coins[j + 1]] = [coins[j + 1], coins[j]];
                }
            }
        }
    
        return coins;
    }
    function descendingMarketCapSort(coins:typeof coinsList) {
        const n = coins.length;
    
        // Bubble sort algorithm for descending order
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Compare the current coin's price with the next coin's price
                if (coins[j].market_cap < coins[j + 1].market_cap) {
                    // Swap if the current coin's price is less than the next coin's price
                    [coins[j], coins[j + 1]] = [coins[j + 1], coins[j]];
                }
            }
        }
    
        return coins;
    }
    function ascendingMarketCapSort(coins:typeof coinsList):typeof coinsList{
        const n = coins.length;
    
        // Bubble sort algorithm
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Compare the current coin's price with the next coin's price
                if (coins[j].market_cap > coins[j + 1].market_cap) {
                    // Swap if the current coin's price is greater than the next coin's price
                    [coins[j], coins[j + 1]] = [coins[j + 1], coins[j]];
                }
            }
        }
    
        return coins;
    }
    
    
    const orderSymbol = (flag:boolean)=>(flag?'▲':'▼')
    // make a alteredList that will be changed depending on the
    //  specific order we want and then use that to pass it into 
    // paginatedCoinsList function
    const alteredList=():typeof coinsList =>{
        // default is decsMarketCap, so return coinList as last option
        switch(listOrder){
            case 'descMarket':
                return descendingMarketCapSort(coinsList);
            case 'ascMarket':
                // return coinsList.slice().reverse();
                return ascendingMarketCapSort(coinsList)
            case 'ascPrice':
                return ascendingPriceSort(coinsList)
            case 'dscPrice':
                return descendingPriceSort(coinsList)
            default: 
                return coinsList;
        }

    }
    const paginatedCoinsList = paginate(alteredList(), itemsPerPage);


    const first_25 = paginatedCoinsList[0]
    const second_25 = paginatedCoinsList[1]
    const third_25 = paginatedCoinsList[2]
    const fourth_25 = paginatedCoinsList[3]
    const fifth_25 = paginatedCoinsList[4]
    const sixth_25 = paginatedCoinsList[5]
    const seventh_25 = paginatedCoinsList[6]
    const eigth_25 = paginatedCoinsList[7]
    const ninth_25 = paginatedCoinsList[8]
    const tenth_25 = paginatedCoinsList[9]

    const page_one = first_25?(
        first_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_two = second_25?(
        second_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_three = third_25?(
        third_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_four = fourth_25?(
        fourth_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_five = fifth_25?(
        fifth_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_six = sixth_25?(
        sixth_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_seven = seventh_25?(
        seventh_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_eight = eigth_25?(
        eigth_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_nine = ninth_25?(
        ninth_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const page_ten = tenth_25?(
        tenth_25.map((coin,index)=>(
            <ListCoinCard
                key = {index}
                coin = {coin}
            />
        ))
    ):null
    const correct_page = () => {
        switch (currPage) {
            case 1:
                return page_one;
            case 2:
                return page_two;
            case 3:
                return page_three;
            case 4:
                return page_four;
            case 5:
                return page_five;
            case 6: 
                return page_six;
            case 7:
                return page_seven;
            case 8:
                return page_eight;
            case 9:
                return page_nine;
            case 10:
                return page_ten;
            default:
                return null; // Or you can return a default page or value here if needed
        }
    }
    
    React.useEffect(()=>{
        getCoinsList()
    },[])
    return(
        <div className ='home coins'>
            <div className = 'title'>
                <h3>COINS</h3>
                <h4>Top 250 coins in descending market cap.</h4>
                {/* <button onClick ={()=>(ascendingPriceSort(coinsList))}>click me</button> */}
                {/* <button onClick ={()=>(console.log(coinsList))}>click me</button> */}
            </div>
            
            {/* <h4>Coins sorted by market cap.</h4>     */}
            
                <div className="coins-list-label">
                    <p className="rank">Rank</p>
                    <p className="image">Coin</p>
                    <p className="name">Name</p>
                    <p className="symbol">Symbol</p>
                    <p 
                        className="price"
                        onClick = {()=>{
                            if(listOrder=='ascPrice'){
                                setListOrder('dscPrice')
                                setAscPriceSymbol(false)
                                setDescMarketCapSymbol(null)
                            }
                            else{
                                setListOrder('ascPrice')
                                setAscPriceSymbol(true)
                                setDescMarketCapSymbol(null)
                            }

                        }}

                    >Price{ascPriceSymbol!=null?orderSymbol(ascPriceSymbol):null}</p>
                    <p className="percent-change">24HR % Change</p>
                    <p 
                        className="market-cap"
                        // onClick ={()=>(setDescMarketCap(!descMarketCap))}
                        onClick ={()=>{
                            if(listOrder=='descMarket'){
                                setListOrder('ascMarket')
                                setDescMarketCapSymbol(false)
                                setAscPriceSymbol(null)

                            }
                            else{
                                setListOrder('descMarket')
                                setDescMarketCapSymbol(true)
                                setAscPriceSymbol(null)
                            }
                        }}
                    >Market Cap {descMarketCapSymbol!=null?orderSymbol(!descMarketCapSymbol):null}</p>
                    <p className="total-volume">Total Volume</p>
                    <p className="link"> -- </p>
                    
                </div>
                <div className = 'coins-list'>
                    {loaded?
                    <div className="coins-scroll-area">
                        {correct_page()}
                    </div>
                    :<Loading/>}
                    
            </div>
            {/* <PageTracker/> */}
            <div className ='page-tracker'>
                <span style={chosenPage(1)} onClick = {()=>changePage(1)}>1</span>
                <span style={chosenPage(2)}  onClick = {()=>changePage(2)}>2</span>
                <span style={chosenPage(3)} onClick = {()=>changePage(3)}>3</span>
                <span style={chosenPage(4)}  onClick = {()=>changePage(4)}>4</span>
                <span style={chosenPage(5)}  onClick = {()=>changePage(5)}>5</span>
                <span style={chosenPage(6)}  onClick = {()=>changePage(6)}>6</span>
                <span style={chosenPage(7)}  onClick = {()=>changePage(7)}>7</span>
                <span style={chosenPage(8)}  onClick = {()=>changePage(8)}>8</span>
                <span style={chosenPage(9)}  onClick = {()=>changePage(9)}>9</span>
                <span style={chosenPage(10)}  onClick = {()=>changePage(10)}>10</span>
            </div>
   
       </div>
        
    )
}