import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { generateUniqueId } from "../assistants/Generators";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/carts/get/user/${currentUserId}`
        );
        if (res.data.length > 0) {
          setCart(res.data[0]);
        } else {
          const newCartId = generateUniqueId("C", 3);
          const newCart = await axios.post(
            `http://localhost:8080/api/carts/add`,
            {
              cartId: newCartId,
              accountId: currentUserId,
              totalPrice: 0,
            }
          );
          setCart(newCart.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCartData();
  }, [currentUserId]);

  useEffect(() => {
    if (cart.cartId) {
      const fetchCartItems = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/carts/product/get/${cart.cartId}`
          );
          setCartItems(res.data);
          setLoading(false);
          calculateTotalAmount(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchCartItems();
    }
  }, [cart.cartId]);

  const calculateTotalAmount = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const addToCart = async (productId, productName, productPrice, quantity) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/carts/product/add",
        {
          cartId: cart.cartId,
          productId,
          productName,
          quantity,
          price: productPrice,
        }
      );
      const newItem = res.data;
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      calculateTotalAmount(updatedItems);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        totalAmount,
        setCartItems,
        setTotalAmount,
        addToCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
