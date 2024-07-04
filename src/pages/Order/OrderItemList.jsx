// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import OrderItem from "./OrderItem";
// import { Flex, Button, Typography } from "antd";
// import dateFormat from "../../assistants/date.format";
// import moment from "moment";

// export default function OrderItemList({ orderId, date, isDelivered, product }) {
//   const currentUserId = sessionStorage.getItem("loginUserId");
//   const { Text } = Typography;
//   const [orderItemList, setOrderItemList] = useState([]);

//   console.log("ASAAS: ", product);

//   const fetchOrderItemList = async () => {
//     await axios
//       .get(`http://localhost:8080/api/orders/details/get/order/${orderId}`)
//       .then((res) => {
//         setOrderItemList(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchOrderItemList();
//   }, []);

//   console.log("::::", orderItemList);

//   const handleFeedback = () => {
//     // FEEDBACK
//   };

//   return (
//     <>
//       {orderItemList.map((item, i) => (
//         <tr
//           className={isDelivered === 1 ? "table-success" : ""}
//           style={{ marginBottom: "10px" }}
//         >
//           <OrderItem orderId={item.ordersId} productId={item.productsId} quantity={item.quantity} />
//           <td>
//             <Flex vertical justify="center" align="center">
//               <p>
//                 <strong style={{ fontSize: "120%" }}>
//                   {moment(date).fromNow()}
//                 </strong>
//                 <br />
//                 {dateFormat(date, "HH:MM dd/mm/yyyy")}
//               </p>
//             </Flex>
//           </td>
//           <td>{isDelivered === 1 ? "Delivered" : "On delivery"}</td>
//           <td>
//             <Button
//               type="primary"
//               style={{ backgroundColor: isDelivered ? "#126788" : "grey" }}
//               disabled={!isDelivered}
//               onClick={handleFeedback}
//             >
//               <Text strong style={{ color: "#FFF" }}>
//                 Send feedback
//               </Text>
//             </Button>
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tr, Td, Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import OrderItem from "./OrderItem"; // Ensure this import is correct

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

  return (
    <>
      {orderItemList.map((item, i) => (
        <Tr
          key={i}
          justifyContent="center"
        >
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
              {isDelivered === 1 ? "Delivered" : "On delivery"}
            </Text>
          </Td>
          <Td>
            <Button
              colorScheme={isDelivered ? "blue" : "gray"}
              isDisabled={!isDelivered}
              onClick={handleFeedback}
            >
              Send feedback
            </Button>
          </Td>
        </Tr>
      ))}
    </>
  );
}
