// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Flex, Typography } from "antd";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import styles from "./Order.module.css";
// import OrderItemList from "./OrderItemList";
// import dateFormat from "../../assistants/date.format";
// import moment from "moment";

// export default function OrderList() {
//   const { Text, Title } = Typography;
//   const navigate = (toUrl) => {
//     window.location.href = toUrl;
//   };

//   const currentUserId = sessionStorage.getItem("loginUserId");
//   const [orderList, setOrderList] = useState([]);

//   const fetchOrderList = async () => {
//     await axios
//       .get(`http://localhost:8080/api/orders/get/user/${currentUserId}`)
//       .then((res) => {
//         setOrderList(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchOrderList();
//   }, []);

//   console.log("CÂS: ", orderList);

//   return (
//     <>
//       {orderList.length === 0 ? (
//         <Flex
//           justify="space-around"
//           align="center"
//           gap={1}
//           className={styles.orderListContainer}
//           id={styles.emptyList}
//         >
//           <Text italic style={{ fontFamily: "monospace", opacity: "0.6" }}>
//             There is nothing here yet
//           </Text>
//           <Title style={{ fontSize: "150%" }}>
//             <Link
//               to=""
//               onClick={() => (window.location.href = "/")}
//               className={styles.shopNow}
//             >
//               SHOP NOW&ensp;
//               <ArrowRightOutlined />
//             </Link>
//           </Title>
//         </Flex>
//       ) : (
//         <>
//           <table className="table table-striped table-light table-sm table-bordered table-hover align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>Order ID</th>
//                 <th>Product</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Feedback</th>
//               </tr>
//             </thead>
//             <tbody className="table-group-divider">
//               {orderList.map((order) => (
//                 <OrderItemList
//                   orderId={order.orderId}
//                   product={order.products}
//                   date={order.date}
//                   isDelivered={order.statusId}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import OrderItemList from "./OrderItemList"; // Ensure this import is correct

const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

export default function OrderList() {
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchOrderList = async () => {
    await axios
      .get(`http://localhost:8080/api/orders/get/user/${currentUserId}`)
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = orderList.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(orderList.length / ITEMS_PER_PAGE);

  console.log("Orde: ", currentPageData);

  return (
    <>
      {orderList.length === 0 ? (
        <Flex justify="center" align="center" height="100vh" direction="column">
          <Text fontStyle="italic" opacity="0.6">
            There is nothing here yet
          </Text>
          <Heading size="md">
            <Link to="/" className="shopNow">
              SHOP NOW <ArrowForwardIcon />
            </Link>
          </Heading>
        </Flex>
      ) : (
        <>
          <Table
            border="none"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
          >
            <Thead bgColor="whitesmoke">
              <Tr>
                <Th>Order ID</Th>
                <Th>Product Information</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
                <Th>Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPageData.map((order) => (
                <OrderItemList
                  key={order.orderId}
                  orderId={order.orderId}
                  date={order.date}
                  isDelivered={order.statusId}
                />
              ))}
            </Tbody>
          </Table>
          <Box mt={4}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </Box>
        </>
      )}
    </>
  );
}
