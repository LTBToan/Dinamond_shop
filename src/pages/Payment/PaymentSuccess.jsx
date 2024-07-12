import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Icon,
  Divider,
  Button,
  HStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

const PayStatus = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const currentUserId = sessionStorage.getItem("loginUserId");
  const currentProductId = sessionStorage.getItem("productId");
  const [productData, setProductData] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const transactionNo = queryParams.get("vnp_TransactionNo");
  const transactionStatus = queryParams.get("vnp_TransactionStatus");
  const responseCode = queryParams.get("vnp_ResponseCode");
  const orderId = queryParams.get("vnp_OrderInfo");
  const amount = queryParams.get("vnp_Amount");

  let statusMessage = "";
  let statusIcon = InfoIcon;
  let statusColor = "blue.500";
  let bgColor = "blue.50";

  if (transactionStatus === "00" && responseCode === "00") {
    statusMessage = "Payment Successful!";
    statusIcon = CheckCircleIcon;
    statusColor = "green.500";
    bgColor = "green.50";
  } else if (transactionStatus === "24") {
    statusMessage = "Payment Cancelled";
    statusIcon = InfoIcon;
    statusColor = "yellow.500";
    bgColor = "yellow.50";
  } else {
    statusMessage = "Payment Failed. Please try again.";
    statusIcon = WarningIcon;
    statusColor = "red.500";
    bgColor = "red.50";
  }

  const handleReturnHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (currentProductId) {
          await axios
            .get(`http://localhost:8080/api/products/get/${currentProductId}`)
            .then((res) => setProductData(res.data));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProductData();
  }, []);

  console.log("xa: ", cartItems);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (
        transactionStatus === "00" &&
        responseCode === "00" &&
        cartItems.length > 0
      ) {
        console.log("Conditions met for creating order");
        try {
          const orderResponse = await axios.post(
            "http://localhost:8080/api/orders",
            {
              orderId: orderId,
              accountId: currentUserId,
              totalPrice: 0,
              address: "",
              // date: new Date().toISOString(),
              statusId: 0,
            }
          );

          const orderDetailsPromises = cartItems.map((item) => {
            return axios.post(`http://localhost:8080/api/orders/details`, {
              ordersId: orderResponse.data.orderId,
              productsId: item.productId,
              productsSize: item.productSize,
              quantity: item.quantity,
              price: item.price,
            });
          });

          await Promise.all(orderDetailsPromises);

          const deleteCartItemsPromises = cartItems.map((item) => {
            return axios
              .delete(
                `http://localhost:8080/api/carts/product/delete?cartId=${item.cartId}&prodId=${item.productId}`
              )
              .catch((err) => console.log(err.message));
          });

          await Promise.all(deleteCartItemsPromises);
          setCartItems([]);
        } catch (error) {
          console.error(
            "Error creating order or order details:",
            error.message
          );
        }
      } else if (currentProductId) {
        const newOrder = await axios.post("http://localhost:8080/api/orders", {
          orderId: orderId,
          accountId: currentUserId,
          totalPrice: 0,
          address: "",
          statusId: 0,
        });

        await axios.post(`http://localhost:8080/api/orders/details`, {
          ordersId: newOrder.data.orderId,
          productsId: currentProductId,
          productsSize: productData.productSize,
          quantity: (amount / 100 / productData.productPrice).toFixed(),
          price: productData.productPrice,
        });
        sessionStorage.removeItem("productId");
        console.log("Conditions not met or cartItems is empty");
      }
    };

    fetchOrderData();
  }, [transactionStatus, responseCode, cartItems]);

  return (
    <>
      <Navbar />
      <Box
        maxW="md"
        mx="auto"
        my={40}
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        bg={bgColor}
      >
        <VStack spacing={4}>
          <Icon as={statusIcon} w={12} h={12} color={statusColor} />
          <Text fontSize="2xl" fontWeight="bold" color={statusColor}>
            {statusMessage}
          </Text>
          <Divider />
          <Box w="100%">
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Transaction ID</Text>
              <Text color="gray.500">{transactionNo}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Payment Type</Text>
              <Text color="gray.500">Net Banking</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Bank</Text>
              <Text color="gray.500">NCB</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                Amount Paid
              </Text>
              <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                {parseInt(amount / 100, 10).toLocaleString()} VND
              </Text>
            </HStack>
          </Box>
          <Button border="none" colorScheme="teal" onClick={handleReturnHome}>
            Return to Home
          </Button>
        </VStack>
      </Box>

      <Footer />
    </>
  );
};

export default PayStatus;
