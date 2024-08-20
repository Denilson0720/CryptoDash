export async function getTrending(){
    const options = {
      method: 'GET',
      headers: { 'x_cg_demo_api_key': 'CG-k9VxGCUB49Nni8pSRAfCD6QE'}
    };
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending', options);
      const data = await response.json();
    //   setTrendingCoins(data.coins);
    //   setTrendingNFTS(data.nfts);
        // console.log(data)
        return data
        
    } catch (err) {
      console.error(err);
    }
}
export async function getBitcoin(){
    const options ={
        method:'GET',
        headers:{'x_cg_demo_api_key': 'CG-k9VxGCUB49Nni8pSRAfCD6QE'}
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
        headers:{accept:'application/json','x_cg_demo_api_key': 'CG-k9VxGCUB49Nni8pSRAfCD6QE'}
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
        
        // const options = {
        // method: 'GET',
        // headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-k9VxGCUB49Nni8pSRAfCD6QE'}
        // };

        // fetch('https://api.coingecko.com/api/v3/coins/ethereum?sparkline=true', options)
        //     .then(response => response.json())
        //     .then(response => console.log('eth data:' , response))
        //     .catch(err => console.error(err)); 
         
}