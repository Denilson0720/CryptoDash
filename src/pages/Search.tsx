import {useState,useEffect} from 'react'
export default function Search(){
    async function getCoinsList(){
        const options ={
            method:'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-k9VxGCUB49Nni8pSRAfCD6QE'}
        }
        try{
            const response = await fetch('https://api.coingecko.com/api/v3/coins/list', options);
            const data = await response.json();
            console.log('list', data)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getCoinsList()
    },[])
    return(
        <div className ='home'>
            <p>Search page</p>
        </div>
    )
}