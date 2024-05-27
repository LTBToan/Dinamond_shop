import React from "react";

import styles from "../../css/herosection.module.css";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.placeholder}>
        <h1 className={styles.heading}>Diamond For Your </h1>
        <h5 className={styles.tag}>Find best product diamond for your </h5>
        <button className={styles.tag}>
          <Link to="/products" className={styles.button}>
            View Products
          </Link>
        </button>
      </div>
      <img className={styles.chairImage} src="./images/dina8.jpg" alt="" />
    </div>
  );
};

export default Herosection;
