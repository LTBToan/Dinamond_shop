import React from "react";
import styles from "../../css/catagories.module.css";

const Catagories = () => {
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  return (
    <div className={styles.container}>
      <div
        id={styles.plate}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/ring");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Ring</h3>
          <span>High-end jewelry</span>
        </div>
        <img className={styles.plate} src="./images/diaring.png" alt="" />
      </div>
      <div
        id={styles.africanArt}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/bracelets");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Bracelets</h3>
          <span>The charm of hands</span>
        </div>
        <img className={styles.africanArt} src="./images/diabracelet.png" alt="" />
      </div>
      <div
        id={styles.light}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/earrings");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Earrings</h3>
          <span>Perfect combination</span>
        </div>
        <img className={styles.light} src="./images/diaearring.png" alt="" />
      </div>
      <div
        id={styles.sofa}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/necklace");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Necklace</h3>
          <span>Connect to Beauty</span>
        </div>
        <img className={styles.sofa} src="./images/dianecklace.png" alt="" />
      </div>
    </div>
  );
};
export default Catagories;
