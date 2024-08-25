import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Unfound from './pages/Unfound'
import Home from './pages/Home';
import Search from './pages/Search'
import Coins from './pages/Coins';
import Coin from './pages/Coin';
import NFTS from './pages/NFTS'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path='coins' element = {<Coins/>}/>
          <Route path = 'nfts' element = {<NFTS/>}/>
          <Route path='search' element={<Search/>}/>
          {/* not found route here */}
          <Route path='coins/:id' element ={<Coin/>}/>
          <Route path="*" element = {<Unfound/>}/>
        </Route>
        
      </Routes>

    </BrowserRouter>
  )
}

export default App
