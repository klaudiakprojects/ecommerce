import React, { useEffect, useState } from 'react'
import Products from '../Components/Products/Products'
import { useLocation } from 'react-router-dom';
import Item from '../Components/Items/Item';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
}


export const Search = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);


  const getSearchProducts = async (search: string) => {
    const response = await fetch(`http://localhost:8888/?q=${search}`, {
      method: 'get'
    });
    return response.json();
  };

  useEffect(() => {

    const urlParts = location.pathname.split('/');
    const searchName = urlParts[urlParts.length - 1];
    setSearch(searchName);


    const fetchProduct = async () => {
      const products = await getSearchProducts(searchName);
      setCategoryProducts(products);
    };
    fetchProduct();

    return () => { };
  }, []);
  return (
    <div>
      <h2>{search}</h2>
      <div className='recommended-products'>
        <div className='recommended-product'>
          {categoryProducts.map((item: Product, i: number) => (
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
    </div>

  )
}

export default Search