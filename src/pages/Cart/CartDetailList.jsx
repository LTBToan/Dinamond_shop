import React from "react";

import { Divider, Flex, Text } from "@chakra-ui/react";
import { truncateString } from "../../assistants/Generators";

export default function CartItem({ productName, quantity, price }) {
  return (
    <>
      <Flex justify="space-between" align="center">
        <Text minWidth="150px">{truncateString(productName, 20)}</Text>
        <Text minWidth="50px" textAlign="center">
          {quantity}
        </Text>
        <Text minWidth="100px" textAlign="right">
          {(Math.round(price * quantity * 100) / 100).toLocaleString()}₫‌
        </Text>
      </Flex>
      <Divider />
      <Flex justify="space-between" w="100%" mt={4} mb={4}>
        {/* <Text fontSize="xl" fontWeight="bold">
          Total:
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {Math.round(price * quantity * 100) / 100}$
        </Text> */}
      </Flex>
    </>
  );
}
