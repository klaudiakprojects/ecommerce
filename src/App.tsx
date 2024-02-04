import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Mainpage } from './Pages/Mainpage';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import About from './Pages/About';
import FAQ from './Pages/FAQ';
import Contact from './Pages/Contact';

function App() {
  return (
    <div>
      <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Mainpage/>}/>
              <Route path='/beans' element={<ShopCategory/>}/>
              <Route path='/ground' element={<ShopCategory/>}/>
              <Route path='/promotions' element={<ShopCategory/>}/>
              <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
              </Route>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/faq' element={<FAQ/>}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;