import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, VStack, Icon, Divider, Button } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";

const PayStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const transactionStatus = queryParams.get("vnp_TransactionStatus");
  const responseCode = queryParams.get("vnp_ResponseCode");
  const orderInfo = queryParams.get("vnp_OrderInfo");
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

  return (
    <>
      <Navbar />
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        bg={bgColor}
      >
        <VStack spacing={4}>
          <Icon as={statusIcon} w={12} h={12} color={statusColor} />
          <Text fontSize="2xl" fontWeight="bold" color={statusColor}>
            {statusMessage}
          </Text>
          <Divider />
          <Box w="100%" textAlign="left">
            <Text fontSize="lg" fontWeight="semibold">
              Order Info:
            </Text>
            <Text>{orderInfo}</Text>
          </Box>
          <Box w="100%" textAlign="left">
            <Text fontSize="lg" fontWeight="semibold">
              Amount:
            </Text>
            <Text>{parseInt(amount / 100, 10).toLocaleString()} VND</Text>
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
