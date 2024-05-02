import React, { useEffect, useState } from 'react';
import allProducts from '../Assets/data';
import './CartProducts.css';
import Item from '../Items/Item';


interface CartItem {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  name: string;
  weight: string;
  image: string;
  price: string;
  type: string;
}

export const getProductsFromTheCart = async (): Promise<CartItem[]> => {
  const response = await fetch(`http://localhost:8888/cart`, {
    method: 'get'
  });
  return response.json();
};

export const deleteProductsFromTheCart = async (id: any) => {
  await fetch(`http://localhost:8888/cart/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  });
}
const CartProducts: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);

  const fetchProductsFromTheCart = async () => {
    const productsFromTheCart = await getProductsFromTheCart();
    setCartItems(productsFromTheCart);

    const totalCartPrice = productsFromTheCart.reduce((total, item: any) => {
      return total + (item.price || 0) * item.quantity;
    }, 0);

    setTotalCartPrice(Number(totalCartPrice.toFixed(2)));
  };
  useEffect(() => {

    fetchProductsFromTheCart();

  }, []);



  const deleteItem = async (id: number, quantity: number) => {
    
    if (quantity === 1) {
      setCartItems(prevItems => {
        const updatedCart = prevItems.filter(item => item.cart_item_id !== id);
        return updatedCart;
      });
      deleteProductsFromTheCart(id);
    } else if (quantity > 1) {
      
   await deleteProductsFromTheCart(id);
      fetchProductsFromTheCart();
    }
  };
  return (
    <div className="cart-products-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => {
          return (
            <li key={item.product_id} className="cart-item">
              <div className="product-info">
                <img className="product-image" src={require(`../Assets/${item.image}`)} alt={item.name} />

                <div className="product-details">
                  <span className="product-name">{item.name}</span>
                  <span className="product-price">{item.price} zł</span>
                  <span className="product-quantity">Quantity: {item.quantity}</span>
                </div>
                <button className="delete-button" onClick={() => deleteItem(item.cart_item_id, item.quantity)}>DELETE</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="summary-container">
        Total Cart Price: {totalCartPrice} zł
      </div>
    </div>
  );
};

export default CartProducts;
