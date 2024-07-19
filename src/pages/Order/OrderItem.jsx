// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Flex, Image, Typography } from "antd";
// import { useLocation } from "react-router-dom";
// import styles from "./Order.module.css";

// export default function OrderItem({ orderId, productId, quantity }) {
//   const navigate = (toUrl) => {
//     window.location.href = toUrl;
//   };

//   const { Text, Title } = Typography;
//   const [product, setProduct] = useState({});

//   const fetchProductData = async () => {
//     await axios
//       .get(`http://localhost:8080/api/products/get/${productId}`)
//       .then((res) => {
//         setProduct(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   console.log("sax:", product);

//   return (
//     <>
//       <td>{orderId}</td>
//       <td>
//         <Image
//           src={product.imageLink}
//           alt=""
//           width={100}
//           style={{ borderRadius: "20px" }}
//         />
//         <p style={{ fontSize: "120%" }}>
//           <strong>{product.productName}</strong>
//         </p>
//       </td>
//       <td>{quantity}</td>
//       <td style={{ fontSize: "120%" }}>
//         <strong>{quantity * product.productPrice} $</strong>
//       </td>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Td, Image, Text } from "@chakra-ui/react";

export default function OrderItem({ orderId, productId, quantity }) {
  const [product, setProduct] = useState({});

  const fetchProductData = async () => {
    await axios
      .get(`http://localhost:8080/api/products/get/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <Td>{orderId}</Td>
      <Td display="flex" alignItems="center" justifyContent="space-evenly">
        <Image
          src={product.imageLink}
          alt=""
          boxSize="100px"
          borderRadius="20px"
          onClick={() => (window.location.href = `/products/${productId}`)}
        />
        <Text align="center" fontWeight="bold">
          {product.productName}
        </Text>
      </Td>
      <Td>{quantity}</Td>
      <Td fontWeight="bold">
        {(quantity * product.productPrice).toLocaleString()}₫‌
      </Td>
    </>
  );
}
