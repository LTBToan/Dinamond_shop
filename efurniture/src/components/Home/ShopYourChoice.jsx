// import React from "react";
import styles from "../../css/shopYourChoice.module.css";
// import { Link } from "react-router-dom";

const ShopYourChoice = () => {
  return (
    <div
      className={styles.mainContainer}
      style={{ backgroundImage: `url("./images/triangle.png")` }}
    >
      <div className={styles.title}>
        <h1>Shop Diamond</h1>
        <p>Designed for you</p>
      </div>
      <div className={styles.sofa}>
        <div className={styles.sofaTagLine}>
          <p>Choose a good and suitable diamond product for you</p>
        </div>
        <div className={styles.sofaBtnAndImg}>
          <img className={styles.sofaimg} src="./images/dina7.avif" alt="" />
          <h4>
            Diamond is one of the rarest and most valuable gemstones in the
            world. Formed from carbon under extreme temperature and pressure
            conditions deep within the Earth, diamonds are renowned for their
            exceptional hardness and brilliant light refraction. Their sparkle
            and clarity make them symbols of purity and eternity. Primarily used
            in the jewelry industry, diamonds also play a crucial role in
            various industries due to their unique physical properties.
          </h4>
          <button
            onClick={() => {
              window.location.href = "/category/sofa";
            }}
          >
            View More
          </button>
        </div>
      </div>
      <div className={styles.chairsAndTables}>
        <div className={styles.chair}>
          <div className={styles.chairTagLine}>
            <p className={styles.sofaLine}></p>
          </div>
          <img className={styles.chairImg} src="./images/diaa1.webp" alt="" />
          <h3>Diamod Rings Gold Candere</h3>
          <h3>5000$</h3>
          <button
            onClick={() => {
              window.location.href = "/category/chair";
            }}
          >
            View More
          </button>
          <div className={styles.chairTitle_Btn}></div>
        </div>
        <div className={styles.chair}>
          <div className={styles.chairTagLine}>
            <p className={styles.sofaLine}></p>
          </div>
          <img className={styles.tableImage} src="./images/diaaa3.jpg" alt="" />
          <h3>Diamod Rings While Gold</h3>
          <h3>4300$</h3>
          <button
            onClick={() => {
              window.location.href = "/category/table";
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopYourChoice;
