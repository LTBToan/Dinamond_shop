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

  console.log("STAT:", isDelivered);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "In delivery";
      case 2:
        return "Delivered";
      case 3:
        return "Cancelled";
      default:
        return "Unknown status";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return { text: "gray.500", bg: "gray.100" };
      case 1:
        return { text: "blue.500", bg: "blue.100" };
      case 2:
        return { text: "green.500", bg: "green.100" };
      case 3:
        return { text: "red.500", bg: "red.100" };
      default:
        return { text: "gray.500", bg: "gray.100" };
    }
  };

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
              <Text>{moment(date).format("DD/MM/YYYY")}</Text>
            </Flex>
          </Td>
          <Td>
            <Text
              align="center"
              p={2}
              borderRadius="lg"
              fontWeight="bold"
              color={getStatusColor(isDelivered).text}
              bgColor={getStatusColor(isDelivered).bg}
            >
              {getStatusText(isDelivered)}
            </Text>
          </Td>
        </Tr>
      ))}
    </>
  );
}
