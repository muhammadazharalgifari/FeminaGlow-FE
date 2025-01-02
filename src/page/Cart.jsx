import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../ax";

const CartContext = createContext();

const useCart = () => useContext(CartContext);

const Cart = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mengambil data keranjang
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/cart-items");
        if (Array.isArray(response.data)) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, []);

  // Menambahkan produk ke keranjang
  const addToCart = async (product, quantity) => {
    try {
      const response = await axiosInstance.post(`/api/cart-item`, {
        product_id: product.id,
        quantity: quantity,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in addToCart API:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // Menghapus produk dari keranjang
  const removeFromCart = async (id) => {
    try {
      await axiosInstance.delete(`/api/delete/cartItem/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await axiosInstance.put(`/api/update/cartItem/${id}`, {
        quantity,
      });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.subtotal_price,
    0
  );
  // const addToCart = (product, quantity) => {
  //   setCartItems((prev) => {
  //     const existingProduct = prev.find((item) => item.id === product.id);
  //     if (existingProduct) {
  //       return prev.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + quantity }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...product, quantity }];
  //   });
  // };

  // const removeFromCart = (id) => {
  //   setCartItems((prev) => prev.filter((item) => item.id !== id));
  // };

  // const updateQuantity = (id, quantity) => {
  //   setCartItems((prev) =>
  //     prev.map((item) => (item.id === id ? { ...item, quantity } : item))
  //   );
  // };

  // const clearCart = () => setCartItems([]);

  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { Cart, useCart };
