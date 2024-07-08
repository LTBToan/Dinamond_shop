import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Flex, Image, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import { CartContext } from "../../context/CartContext";
import { truncateString } from "../../assistants/Generators";

export default function CartItem({
  cartItemId,
  productId,
  productName,
  quantity,
  price,
}) {
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const { setCartItems, setTotalAmount } = useContext(CartContext);
  const [cartProduct, setCartProduct] = useState({});
  const [quantityValue, setQuantityValue] = useState(quantity);

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
  }, []);

  useEffect(() => {
    updateCartSummary();
  }, [quantityValue]);

  const updateCartSummary = () => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: quantityValue }
          : item
      )
    );

    setTotalAmount(
      (prevTotal) => prevTotal + price * (quantityValue - quantity)
    );
  };

  const decreaseQuantity = async () => {
    if (quantityValue > 1) {
      setQuantityValue((currentQuantity) => currentQuantity - 1);
      await axios
        .put(
          `http://localhost:8080/api/carts/product/update?cartId=${cartItemId}&prodId=${cartProduct.productId}`,
          {
            quantity: quantityValue - 1,
            price: price,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const increaseQuantity = async () => {
    setQuantityValue((currentQuantity) => currentQuantity + 1);
    await axios
      .put(
        `http://localhost:8080/api/carts/product/update?cartId=${cartItemId}&prodId=${cartProduct.productId}`,
        {
          quantity: quantityValue + 1,
          price: price,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await axios
      .delete(
        `http://localhost:8080/api/carts/product/delete?cartId=${cartItemId}&prodId=${productId}`
      )
      .then((res) => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
        setTotalAmount(
          (prevTotal) => prevTotal - cartProduct.productPrice * quantityValue
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      p={4}
      mb={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      maxW="100%"
      justifyContent="space-around"
    >
      <Flex alignItems="center" justify="space-between">
        <Box boxSize="150px">
          <Image
            src={cartProduct.imageLink}
            alt={productName}
            borderRadius="lg"
            objectFit="cover"
          />
        </Box>
        <Text
          minWidth="200px"
          fontWeight="bold"
          fontSize="lg"
          onClick={() => {
            navigate(`/products/${cartProduct.productId}`);
          }}
          cursor="pointer"
        >
          {truncateString(productName, 20)}
        </Text>
        <Text minWidth="100px" fontSize="xm" color="gray.500">
          {price.toLocaleString()}₫‌
        </Text>
        <Flex direction="column" justify="space-between" align="center" mx="4">
          <Flex alignItems="center" mb={4}>
            <Button
              onClick={decreaseQuantity}
              marginRight="2%"
              size="sm"
              border="none"
            >
              -
            </Button>
            <Input
              min={1}
              max={20}
              value={quantityValue}
              onChange={(e) => setQuantityValue(e.target.value)}
              textAlign="center"
              size="sm"
              maxW="50px"
            />
            <Button
              onClick={increaseQuantity}
              marginLeft="2%"
              size="sm"
              border="none"
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Box textAlign="right" minWidth="100px">
          <Text fontWeight="bold" fontSize="xl" color="yellow.600">
            {(Math.round(price * quantityValue * 100) / 100).toLocaleString()}₫‌
          </Text>
        </Box>
        <Button
          border="none"
          onClick={handleDelete}
          size="sm"
          colorScheme="red"
          mb={4}
        >
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  );
}
