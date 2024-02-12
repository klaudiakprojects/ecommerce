import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Mainpage } from './Pages/Mainpage';
import ProductCategory from './Pages/ProductCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import About from './Pages/About';
import FAQ from './Pages/FAQ';
import Contact from './Pages/Contact';
import SingleProductCategoryPage from './Components/SingleProductCategoryPage/SingleProductCategoryPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/beans' element={<ProductCategory />} />
          <Route path='/ground' element={<ProductCategory />} />
          <Route path='/promotions' element={<ProductCategory />} />
          <Route path='/product' element={<SingleProductCategoryPage/>}>
            <Route path=':productId' element={<SingleProductCategoryPage/>} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;