import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tr, Td, Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import OrderItem from "./OrderItem";

export default function OrderItemList({ orderId, date, isDelivered }) {
  const [orderItemList, setOrderItemList] = useState([]);

  const fetchOrderItemList = async () => {
    await axios
      .get(`http://localhost:8080/api/orders/details/get/order/${orderId}`)
      .then((res) => {
        setOrderItemList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrderItemList();
  }, []);

  const handleFeedback = () => {
    // FEEDBACK
  };

  console.log("orderDetail: ", orderItemList);

  return (
    <>
      {orderItemList.map((item, i) => (
        <Tr key={i} justifyContent="center">
          <OrderItem
            orderId={item.ordersId}
            productId={item.productsId}
            quantity={item.quantity}
          />
          <Td>
            <Flex direction="column" align="center">
              {/* <Text fontWeight="bold">{moment(date).fromNow()}</Text> */}
              <Text>{moment(date).format("HH:MM DD/MM/YYYY")}</Text>
            </Flex>
          </Td>
          <Td>
            <Text
              align="center"
              p={2}
              borderRadius="lg"
              fontWeight="bold"
              color={isDelivered === 1 ? "green.500" : "gray.500"}
              bgColor={isDelivered === 1 ? "green.100" : "gray.100"}
            >
              {isDelivered === 1 ? "Delivered" : "In delivery"}
            </Text>
          </Td>
        </Tr>
      ))}
    </>
  );
}
