import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../css/herosection.module.css";

const Herosection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeholder}>
        <h1 className={styles.heading}>Diamond Collection</h1>
        <h5 className={styles.tag}>
          Find best product diamond for your beauty
        </h5>
        <button className={styles.tag}>
          <Link to="/products" className={styles.button}>
            View Products
          </Link>
        </button>
      </div>
      <Slider {...settings} className={styles.slider}>
        <div>
          <img
            className={styles.chairImage}
            src="./images/dina9.jpg"
            alt="Diamond Collection 1"
          />
        </div>
        <div>
          <img
            className={styles.chairImage}
            src="./images/dina9.jpg"
            alt="Diamond Collection 2"
          />
        </div>
        <div>
          <img
            className={styles.chairImage}
            src="./images/dina9.jpg"
            alt="Diamond Collection 3"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Herosection;
