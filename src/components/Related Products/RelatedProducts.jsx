import styles from "../../css/related.module.css";
import { useState, useEffect } from "react";
import { Typography, Card, Divider, Flex, Image } from "antd";
import axios from "axios";

export default function RelatedProducts() {
  const { Text } = Typography;
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const fetchRelatedProducts = async () => {
    await axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Divider orientation="left">
        <Text className={styles.title}>OTHER PRODUCTS</Text>
      </Divider>
      <Flex justify="center" align="center">
        <div className={styles.container}>
          {dataSource.map((item) => (
            <Card
              hoverable
              style={{
                width: 200,
                height: 250,
              }}
              onClick={() => {
                navigate(`/products/${item.productId}`);
                location.reload();
              }}
            >
              <div className={styles.productImageSection}>
                <img alt="" src={item.imageLink} />
              </div>
              <div className={styles.infoSection}>
                <Text
                  strong
                  style={{ fontWeight: "700", fontSize: "130%" }}
                  className={styles.itemName}
                >
                  {item.productName}
                </Text>
                <Text type="secondary" italic style={{ fontWeight: "400" }}>
                  <Text delete={item.status === 0}>
                    {item.productPrice}&ensp; $
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
  );
}
