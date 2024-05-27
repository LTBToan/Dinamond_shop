import React from "react";
import styles from "../../css/catagories.module.css";
import { useNavigate } from "react-router-dom";

const Catagories = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div
        id={styles.plate}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/plate");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Diamond</h3>
          <span>High-end jewelry</span>
        </div>
        <img className={styles.plate} src="./images/dia5.png" alt="" />
      </div>
      <div
        id={styles.africanArt}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/decoration");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Diamond Ring</h3>
          <span>The charm of hands</span>
        </div>
        <img className={styles.africanArt} src="./images/dia2.png" alt="" />
      </div>
      <div
        id={styles.light}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/lighting");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Diamond Ring</h3>
          <span>Perfect combination</span>
        </div>
        <img className={styles.light} src="./images/dia4.png" alt="" />
      </div>
      <div
        id={styles.sofa}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/sofa");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Diamond Ring Couple</h3>
          <span>Let's build happiness together</span>
        </div>
        <img className={styles.sofa} src="./images/dia6.webp" alt="" />
      </div>
    </div>
  );
};
export default Catagories;
