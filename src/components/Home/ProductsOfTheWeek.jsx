import { useEffect, useState } from "react";
import styles from "../../css/productsOfTheWeek.module.css";
import axios from "axios";
import { Card } from "antd";
const { Meta } = Card;

const ProductsOfTheWeek = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const fetchProductsOfTheWeek = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/all"
      );
      const allProducts = response.data;
      const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
      const randomProducts = shuffledProducts.slice(0, 4);

      setDataSource(randomProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProductsOfTheWeek();
  }, []);

  return (
    <div className={styles.powContainer}>
      <div className={styles.powContent}>
        <h1 className={styles.powTitle}>Products of the week</h1>
        <p className={styles.powTagLine}>
          The products that enhances the beauty of you home for the urban look
        </p>
      </div>
      <div className={styles.imageSection}>
        {dataSource.map((item, i) => (
          <Card
            key={item.productId}
            hoverable
            style={{ width: 300, backgroundColor: "#f8f8f8" }}
            cover={<img alt="" src={item.imageLink} />}
            bodyStyle={{ backgroundColor: "white" }}
          >
            <Meta
              key={item.productId}
              title={item.productName}
              description={item.productPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsOfTheWeek;
