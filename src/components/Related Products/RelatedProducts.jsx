import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Divider,
  ChakraProvider,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import styles from "../../css/related.module.css";

const RelatedProducts = ({ categoryId }) => {
  const [dataSource, setDataSource] = useState([]);

  const fetchRelatedProducts = async () => {
    await axios
      .get(`http://localhost:8080/api/products/get/category/${categoryId}`)
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [categoryId]);

  return (
    <ChakraProvider>
      <Box display="block" p={5} mb={20}>
        <Text fontSize="44px" fontWeight="500" align="center">
          Related Products
        </Text>
        <Flex justify="center" align="center">
          <Flex overflowX="auto" width="100%">
            <Flex width="max-content">
              {dataSource.map((item) => (
                <Box
                  key={item.productId}
                  width="200px" // Set a fixed width
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  onClick={() =>
                    (window.location.href = `/products/${item.productId}`)
                  }
                  cursor="pointer"
                  m={3} // Add margin to separate items a bit
                >
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={item.imageLink}
                      alt={item.productName}
                      objectFit="cover"
                    />
                  </div>
                  <Divider borderColor="gray.400" />
                  <Box p={3}>
                    <Box display="flex" alignItems="baseline">
                      <Badge
                        borderRadius="full"
                        px="2"
                        bgColor="#d4af37"
                        color="whitesmoke"
                      >
                        New
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        Summer
                      </Box>
                    </Box>
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h3"
                      fontSize="18px"
                      lineHeight="tight"
                      noOfLines={1}
                    >
                      {item.productName}
                    </Box>
                    <Box>
                      <Text color="gray.500" fontSize="sm">
                        {item.productPrice.toLocaleString()}₫‌
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default RelatedProducts;
