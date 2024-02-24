import React, { useEffect, useState } from 'react';
import allProducts from '../Assets/data';
import './CartProducts.css';


interface CartItem {
  id: number;
  quantity: number;
}

const CartProducts: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart-items');
    if (cartStorage) {
      const parsedCart: CartItem[] = JSON.parse(cartStorage);
      setCartItems(parsedCart);

      const totalPrice = parsedCart.reduce((total, item) => {
        const product = allProducts.find((product) => product.id === item.id);
        return total + (product?.price || 0) * item.quantity;
      }, 0);

      setTotalCartPrice(totalPrice);
    }
  }, []); 

  const getProductDetails = (productId: number) => {
    const product = allProducts.find((product) => product.id === productId);
    return product || { name: '', price: 0, image: '' };
  };

  const deleteItem = (id: number) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cart-items', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="cart-products-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => {
          const productDetails = getProductDetails(item.id);
          return (
            <li key={item.id} className="cart-item">
              <div className="product-info">
                <img className="product-image" src={require(`../Assets/${productDetails.image}`)} alt={productDetails.name} />

                <div className="product-details">
                  <span className="product-name">{productDetails.name}</span>
                  <span className="product-price">{productDetails.price} zł</span>
                  <span className="product-quantity">Quantity: {item.quantity}</span>
                </div>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>DELETE</button>
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
