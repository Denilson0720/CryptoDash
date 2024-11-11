import { initializeApp } from "firebase/app";
import{getFirestore,collection,query,where,getDocs,getDoc,doc} from 'firebase/firestore/lite'
import { LoginFormDataStructure } from "./interfaces/interfaces";
const api_key = import.meta.env.VITE_COINGECKO_KEY
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYxSBUXrzdjwWB7Pr6RD_kcV3V2zpvs60",
  authDomain: "cryptodash-13adc.firebaseapp.com",
  projectId: "cryptodash-13adc",
  storageBucket: "cryptodash-13adc.appspot.com",
  messagingSenderId: "281938898143",
  appId: "1:281938898143:web:6b3970edbb057b38fb8d6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// reference to users collection
const usersCollectionRef = collection(db,'users')


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
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1&sparkline=true', options)
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
export async function getFullCoinsList(){
    const options ={
        method:'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': api_key}
    }
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list', options);
        const data = await response.json();
        
        // console.log('coins list: ', data)
        return data
    }catch(err){
        console.log(err);
        return null
    }
}
export async function loginUser(creds:LoginFormDataStructure){
    const {email,password} = creds;
    // query data from usersCollection where email and password match
    const q = query(usersCollectionRef,where("email","==",email),where("password","==",password))
    // console.log(q)
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    const users = querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
    }));
    // if no users were found using given login creds...
    if(users.length===0){
        throw{
            message:'wrong username or password, try again.',
            status:400
        };
    }
    return users;

//    console.log(creds)
}
export function logOut(){
    localStorage.clear();
    console.log('logged out')
}
export async function getUserData(username:string|null){
    if(!username){
        console.log('error')
        return {
            name:'',
            password:'',
            favorites:[],
            email:''
        }
        
    }
    const docRef = doc(db,'users',username)
    const docSnap = await getDoc(docRef)
    if(docSnap){
        console.log('succesfully retrieved user data for username:',username)
        // console.log(docSnap.data())
        return docSnap.data()
    }
    else{
        console.log('No such document')
    }


}
