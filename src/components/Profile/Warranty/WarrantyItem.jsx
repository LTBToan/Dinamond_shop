import React, { useEffect, useState } from "react";
import axios from "axios";
import { Td, Image, Text } from "@chakra-ui/react";

export default function OrderItem({ warrantyId, productId }) {
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
      <Td>{warrantyId}</Td>
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
    </>
  );
}
