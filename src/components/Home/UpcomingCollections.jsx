import React from "react";
import styles from "../../css/upcomingCollections.module.css";

const UpcomingCollections = () => {
  return (
    <div
      className={styles.powContainer}
      style={{ backgroundImage: `url("./images/dia8.webp")` }}
    >
      <div className={styles.upcomingProductsContent}>
        <h1 className={styles.upcomingProductsTitle}>Upcoming Collections</h1>
        <p className={styles.upcomingProductsTagline}>
          Diamonds come in a variety of sizes and colors
        </p>
        <button className={styles.upcomingProductsBtn}>View More</button>
      </div>
    </div>
  );
};

export default UpcomingCollections;
