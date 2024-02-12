import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Products.css';
import allProducts from '../Assets/data';
import Item from '../Items/Item';

export const Products = () => {
  const location = useLocation();
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  useEffect(() => {
    const updateCategoryName = () => {
      const urlParts = location.pathname.split('/');
      const categoryName = urlParts[urlParts.length - 1];
      setCurrentCategoryName(categoryName);
    };

    updateCategoryName();

    window.addEventListener('popstate', updateCategoryName);

    return () => {
      window.removeEventListener('popstate', updateCategoryName);
    };
  }, [location.pathname]);

  return (
    <div className="products-grid">
      <h2>{currentCategoryName.toUpperCase()}</h2>
      <Recommended />
    </div>
  );


};


interface Product {
  id: number;
  name: string;
  image: string;
  new_price: number;
}

const Recommended: React.FC = () => {

  const recommendedProducts = allProducts.slice(0, 8)
  return (
    <div className='recommended-products'>
      <div className='recommended-product'>
        {
          recommendedProducts.map((item: Product, i: number) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={<span>{item.new_price} zł</span>}
            />
          ))}
      </div>
    </div>
  );
};


export default Products;
