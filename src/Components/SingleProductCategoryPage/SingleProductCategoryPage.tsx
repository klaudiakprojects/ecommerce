import React from 'react';
import allProducts from '../Assets/data';
import './SingleProductCategoryPage.css'
import { useParams } from 'react-router-dom';
import Product from '../../Pages/Product';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

const addToCart = (id: number, quantity: number) => {
  console.log("Dodano do koszyka!");

  const product = allProducts.find(product =>
    product.id === id
  )

  const existingCartStorage = localStorage.getItem('cart-items') || '[]';
  const existingCart: CartItem[] = JSON.parse(existingCartStorage);

  const existingCartItem = existingCart.find(item => item.id === id);

  if (existingCartItem) {
    existingCartItem.quantity += quantity
  } else {
    existingCart.push({id, quantity})
  }

  const newCart = JSON.stringify(existingCart);
  console.log(newCart)
  localStorage.setItem('cart-items', newCart)
};


const SingleProductCategoryPage: React.FC = (props) => {

  let { productId } = useParams()

  const product = allProducts.find(product =>
    product.id === Number(productId))!



  return (
    <div className="product">
                <img className="product-image" src={require(`../Assets/${product.image}`)} alt={product.name} />
      <div className="product-details">
        <p>{product.name}</p>
        <div className="product-new-price">
          {<span>{product.price} zł</span>}
        </div>
        <button className="add-to-cart" onClick={() => {addToCart(product.id, 1)}}>ADD TO CART</button>
        <div className="product-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis mi sapien, in porttitor lorem porta commodo. In purus dolor, tristique non massa placerat, aliquam fringilla sem. Phasellus non mauris neque.
          Maecenas sed justo sed tortor pellentesque eleifend. In hac habitasse platea dictumst. Curabitur maximus ligula id risus porttitor elementum. Praesent sit amet diam in metus rhoncus efficitur at sit amet orci.
          Curabitur cursus aliquam nisl a egestas. Proin accumsan erat vitae ex ornare porta. Nulla sed lorem ut dolor scelerisque faucibus. Suspendisse lobortis ante purus, vel consequat purus semper vel.
          Aliquam iaculis enim dolor, in feugiat diam imperdiet eget. Nam lacus erat, efficitur in sodales quis, porta a lorem. Morbi quis placerat urna.
          Mauris egestas, turpis eu pellentesque interdum, tortor tellus congue libero, ac sollicitudin dui nulla nec lacus. Donec finibus, mi vitae sagittis euismod, enim sem scelerisque orci, sed rhoncus orci ipsum sit amet ex.
        </div>

      </div>
    </div>
  );
};




export default SingleProductCategoryPage;
