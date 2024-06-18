// import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import styles from "../../css/shopYourChoice.module.css";
// import { Link } from "react-router-dom";

const ShopYourChoice = () => {
  return (
    <div
      className={styles.mainContainer}
      // style={{ backgroundImage: `url("./images/triangle.png")` }}
    >
      <div className={styles.title}>
        <h1>Our Products</h1>
        <h4>Designed for you</h4>
      </div>
      <div className={styles.chairsAndTables}>
        <Card
          hoverable
          style={{ width: 300, backgroundColor: "#f8f8f8" }}
          cover={
            <img
              alt=""
              src="https://www.pngall.com/wp-content/uploads/15/Diamond-Ring-PNG-Picture.png"
            />
          }
          bodyStyle={{ backgroundColor: "white" }}
        >
          <Meta title="Diamond Eardrop Gold " description="3000$" />
        </Card>
        <Card
          hoverable
          style={{ width: 340, backgroundColor: "#f8f8f8" }}
          cover={
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj3PWPdddt5UxoinoZIruvg8zA8gkUmgkL0A&s"
            />
          }
          bodyStyle={{ backgroundColor: "white" }}
        >
          <Meta title="Diamond Rings Gold Candere" description="1500$" />
        </Card>
        <Card
          hoverable
          style={{ width: 340, backgroundColor: "#f8f8f8" }}
          cover={
            <img
              alt=""
              src="https://cdn.caratlane.com/media/catalog/product/J/T/JT01486-1YP900_1_lar.jpg "
            />
          }
          bodyStyle={{ backgroundColor: "white" }}
        >
          <Meta title="Diamond Rings Gold bracelet" description="2500$" />
        </Card>
        <Card
          hoverable
          style={{ width: 340, backgroundColor: "#f8f8f8" }}
          cover={
            <img
              alt=""
              src="https://grazielagems.com/cdn/shop/products/N-144725copy_2048px.jpg?v=1710177447"
            />
          }
          bodyStyle={{ backgroundColor: "white" }}
        >
          <Meta title="Diamond Necklace " description="3500$" />
        </Card>
      </div>
    </div>
  );
};

export default ShopYourChoice;
