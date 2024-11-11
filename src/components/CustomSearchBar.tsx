import { useEffect,useState,useRef } from "react"
import { getFullCoinsList } from "../api"
import { CoinListItem,error } from "../interfaces/interfaces"
import {Search,Clear} from '@mui/icons-material'
import { useNavigate } from "react-router-dom"
export default function CustomSearchBar(){
    const [coinsList,setCoinsList] = useState<CoinListItem[]|any>()
    const [coin,setCoin] = useState<String|any>('')
    // array of suggestions
    const [suggestions,setSuggestions] = useState<any>([])
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isFocused,setIsFocused] = useState<boolean>(false)
    const [validCoin,setValidCoin] = useState<boolean>(true)
    // ref for search bar continaer
    const searchBarRef = useRef<(HTMLDivElement | null)>(null)
    // ref to hold the list of <li> elements
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const navigate = useNavigate()
    // function to check if coin state in input is a valid one the user can search for
    const checkValidCoin = ()=>{
        // current coin is
        // console.log('current coin state:', coin)

        // if coin is in suggestions and if coin exists at all
        // const onlyIDSuggestions = suggestions.map((suggestion:any)=>suggestion.id)
        const onlyIDSuggestions = suggestions.map((suggestion: any) =>
            // suggestion.id.toLowerCase().includes(coin.toLowerCase())
            suggestion.id
        );
        
        if(onlyIDSuggestions.includes(coin)){
            console.log('only ids of suggestions:', onlyIDSuggestions)
            setValidCoin(true)
        }
        if(!onlyIDSuggestions.includes(coin) && coin.length>=1){
            setValidCoin(false)
        }
    }
    // search for current coin, redirect to coin page

    const handleSearch = ()=>{
        
        // const validCoin =
        // run a function to check wether the coin is a valid coin in the coinsList
        // prevent unecessary rerouting to non available coins
        // make a flag for handleSearch that conditional takes away the ability to run a search
        // if checkCoin passes lower flag and allow search otherwise prompt user to search for correct coin
        if(validCoin && coin){
            navigate(`/coins/${coin}`)
            navigate(0);
        }
        else{
            console.log('please enter a valid coin')
        }
    }

    // Function to update suggestions based on user input
    const updateSuggestions = (event: any) => {
        const userInput = event.target.value;
        setCoin(userInput);
        // Filter suggestions based on the current input
        if (userInput.length > 0) {
            const filteredSuggestions = coinsList.filter((option: any) =>
                option.id.toLowerCase().includes(userInput.toLowerCase())
            );
            // console.log('filtered suggestions:',filteredSuggestions)
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
        setSelectedIndex(-1);
    };
    

    // Function to handle clicks outside the search bar
    const handleClickOutside = (event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            // Clear suggestions when clicking outside
            setSuggestions([]); 
            setValidCoin(true)
        }
    };

    useEffect(() => {
        // Add mousedown event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSuggestionClick = (suggestion:string)=>{
        setCoin(suggestion)
        // clear suggestions
        setSuggestions([])
    }
    // Handle keyboard navigation
    const handleKeyDown = (e: any) => {
        if (e.key === 'ArrowDown') {
            // Move down the list, but don't go out of bounds
            setSelectedIndex((prevIndex) => {
                const newIndex = Math.min(prevIndex + 1, suggestions.length - 1);
                scrollToView(newIndex); // Ensure the new index is in view
                return newIndex;
            });
        } else if (e.key === 'ArrowUp') {
            // Move up the list, but don't go out of bounds
            setSelectedIndex((prevIndex) => {
                const newIndex = Math.max(prevIndex - 1, 0);
                scrollToView(newIndex); // Ensure the new index is in view
                return newIndex;
            });
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            // Select the suggestion when Enter is pressed
            setCoin(suggestions[selectedIndex].id);
            setSuggestions([]);
            // checkValidCoin

        }
        // TO DO:
        // add another case where 'Enter' is selected again to submit search
    };
     // Function to scroll the selected suggestion into view
     const scrollToView = (index: number) => {
        const selectedOption = suggestionRefs.current[index];
        if (selectedOption) {
            selectedOption.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling effect
                block: 'nearest',   // Scroll to the nearest visible area
            });
        }
    };

    // const filteredSuggestions = coinsList.filter((coin) =>
        // coin.name.toLowerCase().includes(value.toLowerCase())
    // );

    const suggestionOptions =
        suggestions?.map((suggestion:any,index:number)=>(
            // <div className="suggestion-option">
            //     {suggestion.name}
            // </div>
            // instead of rendering a div with just markup,render an option tag
            <li 
                className={`suggestion-option ${index === selectedIndex ? 'selected' : ''}`} 
                value ={suggestion.id} key={index}
                onClick = {()=>handleSuggestionClick(suggestion.id)}
                ref={(el) => suggestionRefs.current[index] = el} // Assign ref to each <li>
            >
                {suggestion.id}
            </li>

        ))
    const loadFullCoinsList = ()=>{
        getFullCoinsList()
            .then((data:CoinListItem[])=>{
                if(data){
                    setCoinsList(data)
                    // console.log('full list of coins:',data)
                }
            })
            .catch((error:error)=>{
                console.log(error)
            })  
    }
    // useEffect to check for valid coin
    // upon change of coin state
    useEffect(()=>{
        checkValidCoin()
        // updateSuggestions(coin)
        console.log(coin)
    },[coin])
    useEffect(()=>{
        const loadData = async()=>{
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
            loadFullCoinsList()
        }
        loadData()
    },[])
    return(
        <div 
            className={`custom-searchbar ${isFocused?'focused':''} ${validCoin?'':'invalid-coin'}`} 
            ref ={searchBarRef} 
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
        >
            {/* set value of input to coin, onChange make it update coin state*/}
            {/* controlled component */}
            <div 
                className={'search-ctn'}>
                {/* INPUT FIELD */}
                <input 
                    type="text" 
                    // checking to see if itll work in useEffect hook
                    onChange = {(event)=>{
                        updateSuggestions(event)
                        // checkValidCoin()
                    }}
                    value={coin}
                    onKeyDown={handleKeyDown}  
                    placeholder="search coin"
                    // autoComplete=false
                    autoCorrect="false"
                    autoComplete="false"
                    spellCheck='false'
                />

                {/* CLEAR BUTTON X */}
                <div className="clear-btn"
                    onClick = {()=>{
                        setSuggestions([])
                        setCoin('')
                    }}
                >
                    <Clear fontSize="small"/>
                </div>

               {/* SEARCH BUTTON */}
                <div className="search-btn"
                    onClick ={handleSearch}
                    >
                    <Search fontSize="small"/>
                </div>

                
                    
                
            </div>
            <ul className="search-dropdown-options">
                {suggestionOptions}
            </ul>
            {/* debug buttons */}
            {/* <p>Current coin: {coin}</p> */}
            {/* <button>Search</button> */}
            {/* <button onClick ={()=>console.log(coin)}>Check Coin State</button> */}
            {/* <button onClick = {()=>console.log(suggestions)}>Check Suggestion</button>  */}
            
        </div>

    )
}