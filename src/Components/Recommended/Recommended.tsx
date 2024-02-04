// Recommended.tsx
import React from 'react';
import './Recommended.css';
import allProducts from '../Assets/data';
import Item from '../Items/Item';

interface Product {
  id: number;
  name: string;
  image: string;
  new_price: number;
  old_price: number;
}

const Recommended: React.FC = () => {

    const recommendedProducts = allProducts.slice(0,3)
  return (
    <div className='recommended-products'>
      <h2>RECOMMENDED PRODUCTS</h2>
      <div className='recommended-product'>
        {
        recommendedProducts.map((item: Product, i: number) => (
          <Item
            key={i}
            // id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
