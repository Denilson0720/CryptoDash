const api_key = import.meta.env.VITE_COINGECKO_KEY
export async function getTrending(){
    const options = {
      method: 'GET',
      headers: { 'x_cg_demo_api_key': api_key}
    };
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending', options);
      const data = await response.json();
        return data
        
    } catch (err) {
      console.error(err);
    }
}
export async function getBitcoin(){
    const options ={
        method:'GET',
        headers:{'x_cg_demo_api_key': api_key}
    }
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?sparkline=true', options);
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        console.log('btc data: ', data)
        return data
    }catch(err){
        console.log('Error fetching BTC data:', err);
        return null
    }
}
export async function getEthereum(){
    const options ={
        method:'GET',
        headers:{accept:'application/json','x_cg_demo_api_key': api_key}
    }
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum?sparkline=true', options);
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        console.log('eth data: ', data)
        return data
    }catch(err){
        console.log('Error fetching ETH data: ', err);
        return null
    }
}
export async function getCoinsList(){
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': api_key}
      };
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1', options)
        if (!response.ok){
            throw new Error(`HTTP error! states: ${response.status}`)
        }
        const data = await response.json();
        return data
        // setCoinsList(data)
    }catch(err){
        console.log(`Error fetching coins list: ${err}`)
        return null
    }
}
export async function getCoin(id:string|any){
    const options ={
        method:'GET',
        headers:{'x_cg_demo_api_key': api_key}
    }
    try{
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`, options);
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        // console.log(`${id} :`, data)
        return data
        // setCoinData(data)
    }catch(err){
        console.log(`Error fetching ${id} data:`, err);
        return null
    }
}