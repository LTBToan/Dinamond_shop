import styles from "../../css/related.module.css";
import { useState, useEffect } from "react";
import { Card, Divider, Flex } from "antd";
import { ChakraProvider, Text } from "@chakra-ui/react";
import axios from "axios";

export default function RelatedProducts({ categoryId }) {
  const [dataSource, setDataSource] = useState([]);
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

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
  }, []);

  return (
    <>
      <ChakraProvider>
        <div style={{ display: "block" }}>
          <Divider orientation="left">
            <Text className={styles.title}>Related Product</Text>
          </Divider>
          <Flex justify="center" align="center">
            <div className={styles.container}>
              {dataSource.map((item) => (
                <Card
                  key={item.productId}
                  hoverable
                  style={{
                    width: 200,
                    height: 250,
                  }}
                  onClick={() => {
                    navigate(`/products/${item.productId}`);
                  }}
                >
                  <div className={styles.productImageSection}>
                    <img alt="" src={item.imageLink} />
                  </div>
                  <div className={styles.infoSection}>
                    <Text
                      style={{ fontWeight: "700", fontSize: "130%" }}
                      className={styles.itemName}
                    >
                      {item.productName}
                    </Text>
                    <Text type="secondary" style={{ fontWeight: "400" }}>
                      <Text
                      // delete={item.status === 0}
                      >
                        {item.productPrice.toLocaleString()}₫‌
                      </Text>
                      &ensp;
                      {item.status === 0 ? "SOLD OUT" : ""}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </Flex>
        </div>
      </ChakraProvider>
    </>
  );
}
