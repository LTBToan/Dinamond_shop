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
          <Meta title="Diamond Rings Gold Candere" description="5000$" />
        </Card>
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
          <Meta title="Diamond Rings Gold Candere" description="5000$" />
        </Card>
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
          <Meta title="Diamond Rings Gold Candere" description="5000$" />
        </Card>
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
          <Meta title="Diamond Rings Gold Candere" description="5000$" />
        </Card>
      </div>
    </div>
  );
};

export default ShopYourChoice;
