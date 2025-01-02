import React from "react";
import { useCart } from "./Cart"; // Impor hook useCart untuk mengakses keranjang

const CartComponent = () => {
  const { cartItems, totalPrice, loading, addToCart, removeFromCart, updateQuantity } = useCart();

  if (loading) return <div>Loading...</div>; // Menampilkan loading saat mengambil data keranjang

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p> // Menampilkan pesan jika keranjang kosong
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>{item.product.name}</div>
              <div>{item.quantity} x ${item.product.price}</div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>Increase</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
};

export default CartComponent;
