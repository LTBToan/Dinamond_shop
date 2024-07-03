import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function CartItem({ productId, quantity }) {
  const [cartProduct, setCartProduct] = useState({});

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:8080/api/products/get/${productId}`)
      .then((res) => {
        setCartProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduct();
  }, [quantity]);

  console.log("DADADxxxx: ", cartProduct);

  return (
    <Flex justify="space-between" align="center">
      <Text minWidth="150px">{cartProduct.productName}</Text>
      <Text minWidth="50px" textAlign="center">
        {quantity}
      </Text>
      <Text minWidth="100px" textAlign="right">
        {Math.round(cartProduct.productPrice * quantity * 100) / 100}$
      </Text>
    </Flex>
  );
}
