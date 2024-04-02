import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Products.css';
import allProducts from '../Assets/data';
import Item from '../Items/Item';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
}

export const Products = () => {
  const location = useLocation();
  const [currentCategoryName, setCurrentCategoryName] = useState('');
  const [sort, setSort] = useState('');

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

  const sortProducts = (e: any) => {
    const sortOption = e.target.value;

    setSort(sortOption);


  }

  return (
    <div className="products-grid">
      <h2>{currentCategoryName.toUpperCase()}</h2>
      <select name="sort" className='sort' onChange={sortProducts}>
        <option value="asc" className='asc'>Sort A-Z</option>
        <option value="desc" className='desc'>Sort Z-A</option>
        <option value="highToLow" className='highToLow'>Sort Highest to Lowest Prices</option>
        <option value="lowToHigh" className='lowToHigh'>Sort Lowest to Highest Prices</option>
      </select>

      <Recommended category={currentCategoryName} sort={sort} />
    </div>
  );
};

const getCategoryProducts = async () => {
  const response = await fetch('http://localhost:8888/category/beans', {
    method: 'get'
  });
  return response.json();
};

const Recommended: React.FC<{ category: string, sort: string }> = ({ category, sort }) => {

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setCategoryProducts(await getCategoryProducts());
    };
    fetchProduct();
  }, []);

  if (sort === 'lowToHigh') {
  categoryProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'highToLow') {
    categoryProducts.sort((a, b) => b.price - a.price)
  } else if (sort === 'asc') {
    categoryProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'desc') {
    categoryProducts.sort((a,b) => b.name.localeCompare(a.name));
  }

  const recommendedProducts = categoryProducts.slice(0, 8);


  return (
    <div className='recommended-products'>
      <div className='recommended-product'>
        {recommendedProducts.map((item: Product, i: number) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={<span>{item.price} zł</span>}
          />
        ))}
      </div>
    </div>

  );
};

export default Products;