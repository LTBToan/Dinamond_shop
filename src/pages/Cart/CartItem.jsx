import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Image, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";

export default function CartItem({
  cartItemId,
  productId,
  quantity,
  totalPrice,
}) {
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };
  const [cartProduct, setCartProduct] = useState({});
  const [quantityValue, setQuantityValue] = useState(quantity);

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:8080/api/products/get/${productId}`)
      .then((res) => {
        totalPrice(res.data.productPrice * 1);
        setCartProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log("Products", cartProduct);

  const onQuantityChange = (value) => {
    if (value) {
      setQuantityValue(value);
      // axios
      //   .patch(`http://localhost:8080/api/carts/product/${cartItemId}`, {
      //     quantity: value,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.log(err.message));
    }
  };

  const decreaseQuantity = async () => {
    if (quantityValue > 1) {
      setQuantityValue((currentQuantity) => currentQuantity - 1);
      await axios
        .put(
          `http://localhost:8080/api/carts/product/update?cartId=${cartItemId}&prodId=${cartProduct.productId}`,
          {
            quantity: quantityValue - 1,
            price: cartProduct.productPrice,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
    }
  };

  const increaseQuantity = async () => {
    if (quantityValue < 20) {
      setQuantityValue((currentQuantity) => currentQuantity + 1);
      await axios
        .put(
          `http://localhost:8080/api/carts/product/update?cartId=${cartItemId}&prodId=${cartProduct.productId}`,
          {
            quantity: quantityValue + 1,
            price: cartProduct.productPrice,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
    }
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:8080/api/carts/product/delete?cartId=${cartItemId}&prodId=${cartProduct.productId}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
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
            alt={cartProduct.productName}
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
          {cartProduct.productName}
        </Text>
        <Text minWidth="100px" fontSize="xm" color="gray.500">
          {cartProduct.productPrice}$
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
              onChange={(e) => onQuantityChange(e.target.value)}
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
            {Math.round(cartProduct.productPrice * quantityValue * 100) / 100}$
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
